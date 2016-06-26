'use strict'

module.exports = function ($scope, $state, $http, authFactory) {
	$scope.signup = function(){
		var pwMatch = ($scope.userInfo.password && ($scope.userInfo.password === $scope.userInfo.confirmPassword)); 
		if (!$scope.userInfo.$invalid && pwMatch) {
			authFactory.signup($scope.userInfo)
			.then(user => {
				$state.go('room');
			});
		}
	}
	$scope.login = function(){
		authFactory.login($scope.userInfo)
		.then(user => {
			$state.go('room');
		});
		console.log("here", $scope.userInfo);
	}
};