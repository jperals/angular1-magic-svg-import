'use strict';

//
angular.module('svgMagic')
  .directive('uiView', function($state, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        angular.element(element).attr('current-state', $state.$current.self
          .name);
      }
    };
  });
