"use strict"

module.exports = function () {
	var myScene = null;
	var myObjects = [];
	var palaceObjs = []; 
	var placedObjects = [];
	// COLORFUL FLOOR
		var geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
		geometry.rotateX( - Math.PI / 2 );

		for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
			var vertex = geometry.vertices[ i ];
			vertex.x += Math.random() * 20 - 10;
			vertex.y += Math.random() * 2;
			vertex.z += Math.random() * 20 - 10;
		}

		for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
			var face = geometry.faces[ i ];
			face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		}

		var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

		var myFloor = new THREE.Mesh( geometry, material );
		myFloor.position.y = -2;
		myObjects.push(myFloor)

	var consts = {
		storeScene: function(scene){
			myScene = scene;
		},
		getScene: function(){
			return myScene;
		},
		setObjects: function (objects) {
			myObjects = myObjects.concat(objects);
		},
		getObjects: function () {
			return myObjects;
		},
		addPalaceObj: function(item) {
			palaceObjs.push(item)
		},
		getPalaceObjs: function () {
			return palaceObjs
		},
		initializeRenderer: function (WIDTH, HEIGHT) {
			let renderer = new THREE.WebGLRenderer();
			renderer.setClearColor( 0x7ec0ee );
			renderer.setSize( WIDTH, HEIGHT);
			return renderer;
		},
		//to make sure floor isn't added to database when you login
		getFloor: function(){
			return myFloor;
		},
		removeObject: function(object){
			myObjects.splice(myObjects.indexOf(object), 1);
			placedObjects.splice(placedObjects.indexOf(object), 1);
		},
		placeObject: function(object){
			placedObjects.push(object);
			myObjects.push(object);
		},
		getPlacedObjects: function(){
			return placedObjects;
		},
		resetPlacedObjects: function(){
			placedObjects = [];
		}
	}
	consts.setObjects(myFloor);
	return consts;
}