'use strict'

module.exports = function ($scope, $state, $http, authFactory, $rootScope) {
	$scope.submitted = false;
	$scope.signup = function(){
		// console.log($scope.submitted)
		$scope.submitted = true;
		var pwMatch = ($scope.userInfo.password && ($scope.userInfo.password === $scope.userInfo.confirmPassword)); 
		if (!$scope.userInfo.$invalid && pwMatch) {
			authFactory.signup($scope.userInfo)
			.then(user => {
				$rootScope.$broadcast('user', user);
				$state.go('room');
			});
		}
	}
	$scope.login = function(){
		authFactory.login($scope.userInfo)
		.then(user => {
			console.log(user, "user")
			$rootScope.$broadcast('user', user)
			$state.go('room');
		});
		console.log("here", $scope.userInfo);
	}
};