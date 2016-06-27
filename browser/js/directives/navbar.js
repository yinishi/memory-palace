'use strict';

module.exports = function ($state, authFactory, $rootScope) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/navbar.html',
        link: function (scope) {
            scope.user = null;
            function setUser () {
                authFactory.getLoggedInUser()
                .then(function(user){
                    scope.user = user;
                    //rootscope? refresh?
                });
            }
            setUser();
        	scope.logout = function () {
		        return authFactory.logout()
		        .then(function () {
		          $state.go('login');
		        });
	      	}
        }
     }
}