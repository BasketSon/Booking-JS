'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;
  // window.debounce = function (fun) {
  //   var lastTimeout = null;
  //
  //   return function () {
  //     var args = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function () {
  //       fun.apply(null, args);
  //       console.log(fun)
  //     }, DEBOUNCE_TIMEOUT);
  //   };
  // };
  var lastTimeout;
  window.debounce = function (fun, time) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, time || DEBOUNCE_TIMEOUT);
  };
})();
