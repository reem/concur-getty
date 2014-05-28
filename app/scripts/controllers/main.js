'use strict';

angular.module('thingApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.tagLine = 'Your places. Visualized.';
    $http.get('/api/itineraries').success(function() {
      var destName = 'San Francisco';
      $http({
        url: '/api/getty-images',
        method: 'POST',
        data: {
          search: destName
        }
      }).success(function (images) {
        $scope.search = 'San Francisco';
        $scope.images = _.pluck(images, 'UrlPreview');
      });
    });
  });
