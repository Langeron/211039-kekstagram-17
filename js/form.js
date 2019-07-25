'use strict';

(function () {
  var EFFECT_ORIGINAL = 'effects__preview--none';

  var form = document.querySelector('.img-upload__form');
  var uploadPopup = form.querySelector('.img-upload__overlay');
  var inputUploadImage = form.querySelector('.img-upload__input');
  var uploadButtonClose = uploadPopup.querySelector('.img-upload__cancel');
  var uploadImg = uploadPopup.querySelector('.img-upload__preview img');
  var inputEffectOriginal = uploadPopup.querySelector('input[value="none"]');
  var textDescription = uploadPopup.querySelector('.text__description');
  var effectLevel = uploadPopup.querySelector('.effect-level');
  var inputScale = uploadPopup.querySelector('.scale__control--value');
  var inputHashtag = uploadPopup.querySelector('.text__hashtags');

  var onUploadPopupOpen = function (evt) {
    uploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
    uploadImg.style.transform = 'scale(1)';
    inputScale.value = '100%';
    inputEffectOriginal.checked = true;
    uploadImg.classList.add(EFFECT_ORIGINAL);
    effectLevel.classList.add('hidden');
    window.changeInputFile(evt);
  };

  var onUploadPopupClose = function () {
    uploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEscPress);
    inputUploadImage.value = '';
    uploadImg.style = '';
    window.effect.removeAllEffect();
  };

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC
      && textDescription !== document.activeElement
      && inputHashtag !== document.activeElement) {
      onUploadPopupClose();
    }
  };

  inputUploadImage.addEventListener('change', onUploadPopupOpen);
  uploadButtonClose.addEventListener('click', onUploadPopupClose);

  var mainBlock = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');

  var onSuccess = function () {
    var cloneMessage = successMessage.cloneNode(true);
    mainBlock.appendChild(cloneMessage);
    var buttonSuccess = cloneMessage.querySelector('.success__button');
    var successInner = cloneMessage.querySelector('.success__inner');

    var onMessageRemove = function () {
      cloneMessage.remove();
    };

    buttonSuccess.addEventListener('click', onMessageRemove);

    var onSuccessClick = function (evt) {
      if (evt.target !== successInner && !successInner.contains(evt.target)) {
        onMessageRemove();
        document.removeEventListener('click', onSuccessClick);
      }
    };

    var onSuccessEscPress = function (evt) {
      if (evt.keyCode === window.util.KeyCode.ESC) {
        onMessageRemove();
        document.removeEventListener('keydown', onSuccessEscPress);
      }
    };

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);

    onUploadPopupClose();
  };

  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  var onError = function () {
    var cloneError = errorMessage.cloneNode(true);
    mainBlock.appendChild(cloneError);
    var errorInner = cloneError.querySelector('.error__inner');
    var errorButtons = cloneError.querySelectorAll('.error__button');

    var onErrorRemove = function () {
      cloneError.remove();
    };

    var onErrorClick = function (evt) {
      if (evt.target !== errorInner && !errorInner.contains(evt.target)) {
        onErrorRemove();
        document.removeEventListener('click', onErrorClick);
      }
    };

    var onErrorEscPress = function (evt) {
      if (evt.keyCode === window.util.KeyCode.ESC) {
        onErrorRemove();
        document.removeEventListener('keydown', onErrorEscPress);
      }
    };

    errorButtons.forEach(function (button) {
      button.addEventListener('click', onErrorRemove);
    });

    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);

    onUploadPopupClose();
  };

  window.form = {
    onSuccessUpload: onSuccess,
    onErrorUpload: onError
  };
})();
