'use strict';

(function () {

  var EFFECT_ORIGINAL = 'effects__preview--none';
  var EFFECT_CLASS_PREFFIX = 'effects__preview--';

  var Effect = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
    NONE: 'none'
  };

  var FilterStyle = {
    GRAYSCALE: 'grayscale',
    SEPIA: 'sepia',
    INVERT: 'invert',
    BLUR: 'blur',
    BRIGHTNESS: 'brightness'
  };

  var uploadPopup = document.querySelector('.img-upload__overlay');
  var effectPin = uploadPopup.querySelector('.effect-level__pin');
  var effectBar = uploadPopup.querySelector('.effect-level__depth');
  var effectRadio = uploadPopup.querySelectorAll('.effects__radio');
  var inputEffectValue = uploadPopup.querySelector('input[name="effect-level"]');
  var uploadImg = uploadPopup.querySelector('.img-upload__preview img');
  var effectLevel = uploadPopup.querySelector('.effect-level');

  var getAllEffectClasses = function () {
    var effectClasses = [];
    effectRadio.forEach(function (radioItem) {
      var effectClass = 'effects__preview--' + radioItem.value;
      effectClasses.push(effectClass);
    });

    return effectClasses;
  };

  var removeAllEffect = function () {
    var effectClasses = getAllEffectClasses();
    uploadImg.classList.remove.apply(uploadImg.classList, effectClasses);
  };

  var calculateEffect = function (effectName, percent) {
    var value;
    var effect = effectName.toString();

    switch (effect) {
      case Effect.CHROME:
        value = percent / 100;
        break;

      case Effect.SEPIA:
        value = percent / 100;
        break;

      case Effect.MARVIN:
        value = percent + '%';
        break;

      case Effect.PHOBOS:
        value = (percent * 3) / 100 + 'px';
        break;

      case Effect.HEAT:
        value = (percent * 2) / 100 + 1;
        break;
    }

    return value;
  };

  var addFilterEffect = function (evt) {
    var radioItem = evt.target;
    var radioValue = radioItem.value;
    removeAllEffect();

    uploadImg.style.filter = '';
    inputEffectValue.value = '0';
    uploadImg.classList.add(EFFECT_CLASS_PREFFIX + radioValue);
    effectPin.style.left = '100%';
    effectBar.style.width = '100%';
    inputEffectValue.value = '100';

    if (uploadImg.classList.contains(EFFECT_ORIGINAL)) {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  };

  effectRadio.forEach(function (radioItem) {
    radioItem.addEventListener('click', addFilterEffect);
  });

  var getFilterStyleCss = function (element, filter, valueEffect) {
    element.style.filter = filter + '(' + valueEffect + ')';
  };


  var applyEffect = function (pinPosition) {
    var inputRadioChecked = uploadPopup.querySelector('.effects__radio:checked');
    var currentEffect = inputRadioChecked.value;
    var valuePin = parseInt(pinPosition, 10);
    var valueEffect = calculateEffect(currentEffect, valuePin);
    effectBar.style.width = valuePin + '%';
    inputEffectValue.value = valuePin;

    switch (currentEffect) {
      case Effect.CHROME:
        getFilterStyleCss(uploadImg, FilterStyle.GRAYSCALE, valueEffect);
        break;

      case Effect.SEPIA:
        getFilterStyleCss(uploadImg, FilterStyle.SEPIA, valueEffect);
        break;

      case Effect.MARVIN:
        getFilterStyleCss(uploadImg, FilterStyle.INVERT, valueEffect);
        break;

      case Effect.PHOBOS:
        getFilterStyleCss(uploadImg, FilterStyle.BLUR, valueEffect);
        break;

      case Effect.HEAT:
        getFilterStyleCss(uploadImg, FilterStyle.BRIGHTNESS, valueEffect);
        break;
    }
  };

  window.effect = {
    removeAllEffect: removeAllEffect
  };

  window.initSlider(applyEffect);
})();
