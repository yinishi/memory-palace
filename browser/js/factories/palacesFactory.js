'use strict'

const whiteStone = loadTexture('white-stone.jpg');
const blue = loadTexture('blue.png');
const whiteCeiling = loadTexture('white_ceiling2.jpg');
const grayTile = loadTexture('gray_tile.jpg');
const whiteStoneTile = loadTexture('floor_tiles.jpg');
const woodDark = loadTexture('wood-wall.jpg');
const woodLight = loadTexture('wood-floor.jpg');
const redCarpet = loadTexture('carpet_red.jpg');
const blueCarpet = loadTexture('carpet_blue.jpg');
const grayCarpet = loadTexture('carpet_gray.jpg');
const brick = loadTexture('brownBrick.jpg');
const wallHeight = 75;
const EventEmitter = require("events").EventEmitter;

 // Regular meshes for non-textured walls

// Regular meshes for non-textured walls
// const tan = new THREE.MeshLambertMaterial({color: 0xECE5CE})
// const coral = new THREE.MeshLambertMaterial({color: 0xE08E79})
// const peach = new THREE.MeshLambertMaterial({color: 0xF1D4AF})
// const whiteStone = new THREE.MeshLambertMaterial({color: 0xC5E0DC})
// const burgundy = new THREE.MeshLambertMaterial({color: 0x774F38})

function loadTexture(file) {
  const texture = THREE.ImageUtils.loadTexture("./browser/textures/" + file);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
};

