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
             {name: 'fox', image: "./browser/images/fox.js", scale: .3},
             {name: 'table', image: "./browser/images/fox.js", scale: 10},
             {name: 'staff', image: "./browser/images/staff.js", scale: 2}];
    },
    // get teapot() {
    //   return (cache['teapot'] || (cache['teapot'] = load('/browser/objects/teapot/teapot.json')));
    // },
    // fox: load('/browser/objects/fox/fox.json'),
    // staff: load('/browser/objects/staff/staff.json'),
    // table: load('/browser/objects/table/table.json'),
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