'use strict';

(function () {
  var KEY_CODE = {
    ESC: 27,
    ARROW_RIGHT: 39,
    ARROW_LEFT: 37
  };

  var Method = {
    POST: 'POST',
    GET: 'GET'
  };

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  window.util = {
    KEY_CODE: KEY_CODE,
    getRandomNumber: getRandomNumber,
    Method: Method
  };
})();
