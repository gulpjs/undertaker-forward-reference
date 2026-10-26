"use strict";

var assert = require("node:assert");
var { beforeEach, describe, it } = require("node:test");

var Registry = require("../");

function noop() {}

describe("Forward Reference Registry", function () {
  var registry;

  beforeEach(function () {
    registry = new Registry();
  });

  it("returns a function even if not registered", function () {
    var task = registry.get("nothing");
    assert.strictEqual(typeof task, "function");
  });

  it("does not need to be constructed with new", function () {
    // eslint-disable-next-line new-cap
    registry = Registry();
    var task = registry.get("nothing");
    assert.strictEqual(typeof task, "function");
  });

  it("forward reference function mimics task name", function () {
    var task = registry.get("nothing");
    assert.strictEqual(task.displayName, "nothing");
  });

  it("returns the task if already registered", function () {
    registry.set("nothing", noop);
    var task = registry.get("nothing");
    assert.deepStrictEqual(task, noop);
  });

  it("executes task when forward reference is called", function (t, done) {
    var count = 0;

    function actualTask() {
      count++;
      assert.strictEqual(count, 1);
      done();
    }

    var task = registry.get("nothing");
    registry.set("nothing", actualTask);

    task();
  });

  it("throws if task is not defined before forward ref is called", function () {
    var task = registry.get("nothing");
    assert.throws(task, {
      message: "Forward referenced task 'nothing' not defined before use",
    });
  });
});
