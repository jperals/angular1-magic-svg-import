'use strict';

describe('Service: magicMove', function () {

  // load the service's module
  beforeEach(module('svgMagic'));

  // instantiate service
  var magicMove;
  beforeEach(inject(function (_magicMove_) {
    magicMove = _magicMove_;
  }));

  it('should do something', function () {
    expect(!!magicMove).toBe(true);
  });

});
