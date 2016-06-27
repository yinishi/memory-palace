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
  var currObjectName = 'teapot';

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
            console.log('updating', objectName)
      return this[objectName]();
    },
    setCurrentObject : function(object){
      console.log('setting', currObjectName)
      currObjectName = object;
    },
    getCurrentObject : function () {
      console.log('getting', currObjectName)
      return currObjectName;
    }
  };

  return a;
}