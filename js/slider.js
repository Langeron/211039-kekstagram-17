'use strict';

(function () {
  var PIN_STEP = 20;

  var uploadPopup = document.querySelector('.img-upload__overlay');
  var effectPin = uploadPopup.querySelector('.effect-level__pin');
  var effectLevelLine = uploadPopup.querySelector('.effect-level__line');

  var convertCoordInPercent = function (coord, fullWidth) {
    return (coord * 100) / fullWidth + '%';
  };

  var sliderArrowControl = function (callback) {
    var onPinArrowsPress = function (evt) {
      var startPinCoord = effectPin.offsetLeft;
      var effectLevelLineWidth = effectLevelLine.offsetWidth;
      var newPinCoord;

      switch (evt.keyCode) {
        case (window.util.KeyCode.ARROW_LEFT):
          newPinCoord = startPinCoord - PIN_STEP;
          if (newPinCoord < 0) {
            newPinCoord = 0;
          }
          break;

        case (window.util.KeyCode.ARROW_RIGHT):
          newPinCoord = startPinCoord + PIN_STEP;
          if (newPinCoord > effectLevelLineWidth) {
            newPinCoord = effectLevelLineWidth;
          }
          break;
      }

      effectPin.style.left = newPinCoord + 'px';
      var pinPositionPercent = convertCoordInPercent(newPinCoord, effectLevelLineWidth);
      callback(pinPositionPercent);
    };

    effectPin.addEventListener('keydown', onPinArrowsPress);
  };

  var onSliderDrag = function (callback) {
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

        effectPin.style.left = effectPinCoord + 'px';
        var pinPositionPercent = convertCoordInPercent(effectPinCoord, effectLevelLineWidth);
        callback(pinPositionPercent);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  var onSliderClick = function (callback) {
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

  var initSlider = function (callback) {
    sliderArrowControl(callback);
    onSliderDrag(callback);
    onSliderClick(callback);
  };

  window.initSlider = initSlider;
})();
