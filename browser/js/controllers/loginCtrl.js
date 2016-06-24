'use strict'

module.exports = function ($scope, $http) {
	$scope.submit = function(){
		console.log("here", $scope.userInfo)
		$http.post('/auth/signup', $scope.userInfo)
			.then(function(user){
				console.log(user.data)
			})
	}
};