'use strict'

const whiteStone = loadTexture('white-stone.jpg');
const blue = loadTexture('blue.png');
const whiteCeiling = loadTexture('white_ceiling.jpg');
const grayTile = loadTexture('gray_tile.jpg');
const woodLightTile = loadTexture('floor_tiles.jpg');
const woodDark = loadTexture('wood-wall.jpg');
const woodLight = loadTexture('wood-floor.jpg');
const redCarpet = loadTexture('carpet_red.jpg');
const blueCarpet = loadTexture('carpet_blue.jpg');
const grayCarpet = loadTexture('carpet_gray.jpg');
const brick = loadTexture('brownBrick.jpg');
const wallHeight = 75;

 // Regular meshes for non-textured walls
var palaceObjects = [];
var walls = [];
// Regular meshes for non-textured walls
// const tan = new THREE.MeshLambertMaterial({color: 0xECE5CE})
// const coral = new THREE.MeshLambertMaterial({color: 0xE08E79})
// const peach = new THREE.MeshLambertMaterial({color: 0xF1D4AF})
// const woodLight = new THREE.MeshLambertMaterial({color: 0xC5E0DC})
// const burgundy = new THREE.MeshLambertMaterial({color: 0x774F38})

function loadTexture(file) {
  const texture = THREE.ImageUtils.loadTexture("./browser/textures/" + file);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
};

