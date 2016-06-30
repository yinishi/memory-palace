module.exports = function (){
	return {
        restrict: 'E',
        // scope: {
        	
        // },
        template: `<div class="container carousel-container">
    <slick class="carousel" settings="slickConfig" slides-to-show="5" slides-to-scroll="1" responsive="[{breakpoint: 1500,settings:{ slidesToShow:4},
    	},
    	{
    		breakpoint: 1300,
    		settings:{ slidesToShow:3},
    	}
    	
   
    	]"> 
       <div class="item objectImg" ng-repeat="object in objects">
        <div ng-click="setCurrentObject(object)" ng-style="{'background-image':'url({{object.image}})'}" class="imgDiv"></div>
       </div>
    </slick>
  </div>`,
   controller: 'menuCtrl',

	}

}