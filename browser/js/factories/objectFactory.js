'use strict'

module.exports = function(){
 
  function load (link, scale, name) {
    var loader = new THREE.ObjectLoader();
    return new Promise(function (res, rej) {
      loader.load(link, function(object){
        // var boundingBox = object
        // console.log(boundingBox, "object")
        if(!scale) {
          a.getObjects().forEach(function(object){
            if(object.name === name) scale = object.scale;
          });
        }
        object.scale.set(scale,scale,scale);
        //object.scale.set(1,1,1)
        //add object to a cube for collison detection and removing objects

//      // bounding box stuff
//         // var sphereSize = object.children[0].geometry.boundingSphere.radius; 
//         // var sphere = new THREE.Mesh(new THREE.SphereGeometry(sphereSize), 
//         // new THREE.MeshBasicMaterial({visible: false})); 
//         var boundingBox = new THREE.BoundingBoxHelper(object);
//         boundingBox.update();
//         object.bbox = boundingBox   
//         res(object);

        // var cubeSize = 10*customScale; 
        var cube = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), 
        new THREE.MeshBasicMaterial({visible: false})); 
        cube.add(object);
        res(cube);
      });
    });
  }
  // var currObjectName = 'teapot';

  // var _teapot = null;
  var cache = {};

  var a = {
    getObjects : function(){
     return [{name: 'teapot', image: "./browser/images/teapot.jpg", scale: .3},
             {name: 'fox', image: "./browser/images/fox.jpg", scale: .3},
             {name: 'table', image: "", scale: 10},
             {name: 'staff', image: "./browser/images/staff.jpg", scale: 2},
             {name: 'monster', image: "./browser/images/monster.jpg", scale: 1},
             {name: 'brain', image: "./browser/images/brain.jpg", scale: 3},
             {name: 'sofa', image: "./browser/images/sofa.jpg", scale: 2},
             {name: 'cat-mug', image: "./browser/images/cat-mug.png", scale: 3},
             {name: 'mug', image: "./browser/images/mug.png", scale: .2},
             {name: 'tree', image: "./browser/images/tree.png", scale: .1},
             {name: 'car', image: "./browser/images/car.jpg", scale: 10},
             {name: 'bull', image: "./browser/images/bull.jpg", scale: 2},
             {name: 'flower', image: "./browser/images/flower.jpg", scale: .2},
             {name: 'cat', image: "./browser/images/cat.jpg", scale: 12},
             {name: 'turtle', image: "./browser/images/turtle.png", scale: 12},
             {name: 'bed', image: "./browser/images/bed.jpg", scale: 15},
             {name: 'dress', image: "./browser/images/dress.jpg", scale: .5},
             {name: 'soccer-ball', image: "./browser/images/soccer-ball.jpg", scale: .07},
             {name: 'pink-bed', image: "./browser/images/pink-bed.png", scale: 15},
             {name: 'computer', image: "./browser/images/computer.png", scale: 5},
             {name: 'backgammon', image: "./browser/images/backgammon.png", scale: 5},
             {name: 'book', image: "./browser/images/book.png", scale: 1}];
    },
    currentObject: null,
    currentBox: null,
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
        this.previousBox = this.currentBox;
        this.currentObject = obj;
        this.currentBox = this.currentObject.bbox;
      })
        
      //a[name].then(obj => this.currentObject = obj);
    },
    load: load
  };

  return a;
};