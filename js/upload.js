'use strict';

(function () {

  var TYPES_OF_IMAGES = {
    'GIF': '',
    'JPEG': '',
    'PNG': ''
  };

  var previewImage = document.querySelector('.img-upload__preview img');

  var changeInputFile = function (evt) {
    var file = evt.currentTarget.files[0];
    showPreviewImage(file);
  };

  var showPreviewImage = function (imageFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');
    if (!fileRegExp.test(imageFile.type)) {
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', onImageDisplay);
    fileReader.readAsDataURL(imageFile);
  };

  var onImageDisplay = function (evt) {
    previewImage.src = evt.target.result;
    var effectsPreview = document.querySelectorAll('.effects__preview');
    effectsPreview.forEach(function (effect) {
      effect.style.backgroundImage = 'url(' + evt.target.result + ')';
    });
  };

  window.changeInputFile = changeInputFile;
})();
