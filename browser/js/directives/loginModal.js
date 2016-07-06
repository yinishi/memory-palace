module.exports = function (modalFactory, $rootScope, authFactory, storingFactory, messageFactory, objectFactory, palacesFactory, constantsFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/login.html',
        link: function (s,a,e) {
        	s.showLogin = modalFactory.getLogin();
        	s.toggleSignup = function(){
        		modalFactory.toggleLogin();
        		modalFactory.toggleSignup();
        	}
			s.submitted = false;
			s.login = function(){
				var objects = [];
				authFactory.login(s.userInfo)
				.then(user => {
					$rootScope.$broadcast('newUser', user);
					modalFactory.toggleLogin();
					//RETRIEVE STORED OBJECTS
					storingFactory.retrieveObjects()
					.then(function(items){
						if(Array.isArray(items)){
							items.forEach(function(item){
								objectFactory.load(`/browser/objects/${item.name}/${item.name}.json`, null, item.name)
									.then(obj => {
										objectFactory.setObjProps(obj, item);
										constantsFactory.getScene().add(obj);
										constantsFactory.setObjects([obj]);
									});
						});
						if(constantsFactory.getObjects().length > 0) {
							constantsFactory.getObjects().forEach(function(obj){
								if(!palacesFactory.palaceObjects.includes(obj) && !constantsFactory.getFloor().includes(obj)){
								storingFactory.storeObject({
									name: obj.name, 
									positionX: obj.position.x, 
									positionY: obj.position.y, 
									positionZ: obj.position.z,
									rotationX: obj.rotation.x,
									rotationY: obj.rotation.y,
									rotationZ: obj.rotation.z, 
									scaleX: obj.scale.x,
									scaleY: obj.scale.y,
									scaleZ: obj.scale.z,
									message: obj.message
								})
								}
							})
						}	
						constantsFactory.setObjects(objects);
				}
			});
				});
			}
		        }
		}
}