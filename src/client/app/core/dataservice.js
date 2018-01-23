(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getHotels: getHotels,
      getFilteredHotels: getFilteredHotels
    };

    return service;

    function getHotels() {
      return $http.get('/api/hotels')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getHotels')(e);
      }
    }

     function getFilteredHotels(filters) {
      return $http.post('/api/filters', {
        jsonrpc: "2.0",
        params: {
          fivestar: filters.fivestar,
          fourstar: filters.fourstar,
          threestar: filters.threestar,
          twostar: filters.twostar,
          onestar: filters.onestar,
          name: filters.name,
        }
      })
      .then(success)
      .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getHotels')(e);
      }
     }
  }
})();
