'use strict';
angular.module('myApp.view1')
.provider('apiProvider', function () {
    return {
        greet: function() {
            return "Hola";
        }
    };
});