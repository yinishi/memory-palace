'use strict';

module.exports = function ($state, authFactory, $rootScope, modalFactory, constantsFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/navbar.html',
        link: function (scope) {
            scope.toggleAbout = function(){
                if(modalFactory.getSignup().data === false) modalFactory.toggleSignup()
                if(modalFactory.getLogin().data === false) modalFactory.toggleLogin()
                if(modalFactory.getControls().data === false) modalFactory.toggleControls()
                modalFactory.toggleAbout();
            }
            scope.toggleLogin = function(){
                if(modalFactory.getSignup().data === false) modalFactory.toggleSignup()
                if(modalFactory.getControls().data === false) modalFactory.toggleControls()
                if(modalFactory.getAbout().data === false) modalFactory.toggleAbout()
                modalFactory.toggleLogin();
            }
            scope.toggleSignup = function(){
                if(modalFactory.getLogin().data === false) modalFactory.toggleLogin()
                if(modalFactory.getControls().data === false) modalFactory.toggleControls()
                if(modalFactory.getAbout().data === false) modalFactory.toggleAbout()
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
                constantsFactory.getPlacedObjects().forEach(function(obj){
                    constantsFactory.getScene().remove(obj);
                })
                constantsFactory.resetPlacedObjects();
		        return authFactory.logout()
	      	};
        }
     };
};