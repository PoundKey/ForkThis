angular
	.module('contacts', [])
	.config(function ($routeProvider){
		$routeProvider.when('/contact/:index', {templateUrl: 'edit.html', controller:'Edit' })
		.when('/', {
		//List all contacts
			templateUrl: 'list.html'
	});
})
	.controller('Contacts', function($scope){
		$scope.contacts = [
			{name: "James Harden", team: "Huston Rockets"},
			{name:"Kobe Bryant", team: "LosAngeles Lakers"},
			{name:"Gilbert Areanas", team: "Freelance"},
		];
	})
	.controller('Edit', function($scope, $routeParams){
		$scope.contact = $scope.contacts[$routeParams.index];
		$scope.index = $routeParams.index;

	});