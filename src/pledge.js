'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/

function $Promise(executor) {
  this._state = 'pending';
  this._value;
  this._handlerGroups = [];
  const internalResolve = this._internalResolve.bind(this);
  const internalReject = this._internalReject.bind(this);

  executor(function(data) {
    internalResolve(data);
  }, function(reason) {
    internalReject(reason);
  });
  if (typeof executor !== 'function') throw TypeError('executor is not a function');
}

$Promise.prototype.__dispatchHandlers = function() {
  while (this._handlerGroups.length) {
    this._callHandlers();
  }
}

// TODO Convert to arrow function to see how 'this' is affected.
$Promise.prototype._internalResolve = function(someData) {
  if (this._state != 'fulfilled' && this._state != 'rejected') {
    this._value = someData;
    this._state = 'fulfilled';
  }
  this.__dispatchHandlers();
}

$Promise.prototype._internalReject = function(reason) {
  if (this._state != 'rejected' && this._state != 'fulfilled') {
    this._value = reason;
    this._state = 'rejected';
  }
  this.__dispatchHandlers();
}

$Promise.prototype.then = function(successCb, errorCb) {
  if (typeof successCb !== 'function') successCb = false;
  if (typeof errorCb !== 'function') errorCb = false;
  this._handlerGroups.push({
    successCb: successCb,
    errorCb: errorCb
  });

  this._callHandlers();
}

$Promise.prototype._callHandlers = function() {
  if (this._state === 'fulfilled' && this._handlerGroups[0].successCb) {
    this._handlerGroups.shift().successCb(this._value);
  } else if (this._state === 'rejected' && this._handlerGroups[0].errorCb) {
    this._handlerGroups.shift().errorCb(this._value);
  }
}

$Promise.prototype.catch = function(callback) {
  return this.then(null, callback);
}


/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
