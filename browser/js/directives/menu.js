module.exports = function (objectFactory) {
   return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/menu.html',
        link: function (scope, element, attr) {
            scope.objects = objectFactory.getObjects();
        }
     };
};