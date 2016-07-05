'use strict'
const whiteStone = loadTexture('white-stone.jpg');
const woodDark = loadTexture('wood-wall.jpg');
const woodLight = loadTexture('wood-floor.jpg');
const redCarpet = loadTexture('carpet_red.jpg');
const bricks = loadTexture('bricks.jpg');


// Regular meshes for non-textured walls
// const tan = new THREE.MeshLambertMaterial({color: 0xECE5CE})
// const coral = new THREE.MeshLambertMaterial({color: 0xE08E79})
// const peach = new THREE.MeshLambertMaterial({color: 0xF1D4AF})
// const blue = new THREE.MeshLambertMaterial({color: 0xC5E0DC})
// const burgundy = new THREE.MeshLambertMaterial({color: 0x774F38})

const wallHeight = 75;

function loadTexture(file) {
  const texture = THREE.ImageUtils.loadTexture("./browser/textures/" + file);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
};

module.exports = function(roomFactory, objectFactory, tableFactory, wallFactory) {

  function Palace() {
    this.objects = [];
    this.palace = new THREE.Object3D();

  	
  	// TEMPORARY FLOOR _ TO BE REPLACED AND CUSTOMIZED

    var tempPalaceFloor = new wallFactory.Wall(625, 450, redCarpet, false, false)
      .clockwiseX()
      .wall;
    tempPalaceFloor.position.set(625/2, -75/2 - 1, -450/2)
    this.addToScene(tempPalaceFloor);

    //Roof
    this.roof = new THREE.Object3D();
    //first wing roof/floor
    let sectionOneLength = 150
    let sectionOneHeight = (150 + 75.5 + 75 + 1)
    let sectionOneRoof = new wallFactory.Wall(sectionOneLength, sectionOneHeight, woodLight, false, false)
      .clockwiseX()
      .wall
     sectionOneRoof.position.set(75, 75/2, -150)
    this.addToScene(sectionOneRoof);

    //large 375
    let sectionTwoHeight = 375;
    let sectionTwoLength = 150; 
    let sectionTwoRoof = new wallFactory.Wall(sectionTwoLength, sectionTwoHeight, whiteStone, false, false)
    .clockwiseX()
    .wall
    sectionTwoRoof.position.set(225, 75/2, -185)
    this.addToScene(sectionTwoRoof);

    //kitchen rook 
    let kitchenRoof = new wallFactory.Wall(150, 175, woodLight, false, false)
    .clockwiseX()
    .wall;
      kitchenRoof.position.set(225+150, 75/2, -265)
    this.addToScene(kitchenRoof);


    //bedroom 3 roof
    let bedRoom3Roof = new wallFactory.Wall(150, 175, woodLight, false, false)
    .clockwiseX()
    .wall;
      bedRoom3Roof.position.set(225+150+150, 75/2, -265)
    this.addToScene(bedRoom3Roof);



    //main room section 2 
    //WORKING
    let mainHallRoof = new wallFactory.Wall(225, 175, whiteStone, false, false)
    .clockwiseX()
    .wall;
    mainHallRoof.position.set(225+187, 75/2, -87)
    this.addToScene(mainHallRoof);

  
    //150 x 175
    //BEDROOM 1
    //bedroom walls0
    var b1Outerwall1 = new wallFactory.Wall(150, wallHeight, whiteStone, false, false)
      .clockwiseY()
      .wall;
    b1Outerwall1.position.set(0, 0, -75);
    this.addToScene(b1Outerwall1);

    var b1Outerwall2 = new wallFactory.Wall(150, wallHeight, whiteStone, false, true)
      .wall;
    b1Outerwall2.position.x = 75 - 0.5;
    b1Outerwall2.position.z = .5;
    this.addToScene(b1Outerwall2);

    var b1Door = new wallFactory.Wall(75, wallHeight, woodLight, true, false)
      .clockwiseY()
      .wall;
    b1Door.position.z = (-75 / 2);
    b1Door.position.x = (150 - 1);
    this.addToScene(b1Door);

    var b1Inner1 = new wallFactory.Wall(225.5, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    b1Inner1.position.z = - 75 - 225/2;
    b1Inner1.position.x = 150 - 1;
    this.addToScene(b1Inner1);

    var b1Inner2 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, false, false)
      .wall;
    b1Inner2.position.z = (-150 - 1);
    b1Inner2.position.x = (75 / 2);
    this.addToScene(b1Inner2);

    var b1InnerDoor = new wallFactory.Wall(75 - 1, wallHeight, woodLight, true, false)
      .wall;
    b1InnerDoor.position.z = -150 - 1;
    b1InnerDoor.position.x = 75/2 + 75 - 1;
    this.addToScene(b1InnerDoor);

    //BEDROOM 2
    var b2Outer1 = new wallFactory.Wall(75.5, wallHeight, whiteStone, false, false)
      .clockwiseY()
      .wall;
    b2Outer1.position.z = -150 - 75/2;
    b2Outer1.position.x = 0;
    this.addToScene(b2Outer1);

    var b2Outer2 = new wallFactory.Wall(75 + 1, wallHeight, whiteStone, false, true)
      .clockwiseY()
      .wall;
    b2Outer2.position.z = -225 - 75/2 - .75;
    b2Outer2.position.x = 0;
    this.addToScene(b2Outer2);

    var b2Outer3 = new wallFactory.Wall(150.5 - 2.5, wallHeight, whiteStone, false, false)
      .wall;
    b2Outer3.position.z = -300 - 0.5;
    b2Outer3.position.x = 75 - 0.5;
    this.addToScene(b2Outer3);

    var b2Inner1 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, false, false)
      .wall;
    b2Inner1.position.z = -225 - 1;
    b2Inner1.position.x = 75/2;
    this.addToScene(b2Inner1);

    var b2Inner2 = new wallFactory.Wall(75 - 0.5, wallHeight, woodLight, true, false)
      .clockwiseY()
      .wall
    b2Inner2.position.z = -150 - 75/2 - 1;
    b2Inner2.position.x = 75 - 1;

    this.addToScene(b2Inner2);

    //LIVING ROOM
    var livingroomOuter1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
      .clockwiseY()
      .wall;
    livingroomOuter1.position.z = -225 - 225/2 - 0.25;
    livingroomOuter1.position.x = 150 - 1;

    this.addToScene(livingroomOuter1);

    var livingroomOuter2 = new wallFactory.Wall(75, wallHeight, whiteStone, true, false)
      .wall;
    livingroomOuter2.position.z = -375 + 0.25;
    livingroomOuter2.position.x = 150 + 75/2 - 0.5;

    this.addToScene(livingroomOuter2);

    var livingroomOuter3 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
      .wall;
    livingroomOuter3.position.z = -375 + 0.25 ;
    livingroomOuter3.position.x = 225 + 75/2 - 0.5 ;

    this.addToScene(livingroomOuter3);

    var livingroomOuter4 = new wallFactory.Wall(25, wallHeight, whiteStone, false, false)
      .clockwiseY()
      .wall;
    livingroomOuter4.position.z = -250 - 225/2 - 0.25;
    livingroomOuter4.position.x = 300 - .5;

    this.addToScene(livingroomOuter4);

    //KITCHEN
    var kitchenInner1 = new wallFactory.Wall(175, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    kitchenInner1.position.z = -150 - 225/2 - 0.25;
    kitchenInner1.position.x = 300 - 0.5;
    this.addToScene(kitchenInner1);

    var kitchenOuter1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
      .wall;
    kitchenOuter1.position.z = -350 + 0.25 - 1;
    kitchenOuter1.position.x = 300 - 0.5 + 75/2;
    this.addToScene(kitchenOuter1);

    var kitchenOuter2 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
      .wall;
    kitchenOuter2.position.z = -350 + 0.25 - 1;
    kitchenOuter2.position.x = 375 - 0.5 + 75/2;
    this.addToScene(kitchenOuter2);

    var kitchenInner2 = new wallFactory.Wall(75, wallHeight, woodLight, false, false)
      .wall;
    kitchenInner2.position.z = -175 + 0.25 - 1;
    kitchenInner2.position.x = 300 - 0.5 + 75/2;
    this.addToScene(kitchenInner2);

    var kitchenInner3 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, true, false)
      .wall;
    kitchenInner3.position.z = -175 + 0.25 - 1;
    kitchenInner3.position.x = 375 + 75/2 - 1;
    this.addToScene(kitchenInner3);

    var kitchenInner4 = new wallFactory.Wall(175, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    kitchenInner4.position.z = -150 - 225/2 - 0.25;
    kitchenInner4.position.x = 400 - 0.5 + 75/2 + 12;
    this.addToScene(kitchenInner4);

    //BEDROOM 3
    var b3Outer1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
      .wall;
    b3Outer1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1;
    b3Outer1.position.x = 75 - .5 + 75 + 75 / 2 + 75 + 75 / 2 + 75 / 2 + 75 + 75;
    this.addToScene(b3Outer1);

    var b3Outer2 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
      .wall;
    b3Outer2.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1;
    b3Outer2.position.x = 75 - .5 + 75 + 75 / 2 + 75 + 75 / 2 + 75 / 2 + 75 + 75 + 75;
    this.addToScene(b3Outer2);

    var b3Outer3 = new wallFactory.Wall(175 + 1, wallHeight, whiteStone, false, true)
      .counterClockwiseY()
      .wall;
    b3Outer3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5;
    b3Outer3.position.x = 75 + 75 + 75 / 2 + 75 + 75 / 2 + 300;
    this.addToScene(b3Outer3);

    var b3Inner1 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, false, false)
      .wall;
    b3Inner1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 - 75;
    b3Inner1.position.x = 75 / 2 + 525;
    this.addToScene(b3Inner1);

    var b3Inner2 = new wallFactory.Wall(75, wallHeight, woodLight, true, false)
      .clockwiseY()
      .wall;
    b3Inner2.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 - 75 / 2;
    b3Inner2.position.x = 525;
    this.addToScene(b3Inner2);

    var b3Inner3 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, false, false)
      .wall;
    b3Inner3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175;
    b3Inner3.position.x = 75 / 2 + 525;
    this.addToScene(b3Inner3);

    var b3Inner4 = new wallFactory.Wall(75 + 1, wallHeight, woodLight, true, false)
      .wall;
    b3Inner4.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175;
    b3Inner4.position.x = 75 / 2 + 525 - 75 - 1;
    this.addToScene(b3Inner4);

    // SUNROOM

    var sunroomOuter1 = new wallFactory.Wall(175 / 2, wallHeight, whiteStone, false, true)
      .counterClockwiseY()
      .wall;
    sunroomOuter1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5;
    sunroomOuter1.position.x = 600;
    this.addToScene(sunroomOuter1);

    var sunroomOuter2 = new wallFactory.Wall(175 / 2 + 1, wallHeight, whiteStone, false, true)
      .clockwiseY()
      .wall;
    sunroomOuter2.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 + 75 + 25 / 2;
    sunroomOuter2.position.x = 600;
    this.addToScene(sunroomOuter2);

    var sunroomOuter3 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
      .wall;
    sunroomOuter3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    sunroomOuter3.position.x = 75 / 2 + 525 + .5;
    this.addToScene(sunroomOuter3);

    var sunroomInner1 = new wallFactory.Wall(75, wallHeight, woodLight, false, true)
      .counterClockwiseY()
      .wall;
    sunroomInner1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 - 25 / 4;
    sunroomInner1.position.x = 600 - 75;
    this.addToScene(sunroomInner1);

    var sunroomDoor = new wallFactory.Wall(75, wallHeight, woodLight, true, false)
      .clockwiseY()
      .wall;
    sunroomDoor.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 2 + 0.5 + 75 + 25 / 2;
    sunroomDoor.position.x = 600 - 75;
    this.addToScene(sunroomDoor);

    var sunroomInner3 = new wallFactory.Wall(25.5, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    sunroomInner3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 + 75 + 50 - 25 / 4;
    sunroomInner3.position.x = 600 - 75;
    this.addToScene(sunroomInner3);

    //MAIN HALL

    var mainHallOuter1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
      .wall;
    mainHallOuter1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    mainHallOuter1.position.x = 525 - 75 / 2 + .5;
    this.addToScene(mainHallOuter1);

    var mainHallOuter2 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
      .wall;
    mainHallOuter2.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    mainHallOuter2.position.x = 525 - 75 / 2 + .5 - 75;
    this.addToScene(mainHallOuter2);

    var mainHallOuter3 = new wallFactory.Wall(75, wallHeight, whiteStone, true, false)
      .wall;
    mainHallOuter3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    mainHallOuter3.position.x = 525 - 75 / 2 + .5 - 75 - 75;
    this.addToScene(mainHallOuter3);

    var mainHallOuter4 = new wallFactory.Wall(151, wallHeight, whiteStone, false, false)
      .wall;
    mainHallOuter4.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    mainHallOuter4.position.x = 525 - 75 / 2 + .5 - 75 - 75 - 113;
    this.addToScene(mainHallOuter4);

  }

  Palace.prototype.addToScene = function(mesh) {
    this.objects.push(mesh);
    this.palace.add(mesh);
  };

  return {
    Palace: Palace
  };

};
