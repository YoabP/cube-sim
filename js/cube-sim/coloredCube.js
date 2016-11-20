"use strict";

/**
 * Represents a cubic piece 3d object, a cube with 6
 * colorable sides.
 * @class
 */
CUBES.ColoredCube = class ColoredCube {
  /**
   * Creates a ColoredCube object.
   * @param  {number} size - Size of the 3d object.
   */
  constructor(size) {
    /**
     * The root 3D object.
     * @type {THREE.Object3D}
     */
    this.object3D = new THREE.Object3D();
    //base cube
    var blackCube = new THREE.Mesh(
      new THREE.BoxGeometry( size, size, size ),
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.Bk} )
    );
    this.object3D.add(blackCube);
    //Add faces
    var fsize = size * (3/4);
    var offset = size/6;
    var fgeometry = new THREE.BoxGeometry( fsize, fsize, fsize );

    /**
     * The Upper face 3d object.
     * @type {THREE.Mesh}
     */
    this.U = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.U.position.y = offset;
    this.object3D.add(this.U);
    /**
     * The Bottom (down) face 3d object.
     * @type {THREE.Mesh}
     */
    this.D = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.D.position.y = -offset;
    this.object3D.add(this.D);
    /**
     * The Left face 3d object.
     * @type {THREE.Mesh}
     */
    this.L = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.L.position.x = -offset;
    this.object3D.add(this.L);
    /**
     * The Right face 3d object.
     * @type {THREE.Mesh}
     */
    this.R = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.R.position.x = offset;
    this.object3D.add(this.R);
    /**
     * The Front face 3d object.
     * @type {THREE.Mesh}
     */
    this.F = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.F.position.z = offset;
    this.object3D.add(this.F);
    /**
     * The Back face 3d object.
     * @type {THREE.Mesh}
     */
    this.B = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.B.position.z = -offset;
    this.object3D.add(this.B);
  }

  /**
   * Sets the colors for the cube faces.
   * @param  {Object.<string, number>} colors
   * object containing hex values for each face colors.
   */
  setColors(colors){
    for(var color in colors) {
       this[color].material.color.setHex(colors[color]);
    }
  }
  /**
   * Clear colors from cube. Set them all to black.
   */
  clearColors(){
    this.U.material.color.setHex(CUBES.Colors.Bk);
    this.D.material.color.setHex(CUBES.Colors.Bk);
    this.L.material.color.setHex(CUBES.Colors.Bk);
    this.R.material.color.setHex(CUBES.Colors.Bk);
    this.F.material.color.setHex(CUBES.Colors.Bk);
    this.B.material.color.setHex(CUBES.Colors.Bk);
  }
}
