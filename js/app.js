(function() {
'use strict';

// Declare app level module which depends on filters, and services
var opentokdemo = angular.module('opentokdemo', 
	[
	 'opentokdemo.directives',
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
