'use strict';
// Declare app level module which depends on views, and core components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', '$rootScopeProvider', function ($locationProvider, $routeProvider, $rootScopeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}])
    .run(function ($rootScope) {
        $rootScope.Utils = {
            keys: Object.keys,
            values: Object.values
        };
    });
