// 'use strict'

// module.exports = function ($scope, $state, $http, authFactory, $rootScope, modalFactory) {
// 	$scope.showLogin = modalFactory.getLogin();
// 	$scope.submitted = false;
// 	$scope.signup = function(){
// 		$scope.submitted = true;
// 		var pwMatch = ($scope.userInfo.password && ($scope.userInfo.password === $scope.userInfo.confirmPassword)); 
// 		if (!$scope.userInfo.$invalid && pwMatch) {
// 			authFactory.signup($scope.userInfo)
// 			.then(user => {
// 				$rootScope.$broadcast('newUser', user);
// 				$state.go('room');
// 			});
// 		}
// 	}
// 	$scope.login = function(){
// 		authFactory.login($scope.userInfo)
// 		.then(user => {
// 			$rootScope.$broadcast('newUser', user);
// 			// $state.go('room');
// 			modalFactory.toggleLogin();
// 		});
// 	}
// };