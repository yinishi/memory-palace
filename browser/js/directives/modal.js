module.exports = function ($document) {
  return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/modal.html',
        link: function (scope, elem, attrs) {

          var blocker = document.getElementById( 'blocker' );

          //Enter button closes modal
          scope.toggle = function(){
            blocker.style.display = 'none';
          };

          //Esc button closes modal
          $document.on('keydown', function(e){
            console.log('click')
            if (e.keyCode === 27){ //esc
              blocker.style.display = 'none';
            } 
          });    
      }
  };
};