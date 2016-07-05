"use strict"

module.exports = function () {
	var myObject = null;
	var myIntersect = null;
	var myScene = null;
	var myCamera= null;
	return {
		rememberObject: function(object, intersect, scene, camera){
			myObject = object;
			myIntersect = intersect;
			myScene = scene;
			myCamera = camera;
		},
		getObject: function(){
			return {myObject: myObject, myIntersect: myIntersect, myScene: myScene, myCamera: myCamera}
		}

	}
}