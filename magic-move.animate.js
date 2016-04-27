'use strict';

// Directive that looks for elements with id starting with 'link-' and uses them as links between states
angular.module('svgMagic')
  .animation('.main-view', ['magicMoveService', function(magicMoveService) {
    return {
      enter: function(element, doneFn) {
        var elementsWithId = element[0].querySelectorAll('[id]');
        for (var i = 0; i < elementsWithId.length; i++) {
          var item = elementsWithId[i];
          var id = item.getAttribute('id');
          if (id.startsWith('animate-')) {
            magicMoveService.addAnimationTarget(id, item);
          }
        }
      },
      leave: function(element, doneFn) {
        var elementsWithId = element[0].querySelectorAll('[id]');
        var animationFound = false;
        for (var i = 0; i < elementsWithId.length; i++) {
          var item = elementsWithId[i];
          var id = item.getAttribute('id');
          if (id.startsWith('animate-')) {
            animationFound = true;
            magicMoveService.addAnimationOrigin(id, item);
            var from = angular.copy(magicMoveService.getAnimationOrigin(
              id));
            var to = angular.copy(magicMoveService.getAnimationTarget(
              id));
            // Fix GSAP using transformation matrix instead of actually modifying y
            to.y = to.y - from.y;
            from.y = 0;
            TweenMax.fromTo(item, 1, from, to)
              .eventCallback('onComplete', doneFn);
          }
        }
        if(!animationFound) {
          doneFn();
        }
      }
    }
  }]);
