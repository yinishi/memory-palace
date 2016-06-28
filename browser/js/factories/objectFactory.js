'use strict'

module.exports = function(){
 
  function load (link, scale) {
    var loader = new THREE.ObjectLoader();
    return new Promise(function (res, rej) {
      loader.load(link, function(object){
        object.scale.set(scale,scale,scale);
        //add object to a cube for collison detection and removing objects  
        var cube = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), 
        new THREE.MeshBasicMaterial({visible: false})); 
        cube.add(object);
        res(cube);
      });
    });
  }
  var currObjectName = 'teapot';

  var _teapot = null;
  var cache = {};

  var a = {
    getObjects : function(){
     return [{name: 'teapot', image: "./browser/images/teapot.jpg", scale: .3},
             {name: 'fox', image: "./browser/images/fox.jpg", scale: .3},
             {name: 'table', image: "./browser/images/table.jpg", scale: 10},
             {name: 'staff', image: "./browser/images/staff.jpg", scale: 2},
             {name: 'monster', image: "./browser/images/monster.jpg", scale: 1},
             {name: 'brain', image: "./browser/images/brain.jpg", scale: 3},
             {name: 'sofa', image: "./browser/images/sofa.jpg", scale: 2},
             {name: 'cat-mug', image: "./browser/images/cat-mug.png", scale: 3},
             {name: 'mug', image: "./browser/images/mug.png", scale: .2}];
    },
    currentObject: null,
    setCurrentObject: function(object){
      var name = object.name;
      var scale = object.scale;
      (cache[name] || (cache[name] = load(`/browser/objects/${name}/${name}.json`, scale)))
        .then(obj => this.currentObject = obj)
        
      //a[name].then(obj => this.currentObject = obj);
    }
  };

  return a;
};