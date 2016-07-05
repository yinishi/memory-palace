"use strict"

module.exports = function () {
	var myObject = null;
	var myIntersect = null;
	var myScene = null;
	return {
		rememberObject: function(object, intersect, scene){
			myObject = object;
			myIntersect = intersect;
			myScene = scene;
		},
		getObject: function(){
			return {myObject: myObject, myIntersect: myIntersect, myScene: myScene}
		}

	}
}