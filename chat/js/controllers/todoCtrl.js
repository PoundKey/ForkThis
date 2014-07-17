/*global todomvc, angular, Firebase */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebase service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $firebase, $routeParams) {

	var cname = get('user');
  if (!cname){
  	alert("Please login to continue.");
  	window.location = "/";
  	return;
  }
  $scope.realname = cname;
	var url = 'https://forkthis.firebaseio.com/';
	var fireRef = new Firebase(url);
	$scope.$watch('todos', function () {
		var total = 0;
		var remaining = 0;
		$scope.todos.$getIndex().forEach(function (index) {
			var todo = $scope.todos[index];
			// Skip invalid entries so they don't break the entire app.
			if (!todo || !todo.title) {
				return;
			}

			total++;
			if (todo.completed === false) {
				remaining++;
			}
		});
		$scope.totalCount = total;
		$scope.remainingCount = remaining;
		$scope.completedCount = total - remaining;
		$scope.allChecked = remaining === 0;
	}, true);

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length) {
			return;
		}
		$scope.todos.$add({
			title: newTodo,
			completed: false,
			uname: cname
		});
		$scope.newTodo = '';
	};

	$scope.editTodo = function (id) {
		$scope.editedTodo = $scope.todos[id];
		$scope.originalTodo = angular.extend({}, $scope.editedTodo);
	};

	$scope.doneEditing = function (id) {
		$scope.editedTodo = null;
		var title = $scope.todos[id].title.trim();
		if (title) {
			$scope.todos.$save(id);
		} else {
			$scope.removeTodo(id);
		}
	};

	$scope.revertEditing = function (id) {
		$scope.todos[id] = $scope.originalTodo;
		$scope.doneEditing(id);
	};

	$scope.removeTodo = function (id) {
		$scope.todos.$remove(id);
	};

	$scope.toggleCompleted = function (id) {
		var todo = $scope.todos[id];
		todo.completed = !todo.completed;
		$scope.todos.$save(id);
	};

	$scope.clearCompletedTodos = function () {
		angular.forEach($scope.todos.$getIndex(), function (index) {
			if ($scope.todos[index].completed) {
				$scope.todos.$remove(index);
			}
		});
	};

	$scope.markAll = function (allCompleted) {
		angular.forEach($scope.todos.$getIndex(), function (index) {
			$scope.todos[index].completed = !allCompleted;
		});
		$scope.todos.$save();
	};

	$scope.newTodo = '';
	$scope.editedTodo = null;

	if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location;

	// Bind the todos to the firebase provider.
	$scope.todos = $firebase(fireRef);

	var reverseObject = function(obj) {
		var reversed = {};
		var keyArray = Object.keys(obj).reverse();
		for (var i = 0; i < keyArray.length; i++) {
			reversed[keyArray[i]] = obj[keyArray[i]];
		 }
		return reversed;
};

function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)){
      return decodeURIComponent(name[1]);
   }
}


});
