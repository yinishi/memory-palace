module.exports = function ($scope, modalFactory) {
	$scope.showControls = modalFactory.getControls();	
	console.log("cntrl", $scope.showControls)
}