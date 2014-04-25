'use strict';

angular.module('underDarknessApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
