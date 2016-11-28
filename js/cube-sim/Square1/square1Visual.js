"use strict";
/**
 * Visualization of the Square1 puzzle.
 * Needs a logical model and scene to work.
 * @class
 */
CUBES.Square1.View = class View {
  /**
   * Creates a view object.
   * @param  {CUBES.Square1} rubik - logical model to use.
   * @param  {THREE.Scene} scene - Scene were view is loaded.
   */
  constructor(rubik,scene) {
    /**
     * Logical model used by the view. Any animated move
     * is also executed in the logical model.
     * @type {CUBES.Square1}
     */
    this.logic = rubik;
    /**
     * If it can currently rotate. You cannot rotate
     * while an animation is going on.
     * @type {bool}
     */
    this.canRotate = true;
    /**
     * Array of moves the view has executed.
     * @type {string[]}
     */
    this.executedMoves = [];
    /**
     * An object used to attach things into the visualization.
     * Also used for rotations.
     * @type {THREE.Object3D}
     */
    this.root = new THREE.Object3D();
    /**
     * The root of the visualization object 3D.
     * Not to be confused with [root]{@linkcode CUBES.Square1.View#root}.
     * @type {THREE.Object3D}
     */
    this.object3D = undefined;
    var self = this;
    /**
     * Describes if object is loaded. A promise
     * to be used to chain events onto the loading.
     * Resolves to true when loaded.
     * @type {Promise}
     */
    this.loaded = new Promise(function(resolve, reject){
      self.loadModel().then(function(model){
        CUBES.Square1.View.bind(model,rubik);
        self.object3D = model;
        self.object3D.add(self.root);
        scene.add(self.object3D);
        resolve(true);
      });
    });
  }
  /**
   * Execute an algorithm.
   * @param  {string} algorithm - Algorithm to execute, a string like "R R R* U".
   * @param  {number} ms        - miliseconds each move animation will take.
   * @return {Promise} Promise that resolves when algorithm ends.
   */
  algorithm(algorithm,ms){
    //patch to format
    algorithm = algorithm.replace(/'/g, '*');
    algorithm = algorithm.replace(/(\w)2/g, '$1 $1');
    var moves = algorithm.split(' ');
    return this._algorithmR(moves,ms);
  }
  /**
   * Recursively executes moves on an algorithm chain.
   * @private
   * @param  {string[]} moves - Algorithm to execute,
   * a string array like ["R","R","R*","U"].
   * @param  {number} ms        - miliseconds each move animation will take.
   * @return {Promise} Promise that resolves when algorithm ends.
   */
  _algorithmR(moves,ms) {
    var self = this;
    ms = ms? ms: 300;
    return new Promise(function (resolve) {
      if(moves.length == 0) resolve(true);
      var move = moves.shift();
      self.rotate(move,ms).then(
        function(){
          resolve(false)
      });
    })
    .then(function (ended) {
        return ended? ended:self._algorithmR(moves,ms);
    });
  }
  /**
   * Animates a rotation of the given move.
   * @private
   * @param  {string} move - Move to execute.
   * @param  {number} ms   - miliseconds the animation will take.
   * @return {Promise} Promise that resolves when animation ends.
   */
  rotate(move, ms){
    var self = this;
    var face, CCW;
    ms = ms? ms: 300;
    face = move[0];
    CCW = move[1];
    if(!self.canRotate) return;
    self.executedMoves.push(move);
    if(face === 'U' || face === 'D'||
       face === 'L' || face === 'R'||
       face === 'F' || face === 'B'){
      return new Promise(function(resolve,reject){
        self.canRotate = false;
        self._rotateFaces(face,CCW, ms).then(function(){
          self.canRotate = true;
          resolve();
        });
      });
    }
    else{
      return new Promise(function(resolve,reject){
        self.canRotate = false;
        self._rotateSlices(face,CCW, ms).then(function(){
          self.canRotate = true;
          resolve();
        });
      });
    }
  }
  /**
   * Rotation method for faces.
   * @private
   * @param  {string} face - Face to rotate.
   * @param  {bool} CCW    - If rotation should be counter clockwise.
   * @param  {number} ms   - miliseconds the animation should take.
   * @return {Promise} Promise that resolves when animation finishes.
   */
  _rotateFaces(face, CCW, ms){
    var self = this;
    return new Promise(function(resolve, reject){
      var center = self.logic.getSocket(face);
      var obj = self.root;
      obj.updateMatrixWorld();
      self.object3D.updateMatrixWorld();
      var attachedAlready = [];
      center.sockets[0].forEach(function(socket, index){
        // remove child from scene and add it to parent
        // make sure you do so only once, since sockets repeat pieces
        if(attachedAlready.indexOf(socket.piece.cubie)== -1){
          THREE.SceneUtils.attach( socket.piece.cubie, socket.piece.cubie.parent, obj );
          attachedAlready.push(socket.piece.cubie);
        }
      });
      var rotation,target;
      var axis;
      var direction; //clockwise direction
      //Only U|D faces rotate
      axis = 'Y';
      direction = face === 'U'? -1 : 1;
      rotation = { ms: 0};
      target = { ms:ms};

      var totalRotation = Math.toRadians(30)*(CCW? -direction:direction);
      var step = totalRotation/ms;
      var prevMs = 0;
      var tween = new TWEEN.Tween(rotation).to(target, ms);
      tween.onUpdate(function(){
          var delta = rotation.ms - prevMs;
          prevMs = rotation.ms;
          obj["rotate"+axis](delta*step);
      });

      tween.onComplete(function(){
        var center = self.logic.getSocket(face);
        var obj = self.root;
        obj.updateMatrixWorld();
        self.object3D.updateMatrixWorld();
        var attachedAlready = [];
        center.sockets[0].forEach(function(socket, index){
          // remove child from parent and add it to scene
          if(attachedAlready.indexOf(socket.piece.cubie) == -1){
            THREE.SceneUtils.detach( socket.piece.cubie, obj, self.object3D );
            attachedAlready.push(socket.piece.cubie);
          }
        });
        self.logic.rotate(face+(CCW?'*':''));
        resolve();
      });
      tween.start();
    });
  }

  /**
   * Rotation method for "special" moves. Moves for middle layers.
   * This will apply for the 180 vertical R spin the Square1 has.
   * It will also virtually 'spin' the left layer.
   * @private
   * @param  {string} face - Face to rotate.
   * @param  {bool} CCW    - If rotation should be counter clockwise.
   * @param  {number} ms   - miliseconds the animation should take.
   * @return {Promise} Promise that resolves when animation finishes.
   */
  _rotateSlices(slice, CCW, ms){
    var self = this;
    var rotation,target;
    var axis, moveA, moveB;
    var sliceSockets;
    var direction; //clockwise direction
    switch (slice) {
      case 'M':
        axis = 'X';
        sliceSockets = self.logic.getSockets(["F","UF","U","UB","B","BD","D","DF"]);
        direction = 1;
        moveA = 'R' + (CCW?'*': '');
        moveB = 'L' + (CCW? '':'*');
        break;
      case 'E':
        axis = 'Y';
        sliceSockets = self.logic.getSockets(["F","FR","R","RB","B","BL","L","LF"]);
        direction = 1;
        moveA = 'U' + (CCW?'*': '');
        moveB = 'D' + (CCW? '':'*');
        break;
      case 'S':
        axis = 'Z';
        sliceSockets = self.logic.getSockets(["R","RU","U","UL","L","LD","D","DR"]);
        direction = -1;
        moveA = 'B' + (CCW?'*': '');
        moveB = 'F' + (CCW? '':'*');
        break;
    }
    //Rotation must be additive, not absolute
    rotation = { ms: 0};
    target = { ms: ms};
    var totalRotation = Math.toRadians(90)*(CCW? -direction:direction);
    var step = totalRotation/ms;
    var prevMs = 0;
    return new Promise(function(resolve,reject){
        var obj = self.root;
        obj.updateMatrixWorld();
        self.object3D.updateMatrixWorld();
        sliceSockets.forEach(function(socket, index){
          THREE.SceneUtils.attach( socket.piece.cubie, socket.piece.cubie.parent, obj );
        });
        var tween = new TWEEN.Tween(rotation).to(target, ms);
        tween.onUpdate(function(){
            var delta = (rotation.ms - prevMs);
            prevMs = rotation.ms;
            self.root["rotate"+axis](delta*step );
        });
        tween.onComplete(function(){
          var obj = self.root;
          obj.updateMatrixWorld();
          self.object3D.updateMatrixWorld();
          sliceSockets.forEach(function(socket, index){
            THREE.SceneUtils.detach( socket.piece.cubie, obj, self.object3D );
          });
          self.logic.rotate(moveA);
          self.logic.rotate(moveB);
          resolve();
        });
        tween.start();
      });
  }

  /**
   * Loads the 3D model. Called by constructor.
   * @return {Promise}  Promise resolved when load finishes.
   */
  loadModel(){
    var self = this;
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };
    var onError = function ( xhr ) { };
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( `/models/${self.logic.type}/` );
    return new Promise(function(resolve, reject) {
      mtlLoader.load( `${self.logic.type}.mtl`, function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( `/models/${self.logic.type}/` );
        objLoader.load( `${self.logic.type}.obj`, function ( object ) {
          resolve(object);
        }, onProgress, onError );
      });
    });
  }
}

//Static methods
/**
 * Binds a 3D model, with a logical model.
 * @param  {THREE.Object3D} model - root of the object 3D containing cube pieces.
 * @param  {CUBES.Square1} rubik - Logical model for puzzle.
 */
CUBES.Square1.View.bind = function bind(model, rubik){
  model.children.forEach(function(elem, index){
    var socket = rubik.getSocket(elem.name);
    if(socket) socket.piece.cubie = elem;
  });
}
