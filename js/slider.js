'use strict';
(function () {
  var PIN_STEP = 20;
  window.initSlider = function (callback) {
    var uploadPopup = document.querySelector('.img-upload__overlay');
    var effectPin = uploadPopup.querySelector('.effect-level__pin');
    var effectLevelLine = uploadPopup.querySelector('.effect-level__line');

    var convertCoordInPercent = function (coord, fullWidth) {
      return (coord * 100) / fullWidth + '%';
    };

    var onPinArrowsPress = function (evt) {
      var startPinCoord = effectPin.offsetLeft;
      var effectLevelLineWidth = effectLevelLine.offsetWidth;
      var newPinCoord;

      switch (evt.keyCode) {
        case (window.util.KEY_CODE.ARROW_LEFT):
          newPinCoord = startPinCoord - PIN_STEP;
          if (newPinCoord < 0) {
            newPinCoord = 0;
          }
          break;

        case (window.util.KEY_CODE.ARROW_RIGHT):
          newPinCoord = startPinCoord + PIN_STEP;
          if (newPinCoord > effectLevelLineWidth) {
            newPinCoord = effectLevelLineWidth;
          }
          break;
      }

      var pinPosition = convertCoordInPercent(newPinCoord, effectLevelLineWidth);
      effectPin.style.left = pinPosition;
      callback(pinPosition);
    };


    effectPin.addEventListener('keydown', onPinArrowsPress);

    effectPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoord = evt.clientX;
      var effectLevelLineWidth = effectLevelLine.offsetWidth;
      var coordSliderLine = effectLevelLine.getBoundingClientRect();
      var coordSliderLineRight = coordSliderLine.left + effectLevelLineWidth;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = startCoord - moveEvt.clientX;
        startCoord = moveEvt.clientX;
        var effectPinCoord = effectPin.offsetLeft - shift;

        if (moveEvt.clientX < coordSliderLine.left) {
          effectPinCoord = 0;
        }

        if (moveEvt.clientX > coordSliderLineRight) {
          effectPinCoord = effectLevelLineWidth;
        }
        var pinPosition = convertCoordInPercent(effectPinCoord, effectLevelLineWidth);
        effectPin.style.left = pinPosition;
        callback(pinPosition);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    effectLevelLine.addEventListener('click', function (evt) {
      if (evt.target !== effectPin) {
        var coordClickLine = evt.offsetX;
        var effectLevelLineWidth = effectLevelLine.offsetWidth;
        var pinPosition = convertCoordInPercent(coordClickLine, effectLevelLineWidth);
        effectPin.style.left = pinPosition;
        callback(pinPosition);
      }
    });
  };
})();
