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

  var shuffle = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  window.util = {
    KEY_CODE: KEY_CODE,
    getRandomNumber: getRandomNumber,
    shuffle: shuffle,
    Method: Method
  };
})();
