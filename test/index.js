'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var Registry = require('../');

function noop(){}

lab.experiment('Forward Reference Registry', function(){

  var registry;

  lab.beforeEach(function(done){
    registry = new Registry();
    done();
  });

  lab.test('returns a function even if not registered', function(done){
    var task = registry.get('nothing');
    code.expect(task).to.be.a.function();
    done();
  });

  lab.test('forward reference function mimics task name', function(done){
    var task = registry.get('nothing');
    code.expect(task.displayName).to.equal('nothing');
    done();
  });

  lab.test('returns the task if already registered', function(done){
    registry.set('nothing', noop);
    var task = registry.get('nothing');
    code.expect(task).to.equal(noop);
    done();
  });

  lab.test('excutes task when forward reference is called', function(done){
    var count = 0;

    function actualTask(){
      count++;
      code.expect(count).to.equal(1);
      done();
    }

    var task = registry.get('nothing');
    registry.set('nothing', actualTask);

    task();
  });

  lab.test('throws if task is not defined before forward ref is called', function(done){
    var task = registry.get('nothing');
    code.expect(task).to.throw('Forward referenced task \'nothing\' not defined before use');
    done();
  });
});
