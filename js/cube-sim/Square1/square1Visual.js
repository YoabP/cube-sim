//Static methods
/**
 * Binds a 3D model, with a logical model.
 * @param  {THREE.Object3D} model - root of the object 3D containing cube pieces.
 * @param  {CUBES.Cube333} rubik - Logical model for puzzle.
 */
CUBES.Cube333.View.bind = function bind(model, rubik){
  model.children.forEach(function(elem, index){
    var socket = rubik.getSocket(elem.name);
    if(socket) socket.piece.cubie = elem;
  });
}
