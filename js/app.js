(function() {

var opentokdemo = angular.module('opentokdemo', 
	[
	 'opentokdemo.controllers'
	 ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',
    	{
    	 	templateUrl: 'partials/demo.html',
    	 	controller: 'Demo'
    	}
    );
  }]);

})();
