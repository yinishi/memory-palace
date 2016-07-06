module.exports = function (modalFactory, $rootScope, authFactory, constantsFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/signup.html',
        link: function (s,a,e) {
        	s.showSignup = modalFactory.getSignup();
			s.submitted = false;
			s.signup = function(){
				s.submitted = true;
				var pwMatch = (s.userInfo.password && (s.userInfo.password === s.userInfo.confirmPassword)); 
				if (!s.userInfo.$invalid && pwMatch) {
					authFactory.signup(s.userInfo)
					.then(user => {
						$rootScope.$broadcast('newUser', user);
						modalFactory.toggleSignup();
						// if(constantsFactory.getObjects().length > 0) {
						// 	constantsFactory.getObjects().forEach(function(obj){
						// 		storingFactory.storeObject({
						// 			name: obj.name, 
						// 			positionX: obj.position.x, 
						// 			positionY: obj.position.y, 
						// 			positionZ: obj.position.z,
						// 			rotationX: obj.rotation.x,
						// 			rotationY: obj.rotation.y,
						// 			rotationZ: obj.rotation.z, 
						// 			scaleX: obj.scale.x,
						// 			scaleY: obj.scale.y,
						// 			scaleZ: obj.scale.z,
						// 			message: obj.message
						// 		})
						// 	})
						// }
					});
				}
			}
		        }
		}
}