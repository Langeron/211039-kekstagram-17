'use strict';
(function () {
  var EFFECT_ORIGINAL = 'effects__preview--none';

  var uploadPopup = document.querySelector('.img-upload__overlay');
  var inputUploadImage = document.querySelector('.img-upload__input');
  var uploadButtonClose = uploadPopup.querySelector('.img-upload__cancel');
  var uploadImg = uploadPopup.querySelector('.img-upload__preview img');
  var inputEffectOriginal = uploadPopup.querySelector('input[value="none"]');
  var textDescription = uploadPopup.querySelector('.text__description');
  var effectLevel = uploadPopup.querySelector('.effect-level');
  var inputScale = document.querySelector('.scale__control--value');


  var onUploadPopupOpen = function () {
    uploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
    uploadImg.style.transform = 'scale(1)';
    inputScale.value = '100%';
    inputEffectOriginal.checked = true;
    uploadImg.classList.add(EFFECT_ORIGINAL);
    effectLevel.classList.add('hidden');
  };

  var onUploadPopupClose = function () {
    uploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEscPress);
    inputUploadImage.value = '';
    uploadImg.style = '';
    window.effect.removeAllEffect();
  };

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === window.util.KEY_CODE.ESC && textDescription !== document.activeElement) {
      onUploadPopupClose();
    }
  };

  inputUploadImage.addEventListener('change', onUploadPopupOpen);
  uploadButtonClose.addEventListener('click', onUploadPopupClose);
})();