module.exports = function(objectFactory, tableFactory, wallFactory, messageFactory, constantsFactory, shelfFactory) {
  
  function floor (w, h, positionX, positionZ, material) {
    if (!material) material = redCarpet;
    this.floor = new wallFactory.Wall(w, h, material, false, false)
      .clockwiseX()
      .wall;
    this.floor.name = "floor"
    this.floor.position.set(positionX,-75/2 ,positionZ);
  }

  function ceiling (w, h, positionX, positionZ) {
    this.ceiling = new wallFactory.Wall(w, h, whiteCeiling, false, false)
      .clockwiseX()
      .wall;
    this.ceiling.name = "ceiling"
    this.ceiling.position.set(positionX,75/2,positionZ);
  }

  function Palace() {
    this.palace = new THREE.Object3D();
    this.walls = [];
    //ceilings
    // const sectionOneHeight = (150 + 75.5 + 75 + 1).ceiling;
    const sectionOneRoof = new ceiling(150, 301.5, 75,  -150).ceiling;
    const sectionTwoRoof = new ceiling(150, 375, 225, -185).ceiling;
    const kitchenRoof = new ceiling(150, 175, 225+150, -265).ceiling;
    const bedRoom3Roof = new ceiling(150, 175, 525, -265).ceiling;
    const mainHallRoof = new ceiling(225, 175, 412, -87).ceiling;
    const sunRoomRoof = new ceiling (75, 175, 562, -87).ceiling;
    this.addToScene(sectionOneRoof);
    this.addToScene(sectionTwoRoof);
    this.addToScene(kitchenRoof);
    this.addToScene(bedRoom3Roof);
    this.addToScene(mainHallRoof);
    this.addToScene(mainHallRoof);
    this.addToScene(sunRoomRoof);

    const sectionOneFloor = new floor(150, 301.5, 75,  -150).floor;
    const sectionTwoFloor = new floor(150, 375, 225, -185).floor;
    const kitchenFloor = new floor(150, 175, 225+150, -265, grayTile).floor;
    const bedRoom3Floor = new floor(150, 175, 525, -265).floor;
    const mainHallFloor = new floor(225, 175, 412, -87).floor;
    const sunRoomFloor = new floor (75, 175, 562, -87).floor;
    this.addToScene(sectionOneFloor);
    this.addToScene(sectionTwoFloor);
    this.addToScene(kitchenFloor);
    this.addToScene(bedRoom3Floor);
    this.addToScene(mainHallFloor);
    this.addToScene(mainHallFloor);
    this.addToScene(sunRoomFloor);

    function addWall (wall) {
      this.addToScene(wall);
      this.walls.push(wall);
    }

    //BEDROOM 1
    var b1Outerwall1 = new wallFactory.Wall(150, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    b1Outerwall1.position.set(0, 0, -75);
    addWall.call(this, b1Outerwall1)

    var b1Outerwall2 = new wallFactory.Wall(150, wallHeight, woodLight, false, true)
      .wall;
    b1Outerwall2.position.x = 75 - 0.5;
    b1Outerwall2.position.z = .5;
    addWall.call(this, b1Outerwall2)

    var b1Door = new wallFactory.Wall(75, wallHeight, woodLight, true, false)
      .clockwiseY()
      .wall;
    b1Door.position.z = (-75 / 2);
    b1Door.position.x = (150 - 1);
    addWall.call(this, b1Door)

    var b1Inner1 = new wallFactory.Wall(225.5, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    b1Inner1.position.z = - 75 - 225/2;
    b1Inner1.position.x = 150 - 1;
    addWall.call(this, b1Inner1)

    var b1Inner2 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, false, false)
      .wall;
    b1Inner2.position.z = (-150 - 1);
    b1Inner2.position.x = (75 / 2);
    addWall.call(this, b1Inner2)

    var b1InnerDoor = new wallFactory.Wall(75 - 1, wallHeight, woodLight, true, false)
      .wall;
    b1InnerDoor.position.z = -150 - 1;
    b1InnerDoor.position.x = 75/2 + 75 - 1;
    addWall.call(this, b1InnerDoor)

    //BEDROOM 2
    var b2Outer1 = new wallFactory.Wall(75.5, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    b2Outer1.position.z = -150 - 75/2;
    b2Outer1.position.x = 0;
    addWall.call(this, b2Outer1)

    var b2Outer2 = new wallFactory.Wall(75 + 1, wallHeight, woodLight, false, true)
      .clockwiseY()
      .wall;
    b2Outer2.position.z = -225 - 75/2 - .75;
    b2Outer2.position.x = 0;
    addWall.call(this, b2Outer2)

    var b2Outer3 = new wallFactory.Wall(150.5 - 2.5, wallHeight, woodLight, false, false)
      .wall;
    b2Outer3.position.z = -300 - 0.5;
    b2Outer3.position.x = 75 - 0.5;
    addWall.call(this, b2Outer3)

    var b2Inner1 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, false, false)
      .wall;
    b2Inner1.position.z = -225 - 1;
    b2Inner1.position.x = 75/2;
    addWall.call(this, b2Inner1)

    var b2Inner2 = new wallFactory.Wall(75 - 0.5, wallHeight, woodLight, true, false)
      .clockwiseY()
      .wall
    b2Inner2.position.z = -150 - 75/2 - 1;
    b2Inner2.position.x = 75 - 1;
    addWall.call(this, b2Inner2)

    //LIVING ROOM
    var livingroomOuter1 = new wallFactory.Wall(75, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    livingroomOuter1.position.z = -225 - 225/2 - 0.25;
    livingroomOuter1.position.x = 150 - 1;
    addWall.call(this, livingroomOuter1)

    var livingroomOuter2 = new wallFactory.Wall(75, wallHeight, woodLight, true, false)
      .wall;
    livingroomOuter2.position.z = -375 + 0.25;
    livingroomOuter2.position.x = 150 + 75/2 - 0.5;

    addWall.call(this, livingroomOuter2);

    var livingroomOuter3 = new wallFactory.Wall(75, wallHeight, woodLight, false, true)
      .wall;
    livingroomOuter3.position.z = -375 + 0.25 ;
    livingroomOuter3.position.x = 225 + 75/2 - 0.5 ;

    addWall.call(this, livingroomOuter3);

    var livingroomOuter4 = new wallFactory.Wall(25, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    livingroomOuter4.position.z = -250 - 225/2 - 0.25;
    livingroomOuter4.position.x = 300 - .5;

    addWall.call(this, livingroomOuter4);

    //KITCHEN
    var kitchenInner1 = new wallFactory.Wall(175, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    kitchenInner1.position.z = -150 - 225/2 - 0.25;
    kitchenInner1.position.x = 300 - 0.5;
    addWall.call(this, kitchenInner1)

    var kitchenOuter1 = new wallFactory.Wall(75, wallHeight, woodLight, false, true)
      .wall;
    kitchenOuter1.position.z = -350 + 0.25 - 1;
    kitchenOuter1.position.x = 300 - 0.5 + 75/2;
    addWall.call(this, kitchenOuter1)

    var kitchenOuter2 = new wallFactory.Wall(75, wallHeight, woodLight, false, false)
      .wall;
    kitchenOuter2.position.z = -350 + 0.25 - 1;
    kitchenOuter2.position.x = 375 - 0.5 + 75/2;
    addWall.call(this, kitchenOuter2)

    var kitchenInner2 = new wallFactory.Wall(75, wallHeight, woodLight, false, false)
      .wall;
    kitchenInner2.position.z = -175 + 0.25 - 1;
    kitchenInner2.position.x = 300 - 0.5 + 75/2;
    addWall.call(this, kitchenInner2)

    var kitchenInner3 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, true, false)
      .wall;
    kitchenInner3.position.z = -175 + 0.25 - 1;
    kitchenInner3.position.x = 375 + 75/2 - 1;
    addWall.call(this, kitchenInner3)

    var kitchenInner4 = new wallFactory.Wall(175, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    kitchenInner4.position.z = -150 - 225/2 - 0.25;
    kitchenInner4.position.x = 400 - 0.5 + 75/2 + 12;
    addWall.call(this, kitchenInner4)

    //BEDROOM 3
    var b3Outer1 = new wallFactory.Wall(75, wallHeight, woodLight, false, false)
      .wall;
    b3Outer1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1;
    b3Outer1.position.x = 75 - .5 + 75 + 75 / 2 + 75 + 75 / 2 + 75 / 2 + 75 + 75;
    addWall.call(this, b3Outer1)

    var b3Outer2 = new wallFactory.Wall(75, wallHeight, woodLight, false, true)
      .wall;
    b3Outer2.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1;
    b3Outer2.position.x = 75 - .5 + 75 + 75 / 2 + 75 + 75 / 2 + 75 / 2 + 75 + 75 + 75;
    addWall.call(this, b3Outer2)

    var b3Outer3 = new wallFactory.Wall(175 + 1, wallHeight, woodLight, false, true)
      .counterClockwiseY()
      .wall;
    b3Outer3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5;
    b3Outer3.position.x = 75 + 75 + 75 / 2 + 75 + 75 / 2 + 300;
    addWall.call(this, b3Outer3)

    var b3Inner1 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, false, false)
      .wall;
    b3Inner1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 - 75;
    b3Inner1.position.x = 75 / 2 + 525;
    addWall.call(this, b3Inner1)

    var b3Inner2 = new wallFactory.Wall(75, wallHeight, woodLight, true, false)
      .clockwiseY()
      .wall;
    b3Inner2.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 - 75 / 2;
    b3Inner2.position.x = 525;
    addWall.call(this, b3Inner2)

    var b3Inner3 = new wallFactory.Wall(75 - 1, wallHeight, woodLight, false, false)
      .wall;
    b3Inner3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175;
    b3Inner3.position.x = 75 / 2 + 525;
    addWall.call(this, b3Inner3)

    var b3Inner4 = new wallFactory.Wall(75 + 1, wallHeight, woodLight, true, false)
      .wall;
    b3Inner4.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175;
    b3Inner4.position.x = 75 / 2 + 525 - 75 - 1;
    addWall.call(this, b3Inner4)

    // SUNROOM

    var sunroomOuter1 = new wallFactory.Wall(175 / 2, wallHeight, woodLight, false, true)
      .counterClockwiseY()
      .wall;
    sunroomOuter1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5;
    sunroomOuter1.position.x = 600;
    addWall.call(this, sunroomOuter1)

    var sunroomOuter2 = new wallFactory.Wall(175 / 2 + 1, wallHeight, woodLight, false, true)
      .clockwiseY()
      .wall;
    sunroomOuter2.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 + 75 + 25 / 2;
    sunroomOuter2.position.x = 600;
    addWall.call(this, sunroomOuter2)

    var sunroomOuter3 = new wallFactory.Wall(75, wallHeight, woodLight, false, true)
      .wall;
    sunroomOuter3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    sunroomOuter3.position.x = 75 / 2 + 525 + .5;
    addWall.call(this, sunroomOuter3)

    var sunroomInner1 = new wallFactory.Wall(75, wallHeight, woodLight, false, true)
      .counterClockwiseY()
      .wall;
    sunroomInner1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 - 25 / 4;
    sunroomInner1.position.x = 600 - 75;
    addWall.call(this, sunroomInner1)

    var sunroomDoor = new wallFactory.Wall(75, wallHeight, woodLight, true, false)
      .clockwiseY()
      .wall;
    sunroomDoor.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 2 + 0.5 + 75 + 25 / 2;
    sunroomDoor.position.x = 600 - 75;
    addWall.call(this, sunroomDoor)

    var sunroomInner3 = new wallFactory.Wall(25.5, wallHeight, woodLight, false, false)
      .clockwiseY()
      .wall;
    sunroomInner3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 + 75 + 50 - 25 / 4;
    sunroomInner3.position.x = 600 - 75;
    addWall.call(this, sunroomInner3)

    //MAIN HALL

    var mainHallOuter1 = new wallFactory.Wall(75, wallHeight, woodLight, false, false)
      .wall;
    mainHallOuter1.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    mainHallOuter1.position.x = 525 - 75 / 2 + .5;
    addWall.call(this, mainHallOuter1)

    var mainHallOuter2 = new wallFactory.Wall(75, wallHeight, woodLight, false, false)
      .wall;
    mainHallOuter2.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    mainHallOuter2.position.x = 525 - 75 / 2 + .5 - 75;
    addWall.call(this, mainHallOuter2)

    var mainHallOuter3 = new wallFactory.Wall(75, wallHeight, woodLight, true, false)
      .wall;
    mainHallOuter3.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    mainHallOuter3.position.x = 525 - 75 / 2 + .5 - 75 - 75;
    addWall.call(this, mainHallOuter3)

    var mainHallOuter4 = new wallFactory.Wall(151, wallHeight, woodLight, false, false)
      .wall;
    mainHallOuter4.position.z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    mainHallOuter4.position.x = 525 - 75 / 2 + .5 - 75 - 75 - 113;
    addWall.call(this, mainHallOuter4)


     //FURNITURE
    var self = this;
    var sceneObjects = constantsFactory.getObjects();

    function loadObject (name, scale, cb) {
      return objectFactory.load(`/browser/objects/${name}/${name}.json`, scale, name)
              .then(object => {
                cb(object)
                addObj(object)
              })
    }
    function addObj (object) {
        // self.addToScene(object);
        self.addToScene(object)
        palaceObjects.push(object);
        constantsFactory.setObjects([object]);
    }
    //kitchen table
    loadObject("table", 15, function(table){
        table.position.set(330, -40, -200);
        table.rotation.set(0, Math.PI, 0)
    });

    loadObject("stove", 15, function(stove){
        stove.position.set(425, -40, -335);
        stove.rotation.set(0, Math.PI, 0)
    });
    //bedroom3
    loadObject("pink-bed", 15, function(bed3){
      bed3.position.set(475, -35, -315);
      bed3.scale.set(1.5, 1.5, 1.5)
      bed3.rotation.set(0, Math.PI, 0)
    });

    loadObject("lamp", 15, function(lamp){
      lamp.position.set(530, -37, -255);
      lamp.scale.set(.15,.15, .15)
    });

    loadObject("shelf-tv", 15, function(shelf){
      shelf.position.set(570, -40, -255);
      shelf.rotation.set(0, Math.PI/2 + Math.PI, 0)
      shelf.scale.set(1.35, 1.35, 1.35)
    });
      //living room
    loadObject("sofa", 2, function(sofa){
      sofa.position.set(170, -36, -200);
      sofa.rotation.set(0, Math.PI, 0)
    });

    loadObject("armchair", 2, function(armchair){
      armchair.position.set(175, -40, -150);
      armchair.rotation.set(0, Math.PI + Math.PI/2 + Math.PI/2/2, 0)
      armchair.scale.set(6, 6, 6)
    });

    loadObject("armchair", 2, function(armchair){
      armchair.position.set(175, -40, -225);
      armchair.rotation.set(0, Math.PI + Math.PI/2/2, 0)
      armchair.scale.set(6, 6, 6)
    });
    loadObject("coffee-table", 2, function(table){
      table.position.set(200, -40, -190);
      table.scale.set(.35, .35, .35)
    });

    loadObject("paintings", 2, function(obj){
      obj.position.set(152, 0, -190);
      obj.rotation.set(0, -Math.PI/2, 0);
      obj.scale.set(2, 2, 2)
    });

    loadObject("lamp", 15, function(lamp){
      lamp.position.set(170, -37, -300);
      lamp.scale.set(.15,.15, .15)
    });
    //shelves
    var shelf = new shelfFactory();
    shelf.container.position.set(294, -30, -275);
    self.addToScene(shelf.container);
    palaceObjects.push(shelf.container);
    constantsFactory.setObjects([shelf.container]);

    //bedroom1
    loadObject ("bed", 2, function(bed){
      bed.position.set(65, -30, -100);
      bed.rotation.set(0, Math.PI, 0)
      bed.scale.set(7, 7, 7)})

    loadObject ("desk", 2, function(desk) {
      desk.position.set(25, -30, -50);
      desk.rotation.set(0, Math.PI/2, 0)
      desk.scale.set(9, 9, 9)
    });

    loadObject("computer", 2,function(computer) {
      computer.position.set(28, -16, -48);
      computer.scale.set(2, 2, 2)
    });
    loadObject("bean-bag", 2, function(beanbag){
      beanbag.position.set(135, -37, -140);
      beanbag.rotation.set(0, Math.PI, 0)
      beanbag.scale.set(7, 7, 7)
    });
      //bedroom2
    loadObject("pink-bed", 15, function(bed3){
      bed3.position.set(60, -35, -260);
      bed3.scale.set(.5, .5, .5)
      bed3.rotation.set(0, Math.PI+Math.PI/2, 0)
    });
  
  }
  // console.log("herewalls", this.walls)
  Palace.prototype.addToScene = function(mesh) {
    this.palace.add(mesh);
  };

  return {
    Palace: Palace,
    palaceObjects: palaceObjects
  };

};
