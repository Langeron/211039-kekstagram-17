'use strict';

(function () {

  var SPACE = ' ';
  var MAX_LENGTH = 20;
  var HASHTAGS_MAX_AMOUNT = 5;
  var LATTICE = '#';
  var ERROR_STYLE = '2px solid red';
  var ErrorInput = {
    MIN_LENGTH: 'хеш-тег не может состоять только из одной решётки',
    SEPARATED_BY_SPACES: 'хэш-теги разделяются пробелами',
    MAX_LENGTH: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
    FIRST_SYMBOL: 'хэш-тег начинается с символа # (решётка)',
    DOUBLE_HASHTAG: 'один и тот же хэш-тег не может быть использован дважды',
    MAX_QUANTITY: 'нельзя указать больше пяти хэш-тегов'
  };

  var form = document.querySelector('.img-upload__form');
  var inputHashtag = form.querySelector('.text__hashtags');

  var checkHashtagInput = function (input) {
    var inputValue = input.value;
    inputHashtag.setCustomValidity('');

    var hashtags = inputValue.toLowerCase().split(SPACE).filter(function (item) {
      return item !== '';
    });

    hashtags.forEach(function (hashtag, i) {
      if (hashtag[0] === LATTICE) {
        if (hashtag.length === 1) {
          input.setCustomValidity(ErrorInput.MIN_LENGTH);
        }
        if (hashtag.indexOf(LATTICE, 1) !== -1) {
          input.setCustomValidity(ErrorInput.SEPARATED_BY_SPACES);
        }
        if (hashtag.length > MAX_LENGTH) {
          input.setCustomValidity(ErrorInput.MAX_LENGTH);
        }

      } else {
        input.setCustomValidity(ErrorInput.FIRST_SYMBOL);
      }

      if (hashtags.includes(hashtag, i + 1)) {
        input.setCustomValidity(ErrorInput.DOUBLE_HASHTAG);
      }
    });

    if (hashtags.length > HASHTAGS_MAX_AMOUNT) {
      input.setCustomValidity(ErrorInput.MAX_QUANTITY);
    }
  };

  inputHashtag.addEventListener('blur', function () {
    checkHashtagInput(inputHashtag);
    if (!inputHashtag.checkValidity()) {
      inputHashtag.style.border = ERROR_STYLE;
    } else {
      inputHashtag.style.border = '';
    }
  });
})();
