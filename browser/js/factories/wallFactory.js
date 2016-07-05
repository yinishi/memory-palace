'use strict'

module.exports = function(){
  return {
    Wall : Wall
  }
};

function Wall (wallLength, wallHeight, material, hasDoor, hasWindow) {
  this.wall = new THREE.Object3D();

  if (hasDoor) {
    //TOP  
    this.wallGeoTop = new THREE.BoxGeometry(wallLength, wallHeight * .5, 1);
    var topMesh = new THREE.Mesh(this.wallGeoTop, material);
    topMesh.position.set(0, 0, 0);

    //LEFT
    this.wallGeoLeft = new THREE.BoxGeometry(wallLength *.2, wallHeight * .5, 1);
    var leftMesh = new THREE.Mesh(this.wallGeoLeft, material);
    leftMesh.position.set(wallLength * -.4, wallHeight* -.5, 0);

    //RIGHT
    this.wallGeoRight = new THREE.BoxGeometry(wallLength *.4, wallHeight * .5, 1);
    var rightMesh = new THREE.Mesh(this.wallGeoRight, material);
    rightMesh.position.set(wallLength * .3, wallHeight* -.5, 0);      
    
    //ADD TO WALL       
    this.wall.add(topMesh);
    this.wall.add(leftMesh);
    this.wall.add(rightMesh);

    //compensate for ????
    this.wall.position.set(0, wallHeight*.25, 0);
  } else if (hasWindow) {
    //TOP   
    this.wallGeoTop = new THREE.BoxGeometry(wallLength, wallHeight * .4, 1);
    
    var topMesh = new THREE.Mesh(this.wallGeoTop, material);
    topMesh.position.set(0, 0, 0);

    //BOTTOM
    this.wallGeoBottom = new THREE.BoxGeometry(wallLength, wallHeight * .2, 1);

    var bottomMesh = new THREE.Mesh(this.wallGeoBottom, material);
    bottomMesh.position.set(0, wallHeight * -.7, 0);

    //RIGHT
    this.wallGeoRight = new THREE.BoxGeometry(wallLength *.2, wallHeight * .4, 1);
    
    var rightMesh = new THREE.Mesh(this.wallGeoRight, material);
    rightMesh.position.set(wallLength * -.4, wallHeight* -.4, 0); 

    //LEFT
    this.wallGeoLeft = new THREE.BoxGeometry(wallLength *.6, wallHeight * .4, 1);
    var leftMesh = new THREE.Mesh(this.wallGeoLeft, material);
    leftMesh.position.set(wallLength * .2, wallHeight* -.4, 0);

    //ADD TO WALL  
    this.wall.add(topMesh);
    this.wall.add(bottomMesh);
    this.wall.add(leftMesh);
    this.wall.add(rightMesh);

    //compensate for ????
    this.wall.position.set(0, wallHeight*.3, 0);
  } else {
    //SOLID WALL
    let wallGeo = new THREE.BoxGeometry(wallLength, wallHeight, 1);
    let wallMesh = new THREE.Mesh(wallGeo, material);
    this.wall.add(wallMesh);
  }
}

//All rotations are 90 deg  
Wall.prototype.clockwiseX = function () {
    this.wall.rotation.set(Math.PI / 2, 0, 0);
    return this;
};

Wall.prototype.clockwiseY = function () { 
    this.wall.rotation.set(0, Math.PI / 2, 0);
    return this;
};
Wall.prototype.Z = function () { 
    this.wall.rotation.z = Math.PI / 2;
    return this;
};

Wall.prototype.counterClockwiseX = function () { 
    this.wall.rotation.set(-Math.PI / 2, 0, 0);
    return this;
};

Wall.prototype.counterClockwiseY = function () { 
    this.wall.rotation.set(0, -Math.PI / 2, 0);
    return this;
};

    
