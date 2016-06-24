'use strict'

module.exports = function ($scope, $state, $http) {
	$scope.signup = function(){
		console.log("here", $scope.userInfo)
		$http.post('/auth/signup', $scope.userInfo)
			.then(function(user){
				console.log(user.data)
				$state.go('login');
			})
	}
	$scope.login = function(){
		console.log("here", $scope.userInfo)
		$http.post('/auth/login', $scope.userInfo)
			.then(function(user){
				console.log(user.data)
				$state.go('room');
			});
	}
};