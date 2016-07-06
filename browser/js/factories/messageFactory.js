"use strict"

module.exports = function () {
	var myObject = null;
	return {
		rememberObject: function(object){
			myObject = object;
		},
		getObject: function(){
			return myObject
		} 

	}
}