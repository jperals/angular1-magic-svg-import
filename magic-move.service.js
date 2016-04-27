'use strict';

angular.module('svgMagic')
  .service('magicMoveService', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var animations = {};
    return {
      addAnimationOrigin: function(id, element) {
        id = pruneId(id);
        animations[id] = animations[id] || {};
        animations[id].from = {
          height: element.getAttribute("height"),
          y: element.getAttribute("y") || "0"
        };
      },
      addAnimationTarget: function(id, element) {
        id = pruneId(id);
        animations[id] = animations[id] || {};
        animations[id].to = {
          height: element.getAttribute("height"),
          y: element.getAttribute("y")
        };
      },
      getAnimation: function(id) {
        id = pruneId(id);
        return animations[id];
      },
      getAnimationOrigin: function(id) {
        id = pruneId(id);
        return animations[id].from;
      },
      getAnimations: function() {
        return animations;
      },
      getAnimationTarget: function(id) {
        id = pruneId(id);
        return animations[id].to;
      }
    };
    // Hack to work around extra characters added in identical id's by Illustrator
    function pruneId(id) {
      if (id.endsWith('_')) { // HACK
        id = id.substr(0, id.length - 3);
      }
      return id;
    }
  });
