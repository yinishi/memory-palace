	// storingFactory.retrieveObjects()
	// 			.then(function(items){
	// 				if(Array.isArray(items)){
	// 					items.forEach(function(item){
	// 						return objectFactory.load(`/browser/objects/${item.name}/${item.name}.json`, null, item.name)
	// 							.then(function(obj){
	// 								// var y = item.positionY
	// 								obj.position.set(item.positionX, item.positionY, item.positionZ);
	// 								// obj.position.y += 20;
	// 								obj.rotation.set(item.rotationX, item.rotationY, item.rotationZ);
	// 								obj.scale.set(item.scaleX, item.scaleY, item.scaleZ);
	// 								obj.storingId = item.id;
	// 								scene.add(obj);
	// 								// console.log(item.message, "message", item, "obj")
	// 								//add message
	// 								var text = new Text2D(item.message, {font: '30px Arial', fillStyle: '#000000', antialias: true })
	// 								text.material.alphaTest = 0.1;
	// 								text.scale.set(.3, .3, .3);
	// 								var textY = item.positionY+20;
	// 								text.position.cpoy(obj.position);
	// 								text.position.y += 20;
	// 								// text.visible = false;
	// 								console.log(obj.position, "obj", text.position, "text")
	// 								obj.messageMesh = text;
									
	// 								scene.add(text);
									
	// 								objects.push(obj);
	// 								});
								
	// 					});
					
	// 				}

	// 			});

function formatLink (name) {
  return `/browser/objects/${name}/${name}.json`
}

	// // text.position.add( intersect.face.normal );
	// 							// var text = new Text2D(objectFactory.currentObject.message, {align: textAlign.center, font: '30px Arial', fillStyle: '#000000', antialias: true })
	// 							// text.material.alphaTest = 0.1;
	// 							// text.scale.set(.3, .3, .3);
	// 							// text.position.copy( intersect.point ).add( intersect.face.normal );
	// 							// text.position.addScalar( 3/2 );
	// 							// text.position.y += 20;
	// 							// text.visible = false;