'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ARROW_RIGHT: 39,
    ARROW_LEFT: 37
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

  var delNodeList = function (list) {
    list.forEach(function (item) {
      item.remove();
    });
  };

  window.util = {
    KeyCode: KeyCode,
    getRandomNumber: getRandomNumber,
    shuffle: shuffle,
    delNodeList: delNodeList
  };
})();
