'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

var NAMES = [
  'Тор',
  'Наташа',
  'Халк',
  'Ник Фьюри',
  'Капитан Америка',
  'Железный человек',
  'Алая Ведьма'
];

var PATH = {
  PHOTO: 'photos/',
  AVATAR: 'img/avatar-'
};

var FORMAT_IMG = {
  SVG: '.svg',
  JPG: '.jpg'
};

var KEY_ESC = 27;

var SCALE = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

var PHOTOS_COUNT = 25;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getArrayPhotos = function (count) {
  var photos = [];
  for (var i = 1; i <= count; i++) {
    var photosOption = {
      url: PATH.PHOTO + i + FORMAT_IMG.JPG,
      likes: getRandomNumber(15, 200),
      comments: [
        {
          avatar: PATH.AVATAR + getRandomNumber(1, 6) + FORMAT_IMG.SVG,
          message: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
          name: NAMES[getRandomNumber(0, NAMES.length - 1)]
        }
      ]
    };

    photos.push(photosOption);
  }

  return photos;
};

var photos = getArrayPhotos(PHOTOS_COUNT);

var renderPhoto = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  fragment.appendChild(pictureElement);
};

for (var i = 0; i < photos.length; i++) {
  renderPhoto(photos[i]);
}

pictureList.appendChild(fragment);

var uploadPopup = document.querySelector('.img-upload__overlay');
var inputUploadImage = document.querySelector('.img-upload__input');
var uploadButtonClose = uploadPopup.querySelector('.img-upload__cancel');
var uploadImg = uploadPopup.querySelector('.img-upload__preview img');
var inputEffectValue = uploadPopup.querySelector('input[name="effect-level"]');
var textDescription = uploadPopup.querySelector('.text__description');

var openUploadPopup = function () {
  uploadPopup.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress);
  uploadImg.style.transform = 'scale(1)';
  inputScale.value = '100%';
};

var closeUploadPopup = function () {
  uploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress);
  inputUploadImage.value = '';
  uploadImg.style = '';
};

var onUploadEscPress = function (evt) {
  if (evt.keyCode === KEY_ESC && textDescription !== document.activeElement) {
    closeUploadPopup();
  }
};

inputUploadImage.addEventListener('change', openUploadPopup);

uploadButtonClose.addEventListener('click', closeUploadPopup);

var effectLevel = uploadPopup.querySelector('.effect-level');
var effectPin = uploadPopup.querySelector('.effect-level__pin');
var effectBar = uploadPopup.querySelector('.effect-level__depth');
var effectRadio = uploadPopup.querySelectorAll('.effects__radio');

var Effect = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  NONE: 'none'
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
      value = (percent * 3) / 100;
      break;
  }

  return value;
};

effectLevel.classList.add('hidden');

var addFilterEffect = function (evt) {
  var radioItem = evt.target;
  var radioValue = radioItem.value;
  uploadImg.className = '';
  uploadImg.style.filter = '';
  inputEffectValue.value = '0';

  if (radioValue !== Effect.NONE) {
    uploadImg.classList.add('effects__preview--' + radioValue);
    effectPin.style.left = '100%';
    effectBar.style.width = '100%';
    inputEffectValue.value = '100';
  }

  if (uploadImg.className === '') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

effectRadio.forEach(function (radioItem) {
  radioItem.addEventListener('click', addFilterEffect);
});

var FilterStyle = {
  GRAYSCALE: 'grayscale',
  SEPIA: 'sepia',
  INVERT: 'invert',
  BLUR: 'blur',
  BRIGHTNESS: 'brightness'
};

var getFilterStyleCss = function (element, filter, valueEffect) {
  element.style.filter = filter + '(' + valueEffect + ')';
};

effectPin.addEventListener('mouseup', function () {
  var inputRadioChecked = uploadPopup.querySelector('.effects__radio:checked');
  var currentEffect = inputRadioChecked.value;
  var valuePin = parseInt(effectPin.style.left, 10);
  var valueEffect = calculateEffect(currentEffect, valuePin);
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
});

var buttonScaleSmaller = uploadPopup.querySelector('.scale__control--smaller');
var buttonScaleBigger = uploadPopup.querySelector('.scale__control--bigger');
var inputScale = uploadPopup.querySelector('.scale__control--value');

var getTransformStyleCss = function (element, scaleStyle) {
  element.style.transform = 'scale' + '(' + scaleStyle + ')';
};

var scaleImage = function (evt) {
  var scaleNumber = parseInt(inputScale.value, 10);
  if (evt.target === buttonScaleSmaller) {
    if (scaleNumber > SCALE.MIN) {
      scaleNumber = scaleNumber - SCALE.STEP;
      if (scaleNumber < SCALE.MIN) {
        scaleNumber = SCALE.MIN;
      }
    }
  } else {
    if (scaleNumber < SCALE.MAX) {
      scaleNumber = scaleNumber + SCALE.STEP;
      if (scaleNumber > SCALE.MAX) {
        scaleNumber = SCALE.MAX;
      }
    }
  }

  var scaleStyle = scaleNumber / 100;
  inputScale.value = scaleNumber + '%';
  getTransformStyleCss(uploadImg, scaleStyle);
};

buttonScaleSmaller.addEventListener('click', scaleImage);
buttonScaleBigger.addEventListener('click', scaleImage);
