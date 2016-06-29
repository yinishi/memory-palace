'use strict'

module.exports = function(){
 
  function load (link, scalex, scaley, scalez) {
    var loader = new THREE.ObjectLoader();
    return new Promise(function (res, rej) {
      loader.load(link, function(object){
        object.scale.set(scalex,scaley,scalez);
        //add object to a cube for collison detection and removing objects 
        var cubeSize = 10*scalex; 
        var cube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), 
        new THREE.MeshBasicMaterial({visible: false})); 
        cube.add(object);
        //cube.isCollisionMeshForObject = object
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
             {name: 'soccer-ball', image: "./browser/images/soccer-ball.jpg", scale: .07}];
    },
    currentObject: null,
    setCurrentObject: function(object){
      var name = object.name;
      var scale = object.scale;
      (cache[name] || (cache[name] = load(`/browser/objects/${name}/${name}.json`, scale, scale, scale)))
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