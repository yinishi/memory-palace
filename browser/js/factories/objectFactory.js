module.exports = function(){


  function load (link) {
    var loader = new THREE.ObjectLoader();
    return new Promise(function (res, rej) {
      loader.load(link, function(object){
        console.log('inload in promise', object);
        res(object);
      });
    });
  }
  var a = {
    getObjects : function(){
      return ['teapot', 'fox','table', 'staff'];
    },
    teapot : function(){
      return load('/browser/objects/utah-teapot-threejs/utah-teapot.json');
    },
    fox : function(){
      return load('/browser/objects/fox/fox.json');
    },
    staff : function(){
      return load('/browser/objects/staff/staff.json');
    },
    table : function(){
      return load('/browser/objects/table-kitchen/table.json');
    },
    updateCurrentObj: function (objectName) {
      return this[objectName]();
    }
  };

  return a;
}