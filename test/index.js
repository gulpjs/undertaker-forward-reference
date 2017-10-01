'use strict';

var expect = require('expect');

var Registry = require('../');

function noop() {}

describe('Forward Reference Registry', function() {

  var registry;

  beforeEach(function(done) {
    registry = new Registry();
    done();
  });

  it('returns a function even if not registered', function(done) {
    var task = registry.get('nothing');
    expect(task).toBeA('function');
    done();
  });

  it('does not need to be constructed with new', function(done) {
    registry = Registry();
    var task = registry.get('nothing');
    expect(task).toBeA('function');
    done();
  });

  it('forward reference function mimics task name', function(done) {
    var task = registry.get('nothing');
    expect(task.displayName).toEqual('nothing');
    done();
  });

  it('returns the task if already registered', function(done) {
    registry.set('nothing', noop);
    var task = registry.get('nothing');
    expect(task).toEqual(noop);
    done();
  });

  it('excutes task when forward reference is called', function(done) {
    var count = 0;

    function actualTask() {
      count++;
      expect(count).toEqual(1);
      done();
    }

    var task = registry.get('nothing');
    registry.set('nothing', actualTask);

    task();
  });

  it('throws if task is not defined before forward ref is called', function(done) {
    var task = registry.get('nothing');
    expect(task).toThrow('Forward referenced task \'nothing\' not defined before use');
    done();
  });
});
