module.exports = function (modalFactory, $rootScope, authFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/login.html',
        link: function (s,a,e) {
        	s.showLogin = modalFactory.getLogin();

			s.submitted = false;
			// s.signup = function(){
			// 	s.submitted = true;
			// 	var pwMatch = (s.userInfo.password && (s.userInfo.password === s.userInfo.confirmPassword)); 
			// 	if (!s.userInfo.$invalid && pwMatch) {
			// 		authFactory.signup(s.userInfo)
			// 		.then(user => {
			// 			$rootScope.$broadcast('newUser', user);
			// 			// $state.go('room');
			// 		});
			// 	}
			// }
			s.login = function(){
				authFactory.login(s.userInfo)
				.then(user => {
					$rootScope.$broadcast('newUser', user);
					modalFactory.toggleLogin();
				});
			}
		        }
		}
}