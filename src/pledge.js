'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
function $Promise(executor) {
  this._state = 'pending';
  this._value;
  if (typeof executor !== 'function') throw TypeError('executor is not a function');
}

// TODO Convert to arrow function to see how 'this' is affected.
$Promise.prototype._internalResolve = function(someData) {
  if (this._state != 'fulfilled') {
    this._value = someData;
    this._state = 'fulfilled';
  }
}

$Promise.prototype._internalReject = function() {

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
