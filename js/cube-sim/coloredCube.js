//represents a piece 3d object, a cube with 6 colorable sides.
"use strict";
CUBES.ColoredCube = class ColoredCube {
  constructor(size) {
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

    this.U = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.U.position.y = offset;
    this.object3D.add(this.U);

    this.D = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.D.position.y = -offset;
    this.object3D.add(this.D);

    this.L = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.L.position.x = -offset;
    this.object3D.add(this.L);

    this.R = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.R.position.x = offset;
    this.object3D.add(this.R);

    this.F = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.F.position.z = offset;
    this.object3D.add(this.F);

    this.B = new THREE.Mesh( fgeometry,
      new THREE.MeshLambertMaterial( {color: CUBES.Colors.W})
    );
    this.B.position.z = -offset;
    this.object3D.add(this.B);
  }
  setColors(colors){
    for(var color in colors) {
       this[color].material.color.setHex(colors[color]);
    }
  }
  clearColors(){
    this.U.material.color.setHex(CUBES.Colors.Bk);
    this.D.material.color.setHex(CUBES.Colors.Bk);
    this.L.material.color.setHex(CUBES.Colors.Bk);
    this.R.material.color.setHex(CUBES.Colors.Bk);
    this.F.material.color.setHex(CUBES.Colors.Bk);
    this.B.material.color.setHex(CUBES.Colors.Bk);
  }
}
