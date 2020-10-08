'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.factory('apiService', function($http) {
  var apiURL = 'http://localhost:8080/';
  function list() {
    return $http.get(apiURL + 'person');
  }

  function save(data) {
    return $http({
      url: apiURL + 'person/save',
      method: 'POST',
      headers: {
        'Content-Type': 'form-data'
      },
      data: data
    });
  }

  return {
    list: list,
    save: save
  };
})

.controller('View1Ctrl', ['$scope', 'apiService', '$mdDialog', function($scope, apiService, $mdDialog) {
  $scope.people = [];

  // requests person data from API
  $scope.loadPeople = function() {
    apiService.list().then(function(response) {
      $scope.people = response.data;
    });
  };


  $scope.showDialog = function (ev) {
    console.log('showing dialog')

    // show the dialog
    $mdDialog.show({
      templateUrl: 'view1/addPersonDialog.tmpl.html',
      controller: DialogController,
      targetEvent: ev,
      clickOutsideToClose: true,
      parent: angular.element(document.body)
    }).then(function (didSubmit) {
      // on dialog submission
      console.log(didSubmit);
    }, function(err) {
      console.log('user closed dialog');
    });
  };

  function DialogController($scope, $mdDialog, apiService) {
    var emptyPersonObject = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: ''
    };
    $scope.personToAdd = emptyPersonObject;
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $scope.personToAdd = emptyPersonObject;
      $mdDialog.cancel();
    };

    $scope.submit = function () {
      console.log($scope.personToAdd);
      apiService.save($scope.personToAdd)
          .then(function(result) {
            console.log(result)
            // $mdDialog.hide(true);
          }).catch(function(err) {
            console.log(err);
      });
    };
  }

}]);



// .directive('formatDate', function() {
  // return "Foo";
// });