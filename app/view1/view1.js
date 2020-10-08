'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .factory('apiService', function ($http) {
        var apiURL = 'http://localhost:8080/';

        function list() {
            return $http.get(apiURL + 'person');
        }

        function save(data) {
            console.log('date of birth inside apiservice' + data.dateOfBirth);
            return $http({
                url: apiURL + 'person/save',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: jQuery.param(data)
            });
        }

        function countMonths() {
            return $http.get(apiURL + 'person/count');
        }

        return {
            list: list,
            save: save,
            countMonths: countMonths
        };
    })

    .controller('View1Ctrl', ['$scope', 'apiService', '$mdDialog', '$rootScope', function ($scope, apiService, $mdDialog, $rootScope) {
        $scope.people = [];
        $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $scope.monthCount = [];
        // requests person data from API
        $scope.loadData = function () {
            apiService.list().then(function (response) {
                $scope.people = response.data;
            });

            apiService.countMonths().then(function (response) {
                $scope.monthCount = response.data;
            });
        };


        $scope.showDialog = function (ev) {

            // show the dialog
            $mdDialog.show({
                templateUrl: 'view1/addPersonDialog.tmpl.html',
                controller: DialogController,
                targetEvent: ev,
                clickOutsideToClose: true,
                parent: angular.element(document.body)
            }).then(function (didSubmit) {
                // on dialog submission
                // console.log(didSubmit);
                $scope.loadData();
            }, function (err) {
                // console.log('user closed dialog with error' + JSON.stringify(err));
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
                $scope.personToAdd.dateOfBirth = new Date($scope.personToAdd.dateOfBirth).toISOString();
                console.log('passing in date of birth' + $scope.personToAdd.dateOfBirth);
                apiService.save($scope.personToAdd)
                    .then(function (result) {
                        // console.log(result)
                        $mdDialog.hide(true);
                    }).catch(function (err) {
                    // console.log(err);
                });
            };
        }

    }]);