'use strict';

(function () {

  var SPACE = ' ';
  var MAX_LENGTH = 20;
  var HASHTAGS_MAX_AMOUNT = 5;

  var form = document.querySelector('.img-upload__form');
  var inputHashtag = form.querySelector('.text__hashtags');

  var checkHashtagInput = function (input) {
    var inputValue = input.value;

    var hashtags = inputValue.split(SPACE).filter(function (item) {
      return item !== '';
    });

    hashtags.forEach(function (hashtag, i) {
      if (hashtag[0] === '#') {
        if (hashtag.length === 1) {
          input.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        }
        if (hashtag.indexOf('#', 1) !== -1) {
          input.setCustomValidity('хэш-теги разделяются пробелами');
        }
        if (hashtag.lenght > MAX_LENGTH) {
          input.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        }

      } else {
        input.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      }

      if (hashtags.indexOf(hashtag, i + 1) !== -1) {
        input.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      }
    });

    if (hashtags.length > HASHTAGS_MAX_AMOUNT) {
      input.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    checkHashtagInput(inputHashtag);
    if (!inputHashtag.checkValidity()) {
      evt.preventDefault();
    }
  });
})();
