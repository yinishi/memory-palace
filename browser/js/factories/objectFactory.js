'use strict'

module.exports = function(){

function load (link, scale, name) {
    var loader = new THREE.ObjectLoader();
    return new Promise(function (res, rej) {
      loader.load(link, function(object){
        if(!scale) {
          a.getObjects().forEach(function(item){
            if(item.name === name) object.scale.set(item.scale,item.scale,item.scale);
          });
        }
        else object.scale.set(scale,scale,scale);
    
        var boundingBox = new THREE.BoundingBoxHelper(object);
        boundingBox.add(object);
        boundingBox.update();
      
        var cube = new THREE.Mesh(new THREE.BoxGeometry(boundingBox.box.max.x-boundingBox.box.min.x, boundingBox.box.max.y-boundingBox.box.min.y, boundingBox.box.max.z-boundingBox.box.min.z), 
        new THREE.MeshBasicMaterial({visible: false})); 
        cube.add(object); 
        res(cube);
      });
    });
  }
  var invisibleCube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), 
        new THREE.MeshBasicMaterial({visible: false})); 

  var cache = {};

  var a = {
    getObjects : function(){
     return [{name: 'teapot', image: "./browser/images/teapot.png", scale: .3},
             {name: 'fox', image: "./browser/images/fox.jpg", scale: .3},
             {name: 'table', image: "./browser/images/table.png", scale: 10},
             {name: 'staff', image: "./browser/images/staff.jpg", scale: 2},
             {name: 'monster', image: "./browser/images/monster.png", scale: 1},
             {name: 'brain', image: "./browser/images/brain.png", scale: 3},
             {name: 'sofa', image: "./browser/images/sofa.png", scale: 2},
             {name: 'cat-mug', image: "./browser/images/cat-mug.png", scale: 3},
             {name: 'mug', image: "./browser/images/mug.png", scale: .2},
             {name: 'tree', image: "./browser/images/tree.png", scale: .1},
             {name: 'car', image: "./browser/images/car.png", scale: 10},
             {name: 'bull', image: "./browser/images/bull.jpg", scale: 2},
             {name: 'flower', image: "./browser/images/flower.png", scale: .2},
             {name: 'cat', image: "./browser/images/cat.jpg", scale: 12},
             {name: 'turtle', image: "./browser/images/turtle.png", scale: 12},
             {name: 'bed', image: "./browser/images/bed.png", scale: 15},
             {name: 'dress', image: "./browser/images/dress.png", scale: .5},
             {name: 'soccer-ball', image: "./browser/images/soccer-ball.jpg", scale: .07},
             {name: 'pink-bed', image: "./browser/images/pink-bed.png", scale: 15},
             {name: 'computer', image: "./browser/images/computer.png", scale: 5},
             {name: 'backgammon', image: "./browser/images/backgammon.png", scale: 5},
             {name: 'book', image: "./browser/images/book.png", scale: 1}];
    },
    invsibleObject: invisibleCube,
    currentObject: invisibleCube,
    setCurrentObject: function(object){
      var name = object.name;
      var scale = object.scale;
      (cache[name] || (cache[name] = load(`/browser/objects/${name}/${name}.json`, scale)))
        .then(function(obj){
          obj.name = name;
          obj.storageScale = scale;
          return obj;
        })
        .then(obj => {
        this.previousObject = this.currentObject;
        this.currentObject = obj;
      })
        
      //a[name].then(obj => this.currentObject = obj);
    },
    load: load
  };

  return a;
};