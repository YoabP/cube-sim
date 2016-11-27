//Common 3x3x3 cubic puzzle
"use strict";
/**
 * Raycast controller. Invisible hitbox model recieves
 * raycast instructions and sends them to the visualization.
 * @class
 */
CUBES.Cube333.Controller = class Controller {
  /**
   * Create a controller object for a visualization.
   *
   * @param  {THREE.Camera} camera - The camera on the scene.
   * @param  {THREE.TrackballControls} controls - The controls on the scene.
   * @param  {CUBES.Cube333.View} view - The view affected by the controller.
   */
  constructor(camera, controls, view) {

    /**
     * Camera used for raycasting.
     * @type {THREE.Camera}
     */
    this.camera = camera;
    /**
     * Controls from the scene. They will be disabled
     * while the cube is being raycasted.
     * @type {THREE.TrackballControls}
     */
    this.controls = controls;
    /**
     * View affected by the controlers. Calculated
     * moves will be sent to the view.
     * @type {CUBES.Cube333.View}
     */
    this.view = view;
    /**
     * If it can currently rotate. Rotation will be
     * disabled when the user is not meant to interact
     * with the cube.
     * @type {bool}
     */
    this.canRotate = true;
    /**
     * Objects that will be detected by raycasting.
     * @type {THREE.Object3D[]}
     */
    this.rayCastObjects = [];
    /**
     * The root object 3D for the hitbox object.
     * @type {THREE.Object3D}
     */
    this.object3D = null;
    /**
     * Raycaster used by the controller.
     * @type {THREE.Raycaster}
     */
    this.raycaster =	new THREE.Raycaster();
    /**
     * Vector represnting mouse position.
     * @type {THREE.Vector2}
     */
    this.mouse =new THREE.Vector2();
    /**
     * Object that lists where the move starts and ends.
     * @type {{start: string, end: string, c}}
     */
    this.moveLister = {start:"", end:""};
    var self = this;
    /**
     * Describes if object is loaded. A promise
     * to be used to chain events onto the loading.
     * Resolves to true when loaded.
     * @type {Promise}
     */
    this.loaded = new Promise(function(resolve, reject){
      self.loadModel().then(function(model){
        self.object3D = model;
        self.view.root.add(model);
        model.children.forEach(function(child, index){
          self.rayCastObjects.push(child);
        });
        resolve();
      });
    });
  }
  //Listeners
  /**
   * Function to execute on mouse move event.
   * @param  {object} event - Mouse move event.
   */
  onDocumentMouseMove( event ) {
    event.preventDefault();
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  /**
   * Function to execute on mouse down event.
   * @param  {object} event - Mouse down event.
   */
  onDocumentMouseDown( event ) {
    event.preventDefault();
    var sel = this.getObjectOnMouse();
    if (sel){
      this.controls.enabled = false;
      this.moveLister.start = sel.name;
    }
    else {
      this.moveLister = {};
    }
  }
  /**
   * Function to execute on mouse up event.
   * @param  {object} event - Mouse up event.
   */
  onDocumentMouseUp( event ) {
    event.preventDefault();
    this.controls.enabled = true;
    var sel = this.getObjectOnMouse();
    if (sel && this.moveLister.start){
      this.moveLister.end = sel.name;
      var move = this.calculateMove(this.moveLister);
      if (move && this.canRotate){
        this.view.rotate(move);
      }
    }
    this.moveLister = {};
  }
  /**
   * Loads the model used as a hitbox.
   * Used by constructor.
   * @return {Promise}  Promise resolved when load finishes.
   */
  loadModel(){
    var materials = {
      U: new THREE.MeshPhongMaterial( {color: CUBES.Colors.W} ),
      D: new THREE.MeshPhongMaterial( {color: CUBES.Colors.Y} ),
      F: new THREE.MeshPhongMaterial( {color: CUBES.Colors.R} ),
      B: new THREE.MeshPhongMaterial( {color: CUBES.Colors.O} ),
      R: new THREE.MeshPhongMaterial( {color: CUBES.Colors.B} ),
      L: new THREE.MeshPhongMaterial( {color: CUBES.Colors.G} )
    };
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };
    var onError = function ( xhr ) { };
    return new Promise(function(resolve, reject) {
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath( '/models/333/' );
        objLoader.load( '333_hitbox.obj', function ( object ) {
          object.children.forEach(function(child, index){
            var face = child.name[0];
            child.material = materials[face];
            child.material.visible = false;
            child.material.opacity = .5;
            child.material.transparent = true;
          });
          resolve(object);
        }, onProgress, onError );
      });
  }
  /**
   * Gets the object currently on mouse position.
   * @return {THREE.Object3D} 3D object selected by the raycaster.
   */
  getObjectOnMouse(){
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = this.raycaster.intersectObjects( this.rayCastObjects );
    if ( intersects.length > 0 ) {
      return intersects[ 0 ].object;
    }
    return null;
  }
  /**
   * Calculates a move based on the start and end pieces.
   * @param  {object} move - Object describing move.
   * @param  {string} move.start - String describing where move starts.
   * @param  {string} move.end   - String describing where move ends.
   * @return {string} String representing the resulting move.
   */
  calculateMove(move){
    //Moves are only legal if they start and end on same face.
    // Moves cannot start and end on the same piece.
    // moves cannot start on a center and end on a corner. Vice versa.
    if(move.start[0]!= move.end[0] || move.start === move.end ||
      move.start.length === 1 && move.end.length === 3 ||
      move.end.length === 1 && move.start.length === 3 ){
        return
    }
    var selectedFace = move.start[0];
    var sharedFace, direction;
    var start, end;
    //Moves are never done on the collided plane. So remove first plane,
    // which is the actual plane the piece belongs to.
    start = move.start.substring(1);
    end = move.end.substring(1);
    //Center slice moves. Centers have len = 1
    // Moves along two edge pieces, len = 2, are also center moves.
    //// M – Middle layer turn – direction as an L turn between R and L.
      // E – Equatorial layer – direction as a D turn between U and D.
      // S – Standing layer – direction as an F turn between F and B.
    if (move.start.length <2 || move.end.length <2 ||
    move.start.length === 2 && move.end.length === 2){
        var slice = "MES";
        switch(selectedFace){
          case "U": case "D":
            slice = slice.replace(/E/,'');
            break;
          case "R": case "L":
            slice = slice.replace(/M/,'');
            break;
          case "F": case "B":
            slice = slice.replace(/S/,'');
            break;
        }
        if (start.length === 0 || end.length === 0){
          var completion = this._completeMissingStartEnd(start,end);
          start = start? start: completion.start;
          end   = end? end: completion.end;
        }
        switch (start){
          case "U": case "D":
            slice = slice.replace(/E/,'');
            break;
          case "R": case "L":
            slice = slice.replace(/M/,'');
            break;
          case "F": case "B":
            slice = slice.replace(/S/,'');
            break;
        }
        //Active, start = CCW?
        var directionHash = {
          F:{D: true, R: true},
          B:{U: true, L: true},
          U:{F: true, R: true},
          D:{L: true, B: true},
          R:{D: true, B: true},
          L:{U: true, F: true},
        };
        direction = directionHash[selectedFace][start]?'*':'';
        return slice+direction;
    };
    //get face they share.
    for (var i = 0; i < start.length; i++) {
      for (var j = 0; j < end.length; j++) {
        if( start[i] === end[j]){
          sharedFace = start[i];
          break;
        }
      }
    }
    if(!sharedFace) {return}
    //Remove active move face from start end.
    var regex = new RegExp(sharedFace, "g");
    start = start.replace(regex, '');
    end = end.replace(regex, '');
    //Check for start-end completion, moves using edge pieces will
    // have an empty string on either one.
    if (start.length === 0 || end.length === 0){
      var completion = this._completeMissingStartEnd(start,end);
      start = start? start: completion.start;
      end   = end? end: completion.end;
    }
    //calculate direction. '*' indicates counter clockwise
    // Direction has to go on the vector perpendicular to both
    // the selectedFace vector, and the face that is spinning.
    // If the cross of this vectors is:
    // Same as start, then direction is CW
    // Same as   end, then direction is CWW
    var a = CUBES.Vectors[sharedFace];
    var b = CUBES.Vectors[selectedFace];
    var c = new THREE.Vector3();
    c.crossVectors(a,b);
    var resultingFace = CUBES.vectorToFace(c);
    direction = resultingFace === start? '':'*';
    return sharedFace+direction;
  }
  /**
   * Calculate where a move ends based on the start.
   * And vice versa.
   * @private
   * @param  {string} start - Start face string.
   * @param  {string} end   - Ending face string.
   * @return {object} object containing complete start and end strings.
   */
  _completeMissingStartEnd(start, end){
    var existingSide = start? start: end;
    var complementingSide;
    switch (existingSide) {
      case 'R': complementingSide = 'L'; break;
      case 'L': complementingSide = 'R'; break;
      case 'U': complementingSide = 'D'; break;
      case 'D': complementingSide = 'U'; break;
      case 'F': complementingSide = 'B'; break;
      case 'B': complementingSide = 'F'; break;
    }
    start = start? start: complementingSide;
    end   = end? end: complementingSide;
    return {start:start, end:end};
  }

}
