"use strict"

module.exports = function () {
	var myObject = null;
	var myIntersect = null;
	var myScene = null;
	var myCamera= null;
	var myObjects = null;
	return {
		rememberObject: function(object, intersect, scene, camera){
			myObject = object;
			myIntersect = intersect;
			myScene = scene;
			myCamera = camera;
		},
		getObject: function(){
			return {myObject: myObject, myIntersect: myIntersect, myScene: myScene, myCamera: myCamera}
		}, 
		setObjects: function (objects) {
			myObjects = objects;
		},
		getObjects: function () {
			return myObjects;
		},
		storeScene: function(scene){
			myScene = scene;
		},
		getScene: function(){
			return myScene;
		}

	}
}