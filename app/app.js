'use strict';
// Declare app level module which depends on views, and core components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).config(['$locationProvider',
    '$routeProvider',
    '$rootScopeProvider',
    '$sceDelegateProvider',
    function ($locationProvider, $routeProvider, $rootScopeProvider, $sceDelegateProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://maps.googleapis.com/**'
    ]);
}])
    .run(function ($rootScope, $http) {
        $rootScope.Utils = {
            keys: Object.keys,
            values: Object.values
        };
        $rootScope.mapsCDN = "";
        $http({
            url: "http://localhost:8080/person/getBrowserMapsCDN",
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        })
            .then(function(data) {
                $rootScope.mapsCDN = data.data;
            });
    });
