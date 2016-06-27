'use strict'

module.exports = function(){

  function load (link) {
    var loader = new THREE.ObjectLoader();
    return new Promise(function (res, rej) {
      loader.load(link, function(object){
        res(object);
      });
    });
  }
  var currObjectName = 'teapot';

  var _teapot = null
  var cache = {}

  var a = {
    getObjects : function(){
      return ['teapot', 'fox','table', 'staff'];
    },
    // get teapot() {
    //   return (cache['teapot'] || (cache['teapot'] = load('/browser/objects/teapot/teapot.json')));
    // },
    // fox: load('/browser/objects/fox/fox.json'),
    // staff: load('/browser/objects/staff/staff.json'),
    // table: load('/browser/objects/table/table.json'),
    currentObject: null,
    setCurrentObject: function(name){
      (cache[name] || (cache[name] = load(`/browser/objects/${name}/${name}.json`)))
        .then(obj => this.currentObject = obj);
      a[name].then(obj => this.currentObject = obj);
    }
  };

  return a;
};