'use strict';

// Directive that looks for elements with id starting with 'link-' and uses them as links between states
angular.module('svgMagic')
  .directive('uiView', function($state) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.bind('click', function(event) {
          findLink(event.target, function(targetState) {
            if (targetState.endsWith('_')) { // HACK
              targetState = targetState.substr(0, targetState.length -
                3);
            }
            $state.go(targetState);
          });
        });
      }
    };

    // Walks up the DOM tree in search of a node with an id that starts with 'link-', and then performs the callback function on the state represented by the rest of that id attribute
    function findLink(element, callback) {
      var id;
      if (typeof element.getAttribute === 'function') {
        id = element.getAttribute("id");
      }
      if (typeof id === 'string' && id.substr(0, 5) === 'link-') {
        callback(id.substr(5, id.length - 1));
      } else {
        if (element.parentNode) {
          findLink(element.parentNode, callback);
        }
      }
    }

  });
