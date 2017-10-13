var ChoiceMaker = angular.module('ChoiceMaker', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'view/home.html'
			})
			.when('/lunch', {
				templateUrl: "view/lunch.html"
			})
			.when('/who', {
				templateUrl: "view/who.html"
			})
			.otherwise({
                redirectTo: '/'
            });
	}]);