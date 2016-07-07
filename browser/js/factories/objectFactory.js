'use strict'

module.exports = function( modalFactory){
function formatLink (name) {
  return `/browser/objects/${name}/${name}.json`
}

function load (link, scale, name, message) {
    var loader = new THREE.ObjectLoader();
    return new Promise(function (res, rej) {
      loader.load(link, function(object){
        if(!scale) {
          factory.getObjects().forEach(function(item){
            if(item.name === name) object.scale.set(item.scale,item.scale,item.scale);
          });
        }
        else object.scale.set(scale,scale,scale);
        object.name = name;
        var boundingBox = new THREE.BoundingBoxHelper(object);
        boundingBox.add(object);
        boundingBox.update();
        var center = boundingBox.box.center()
        var size = boundingBox.box.size(new THREE.Vector3(1, 1, 1));
        var cubeGeometry = new THREE.BoxGeometry(size.x - center.x, size.y + center.y, size.z - center.z)
        var cube = new THREE.Mesh(cubeGeometry, 
        new THREE.MeshBasicMaterial({visible:false}));
        cube.name = "cube";
        cube.childName = object.name;
        // console.log(cubeGeometry.boundingSphere, "cube")
        // cube.position.set(boundingBox.position.x, boundingBox.position.y, boundingBox.position.z ) 
        // var cube = new THREE.Mesh(boundingBox.geometry, new THREE.MeshBasicMaterial());
        // cube.add(boundingBox)
        cube.add(object); 
        res(cube);
      });
    });
  }
  var invisibleCube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), 
        new THREE.MeshBasicMaterial({visible: false})); 

  var cache = {};

  var factory = {
    getObjects : function(){
     return [
        {name: 'teapot', image: "./browser/images/teapot.png", scale: .3, yPosition: 1},
        {name: 'fox', image: "./browser/images/fox.png", scale: .3},
        {name: 'monkey-piano', image: "./browser/images/monkey-piano.png", scale: .3},
        {name: 'pokeball', image: "./browser/images/pokeball.png", scale: .03},
        {name: 'turtle', image: "./browser/images/turtle.png", scale: 12},
        {name: 'candy', image: "./browser/images/candy.png", scale: 3},
        {name: 'flower', image: "./browser/images/flower.png", scale: .2},
        {name: 'tree', image: "./browser/images/tree.png", scale: .1},
        {name: 'snowman', image: "./browser/images/snowman.png", scale: 8},
        {name: 'bull', image: "./browser/images/bull.png", scale: 2},
        {name: 'lion-cub', image: "./browser/images/lion-cub.png", scale: 1, yPosition: 2},
        {name: 'mug', image: "./browser/images/mug.png", scale: .2, yPosition: 2},  
        {name: 'cat-mug', image: "./browser/images/cat-mug.png", scale: 3, yPosition: 2},    
        {name: 'pink-bed', image: "./browser/images/pink-bed.png", scale: 15},
        {name: 'bed', image: "./browser/images/bed.png", scale: 15, yPosition: 5},
        {name: 'chair', image: "./browser/images/chair.png", scale: 15, yPosition: 0},
        {name: 'armchair', image: "./browser/images/armchair.png", scale:10},
        {name: 'couch', image: "./browser/images/couch.png", scale: 20},
        {name: 'lamp', image: "./browser/images/lamp.png", scale: 2},
        {name: 'tv', image: "./browser/images/tv.png", scale: 5},
        {name: 'computer', image: "./browser/images/computer.png", scale: 5, yPosition: 8},
        {name: 'headphones', image: "./browser/images/headphones.png", scale: 2},
        {name: 'backgammon', image: "./browser/images/backgammon.png", scale: 3},
        {name: 'book', image: "./browser/images/book.png", scale: 1},
        {name: 'ukelele', image: "./browser/images/ukelele.png", scale: 0.05, yPosition: 20},
        {name: 'staff', image: "./browser/images/staff.png", scale: 2, yPosition: 6},
        {name: 'monster', image: "./browser/images/monster.png", scale: 1, yPosition: 3},
        {name: 'brain', image: "./browser/images/brain.png", scale: 3, yPosition: 5},
        {name: 'dress', image: "./browser/images/dress.png", scale: .5, yPosition: -8},
        {name: 'soccer-ball', image: "./browser/images/soccer-ball.png", scale: .07, yPosition: 3},
        {name: 'nike', image: "./browser/images/nike.png", scale: .5},
        {name: 'toy-train', image: "./browser/images/toy-train.png", scale:1},
        {name: 'tricycle', image: "./browser/images/tricycle.png", scale: 35},
        {name: 'car', image: "./browser/images/car.png", scale: 10},
      
      ];
    },
    invisibleObject: invisibleCube,
    currentObject: invisibleCube,
    setCurrentObject: function(object){
      modalFactory.toggleCarousel();
      var name = object.name;
      var scale = object.scale;
      (cache[name] || (cache[name] = load(`/browser/objects/${name}/${name}.json`, scale, name)))
        .then(function(obj){
          obj.name = name;
          obj.storageScale = scale;
          if(object.yPosition) obj.yPosition = object.yPosition;
          factory.previousObject = factory.currentObject;
          factory.currentObject = obj;
        })
    },
    load: load, 
    //add props form a retrieved db item to a threejs mesh

    setObjProps: function (obj, item) {
        let positionX = parseInt(item.positionX);
        let positionY = parseInt(item.positionY);
        let positionZ = parseInt(item.positionZ);
        obj.position.set(positionX, positionY, positionZ);
        obj.rotation.set(item.rotationX, item.rotationY, item.rotationZ);
        obj.scale.set(item.scaleX, item.scaleY, item.scaleZ);
        obj.storingId = item.id;
        obj.message = item.message;      
    }
  };

  return factory;
};