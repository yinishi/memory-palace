'use strict';

module.exports = function ($state, authFactory, $rootScope, modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/navbar.html',
        link: function (scope) {
            scope.toggleAbout = modalFactory.toggleAbout;
            scope.toggleLogin = function(){
                if(modalFactory.getSignup().data === false) modalFactory.toggleSignup()
                modalFactory.toggleLogin();
            }
            scope.toggleSignup = function(){
                if(modalFactory.getLogin().data === false) modalFactory.toggleLogin()
                    modalFactory.toggleSignup();
            }
            scope.toggleControls = modalFactory.toggleControls;
            scope.user = null;
            function setUser () {
                authFactory.getLoggedInUser()
                .then(function(user){
                    scope.user = user;
                });
            }
            $rootScope.$on('newUser', function(event, user){
                scope.user = user;
            });
            setUser();
        	scope.logout = function () {
                scope.user = null;
		        return authFactory.logout()
	      	};
        }
     };
};