module.exports = function(objectFactory, tableFactory, wallFactory, messageFactory, constantsFactory, shelfFactory) {
  var palaceObjects = [];
  var walls = [];
  var emitter = new EventEmitter(); 

  function floor (w, h, positionX, positionZ, material) {
    if (!material) material = woodDark;
    this.floor = new wallFactory.Wall(w, h, material, false, false)
      .clockwiseX()
      .wall;
    this.floor.name = "floor"
    this.floor.position.set(positionX,-75/2 ,positionZ);
  }

  function ceiling (w, h, positionX, positionZ, material) {
    if (!material) material = whiteCeiling;
    this.ceiling = new wallFactory.Wall(w, h, material, false, false)
      .clockwiseX()
      .wall;
    this.ceiling.name = "ceiling"
    this.ceiling.position.set(positionX,75/2,positionZ);
  }

  function Palace() {
    this.palace = new THREE.Object3D();
    this.walls = [];
    //ceilings
    const sectionOneRoof = new ceiling(150, 301.5, 75,  -150).ceiling;
    const sectionTwoRoof = new ceiling(150, 374, 225, -187.5).ceiling;
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
    //floor
    const sectionOneFloor = new floor(148.5, 299.25, 75,  -149.85, redCarpet).floor;
    const mainHallOneFloor = new floor(149, 374, 224.75, -187.5).floor;
    const mainHallTwoFloor = new floor(200, 175, 399.25, -87).floor;
    const kitchenFloor = new floor(150, 175, 225+150, -263, grayTile).floor;
    const bedRoom3Floor = new floor(150, 175, 525, -263).floor;
    const sunRoomFloor = new floor (100, 175, 550, -86.75, redCarpet).floor;
    this.addToScene(sectionOneFloor);
    this.addToScene(mainHallOneFloor);
    this.addToScene(kitchenFloor);
    this.addToScene(bedRoom3Floor);
    this.addToScene(mainHallTwoFloor);
    this.addToScene(sunRoomFloor);

    function addWall (wall, positionX, positionY, positionZ) {
      wall.wall.position.z = positionZ;
      wall.wall.position.x = positionX;
      this.addToScene(wall.wall);
      this.walls.push(wall.wall);
    }

    //BEDROOM 1
    var b1Outerwall1 = new wallFactory.Wall(150, wallHeight, whiteStone, false, false)
      .clockwiseY();
    addWall.call(this, b1Outerwall1, 0, 0, -75 );

    var b1Outerwall2 = new wallFactory.Wall(150, wallHeight, whiteStone, false, true)
    addWall.call(this, b1Outerwall2, (75 - 0.5), 0, .5);

    var b1Door = new wallFactory.Wall(75, wallHeight, whiteStone, true, false)
      .clockwiseY()
    addWall.call(this, b1Door, 149, 0, (-75 / 2));

    var b1Inner1 = new wallFactory.Wall(225.5, wallHeight, whiteStone, false, false)
      .clockwiseY()
    addWall.call(this, b1Inner1, 149, 0, (- 75 - 225/2));

    var b1Inner2 = new wallFactory.Wall(75 - 1, wallHeight, whiteStone, false, false)
    addWall.call(this, b1Inner2, (75 / 2), 0, (-150 - 1));

    var b1InnerDoor = new wallFactory.Wall(75 - 1, wallHeight, whiteStone, true, false)
    addWall.call(this, b1InnerDoor, (75/2 + 75 - 1), 0, (-150 - 1));

    //BEDROOM 2
    var b2Outer1 = new wallFactory.Wall(75.5, wallHeight, whiteStone, false, false)
      .clockwiseY()
    addWall.call(this, b2Outer1, 0, 0, -150 - 75/2)

    var b2Outer2 = new wallFactory.Wall(75 + 1, wallHeight, whiteStone, false, true)
      .clockwiseY();
    addWall.call(this, b2Outer2, 0, 0, (-225 - 75/2 - .75));

    var b2Outer3 = new wallFactory.Wall(150.5 - 2.5, wallHeight, whiteStone, false, false)
    addWall.call(this, b2Outer3, 75 - 0.5, 0 ,-300 - 0.5 )

    var b2Inner1 = new wallFactory.Wall(75 - 1, wallHeight, whiteStone, false, false)
    addWall.call(this, b2Inner1, 75/2, 0, -225 - 1)

    var b2Inner2 = new wallFactory.Wall(75 - 0.5, wallHeight, whiteStone, true, false)
      .clockwiseY()
    addWall.call(this, b2Inner2, 75 - 1, 0 ,  -150 - 75/2 - 1)

    //LIVING ROOM
    var livingroomOuter1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
      .clockwiseY()
    addWall.call(this, livingroomOuter1, 149, 0, -225 - 225/2 - 0.25)

    var livingroomOuter2 = new wallFactory.Wall(75, wallHeight, whiteStone, true, false)
    addWall.call(this, livingroomOuter2, 150 + 75/2 - 0.5, 0, -375 + 0.25);

    var livingroomOuter3 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
    addWall.call(this, livingroomOuter3, 225 + 75/2 - 0.5, 0, -375 + 0.25);

    var livingroomOuter4 = new wallFactory.Wall(25, wallHeight, whiteStone, false, false)
      .clockwiseY()
    addWall.call(this, livingroomOuter4, 300 - .5, 0, -250 - 225/2 - 0.25);

    //KITCHEN
    var kitchenInner1 = new wallFactory.Wall(175, wallHeight, whiteStone, false, false)
      .clockwiseY()
    addWall.call(this, kitchenInner1, 300 - 0.5, 0, -150 - 225/2 - 0.25)

    var kitchenOuter1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
    addWall.call(this, kitchenOuter1, 300 - 0.5 + 75/2, 0, -350 + 0.25 - 1)

    var kitchenOuter2 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
    addWall.call(this, kitchenOuter2, 375 - 0.5 + 75/2, 0, -350 + 0.25 - 1)

    var kitchenInner2 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
    addWall.call(this, kitchenInner2, 300 - 0.5 + 75/2, 0, -175 + 0.25 - 1)

    var kitchenInner3 = new wallFactory.Wall(75 - 1, wallHeight, whiteStone, true, false)
    addWall.call(this, kitchenInner3, 375 + 75/2 - 1, 0, -175 + 0.25 - 1)

    var kitchenInner4 = new wallFactory.Wall(175, wallHeight, whiteStone, false, false)
      .clockwiseY()
    addWall.call(this, kitchenInner4, 400 - 0.5 + 75/2 + 12, 0, -150 - 225/2 - 0.25)
   

    //BEDROOM 3
    var z, x
    var b3Outer1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1;
    x = 75 - .5 + 75 + 75 / 2 + 75 + 75 / 2 + 75 / 2 + 75 + 75;
    addWall.call(this, b3Outer1, x, 0, z)

    var b3Outer2 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1;
    x = 75 - .5 + 75 + 75 / 2 + 75 + 75 / 2 + 75 / 2 + 75 + 75 + 75;
    addWall.call(this, b3Outer2, x, 0, z);

    var b3Outer3 = new wallFactory.Wall(175 + 1, wallHeight, whiteStone, false, true)
      .counterClockwiseY()
    z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5;
    x = 75 + 75 + 75 / 2 + 75 + 75 / 2 + 300;
    addWall.call(this, b3Outer3, x, 0, z)

    var b3Inner1 = new wallFactory.Wall(75 - 1, wallHeight, whiteStone, false, false)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 - 75;
    addWall.call(this, b3Inner1, 75 / 2 + 525, 0, z)

    var b3Inner2 = new wallFactory.Wall(75, wallHeight, whiteStone, true, false)
      .clockwiseY()
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 - 75 / 2;
    addWall.call(this, b3Inner2, 525, 0, z)

    var b3Inner3 = new wallFactory.Wall(75 - 1, wallHeight, whiteStone, false, false)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175;
    addWall.call(this, b3Inner3, 75 / 2 + 525, 0, z)

    var b3Inner4 = new wallFactory.Wall(75 + 1, wallHeight, whiteStone, true, false)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175;
    x = 75 / 2 + 525 - 75 - 1;
    addWall.call(this, b3Inner4, x, 0, z)

    // SUNROOM
    var sunroomOuter1 = new wallFactory.Wall(175 / 2, wallHeight, whiteStone, false, true)
      .counterClockwiseY()
    z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5;
    addWall.call(this, sunroomOuter1, 600, 0, z)

    var sunroomOuter2 = new wallFactory.Wall(175 / 2 + 1, wallHeight, whiteStone, false, true)
      .clockwiseY()
    z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 + 75 + 25 / 2;
    addWall.call(this, sunroomOuter2, 600, 0, z)

    var sunroomOuter3 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    x = 75 / 2 + 525 + .5;
    addWall.call(this, sunroomOuter3, x, 0, z)

    var sunroomInner1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, true)
      .counterClockwiseY()
    z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 - 25 / 4;
    addWall.call(this, sunroomInner1, 500, 0, z)

    var sunroomDoor = new wallFactory.Wall(75, wallHeight, whiteStone, true, false)
      .clockwiseY()
    z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 2 + 0.5 + 75 + 25 / 2;
    addWall.call(this, sunroomDoor,500, 0, z)

    var sunroomInner3 = new wallFactory.Wall(25.5, wallHeight, whiteStone, false, false)
      .clockwiseY()
    z = ((-75 / 2) - 75) - 225 / 2 - 75 / 2 - .25 - 0.5 + 150 - 75 / 4 + 0.5 + 75 + 50 - 25 / 4;
    addWall.call(this, sunroomInner3,500, 0, z)

    //MAIN HALL

    var mainHallOuter1 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    x = 525 - 75 / 2 + .5;
    addWall.call(this, mainHallOuter1, x, 0, z)

    var mainHallOuter2 = new wallFactory.Wall(75, wallHeight, whiteStone, false, false)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    x = 525 - 75 / 2 + .5 - 75;
    addWall.call(this, mainHallOuter2, x, 0,z)

    var mainHallOuter3 = new wallFactory.Wall(75, wallHeight, whiteStone, true, false)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    x = 525 - 75 / 2 + .5 - 75 - 75;
    addWall.call(this, mainHallOuter3, x, 0, z)

    var mainHallOuter4 = new wallFactory.Wall(151, wallHeight, whiteStone, false, false)
    z = ((-75 / 2) - 75) - 225 / 2 - 75 - 75 / 2 + .25 - 75 / 2 + 25 - 1 + 175 + 175 + 1.25;
    x = 525 - 75 / 2 + .5 - 75 - 75 - 113;
    addWall.call(this, mainHallOuter4, x, 0, z)


     //FURNITURE
    var self = this;
    var sceneObjects = constantsFactory.getObjects();

    function loadObject (name, scale, cb) {
      return objectFactory.load(`/browser/objects/${name}/${name}.json`, scale, name)
        .then(object => {
          cb(object)
          addObj(object);
          emitter.emit("load", object.childName)
          return object;
        });
    }

    function addObj (object) {
        self.addToScene(object)
        palaceObjects.push(object);
        constantsFactory.addPalaceObj(object);
    }
    //kitchen table
    Promise.all([loadObject("table", 15, function(table){
        table.position.set(330, -40, -200);
        table.rotation.set(0, Math.PI, 0)
    }),

    loadObject("stove", 15, function(stove){
        stove.position.set(425, -40, -335);
        stove.rotation.set(0, Math.PI, 0)
    }),
    //bedroom3
    loadObject("pink-bed", 15, function(bed3){
      bed3.position.set(475, -35, -315);
      bed3.scale.set(1.5, 1.5, 1.5)
      bed3.rotation.set(0, Math.PI, 0)
    }),

    loadObject("lamp", 15, function(lamp){
      lamp.position.set(530, -37, -255);
      lamp.scale.set(.15,.15, .15)
    }),

    loadObject("shelf-tv", 15, function(shelf){
      shelf.position.set(570, -40, -255);
      shelf.rotation.set(0, Math.PI/2 + Math.PI, 0)
      shelf.scale.set(1.35, 1.35, 1.35)
    }),
      //living room
    loadObject("sofa", 2, function(sofa){
      sofa.position.set(170, -36, -200);
      sofa.rotation.set(0, Math.PI, 0)
    }),

    loadObject("armchair", 2, function(armchair){
      armchair.position.set(175, -40, -150);
      armchair.rotation.set(0, Math.PI + Math.PI/2 + Math.PI/2/2, 0)
      armchair.scale.set(6, 6, 6)
    }),

    loadObject("armchair", 2, function(armchair){
      armchair.position.set(175, -40, -225);
      armchair.rotation.set(0, Math.PI + Math.PI/2/2, 0)
      armchair.scale.set(6, 6, 6)
    }),
    loadObject("coffee-table", 2, function(table){
      table.position.set(200, -40, -190);
      table.scale.set(.35, .35, .35)
    }),

    loadObject("paintings", 2, function(obj){
      obj.position.set(152, 0, -190);
      obj.rotation.set(0, -Math.PI/2, 0);
      obj.scale.set(2, 2, 2)
    }),

    loadObject("lamp", 15, function(lamp){
      lamp.position.set(170, -37, -300);
      lamp.scale.set(.15,.15, .15)
    }),
 
    //bedroom1
    loadObject ("bed", 2, function(bed){
      bed.position.set(65, -30, -100);
      bed.rotation.set(0, Math.PI, 0)
      bed.scale.set(7, 7, 7)}),

    loadObject ("desk", 2, function(desk) {
      desk.position.set(25, -30, -50);
      desk.rotation.set(0, Math.PI/2, 0)
      desk.scale.set(9, 9, 9)
    }),

    loadObject("computer", 2,function(computer) {
      computer.position.set(28, -16, -48);
      computer.scale.set(2, 2, 2)
    }),
    loadObject("bean-bag", 2, function(beanbag){
      beanbag.position.set(135, -37, -140);
      beanbag.rotation.set(0, Math.PI, 0)
      beanbag.scale.set(7, 7, 7)
    }),
      //bedroom2
    loadObject("pink-bed", 15, function(bed3){
      bed3.position.set(60, -35, -260);
      bed3.scale.set(1, 1, 1)
      bed3.rotation.set(0, Math.PI+Math.PI/2, 0)
    })])
     .then(stuff =>  {
      emitter.emit("sceneLoaded")
    })
     .catch(err => console.log(err));

    //shelves
    var shelf = new shelfFactory();
    shelf.container.position.set(294, -30, -275);
    self.addToScene(shelf.container);
    palaceObjects.push(shelf.container);
    constantsFactory.setObjects([shelf.container]);

  }

  Palace.prototype.addToScene = function(mesh) {
    this.palace.add(mesh);
  };


  emitter.Palace = Palace;
  emitter.palaceObjects = palaceObjects;


  return emitter
};
