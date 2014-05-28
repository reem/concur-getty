'use strict';

angular.module('thingApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
