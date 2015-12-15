(function () {

    'use strict';

    angular
        .module('skyApp')
        .service('dataService', dataService);

    dataService.$inject = [
        '$http', '$q'
    ];

    function dataService($http, $q) {
        // We use $q here so we can resolve with response.data
        this.getAuthAttempts = function () {
            var def = $q.defer();
            $http.get('/api/attempts').then(function (response) {
                def.resolve(response.data);
            }).catch(function () {
                def.reject();
            });
            return def.promise;
        };
    }

}());
