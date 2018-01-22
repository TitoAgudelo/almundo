(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'almundo',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';
    vm.getNumber = getNumber;
    vm.searchToggle = searchToggle;
    vm.starToggle = starToggle;
    vm.search = true;
    vm.star = true;
    activate();

    function searchToggle() {
      vm.search = vm.search === true ? false : true;
    }

    function starToggle() {
      vm.star = vm.star === true ? false : true;
    }

    function getNumber(num) {
      return new Array(num);
    }

    function activate() {
      var promises = [getHotels()];
      return $q.all(promises).then(function() {
        logger.info('Activated Hotels View');
      });
    }

    function getHotels() {
      return dataservice.getHotels().then(function(data) {
        vm.hotels = data;
        return vm.hotels;
      });
    }
  }
})();
