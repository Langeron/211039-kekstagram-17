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

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var PATH = {
  PHOTO: 'photos/',
  AVATAR: 'img/avatar-'
};

var FORMAT_IMG = {
  SVG: '.svg',
  JPG: '.jpg'
};

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

var photos = getArrayPhotos(25);

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
var KEY_ESC = 27;

var openUploadPopup = function () {
  uploadPopup.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress);
};

var closeUploadPopup = function () {
  uploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress);
  inputUploadImage.value = '';
  uploadImg.style = '';
};

var onUploadEscPress = function (evt) {
  if (evt.keyCode === KEY_ESC) {
    closeUploadPopup();
  }
};

inputUploadImage.addEventListener('change', function () {
  openUploadPopup();
});

uploadButtonClose.addEventListener('click', function () {
  closeUploadPopup();
});

var effectLevel = uploadPopup.querySelector('.effect-level');
var effectPin = uploadPopup.querySelector('.effect-level__pin');
var effectBar = uploadPopup.querySelector('.effect-level__depth');
var effectRadio = uploadPopup.querySelectorAll('.effects__radio');
var uploadImg = uploadPopup.querySelector('.img-upload__preview img');
var inputEffectValue = uploadPopup.querySelector('input[name="effect-level"]');

var calculateEffect = function (effectName, percent) {
  var value;
  var effect = '' + effectName;

  if (effect === 'chrome' || effect === 'sepia') {
    value = percent / 100;
  } else if (effect === 'marvin') {
    value = percent + '%';
  } else if (effect === 'phobos') {
    value = (percent * 3) / 100 + 'px';
  } else if (effect === 'heat') {
    value = (percent * 3) / 100;
  }

  return value;
};

effectLevel.classList.add('hidden');

effectRadio.forEach(function (radioItem) {
  radioItem.addEventListener('click', function () {
    var radioValue = radioItem.value;
    uploadImg.className = '';
    uploadImg.style.filter = '';
    inputEffectValue.value = '0';

    if (radioValue !== 'none') {
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
  });
});

effectPin.addEventListener('mouseup', function () {
  var currentEffect = uploadPopup.querySelector('.effects__radio:checked').value;
  var valuePin = parseInt(effectPin.style.left, 10);
  var valueEffect = calculateEffect(currentEffect, valuePin);
  inputEffectValue.value = valuePin;

  if (currentEffect === 'chrome') {
    uploadImg.style.filter = 'grayscale' + '(' + valueEffect + ')';
  } else if (currentEffect === 'sepia') {
    uploadImg.style.filter = 'sepia' + '(' + valueEffect + ')';
  } else if (currentEffect === 'marvin') {
    uploadImg.style.filter = 'invert' + '(' + valueEffect + ')';
  } else if (currentEffect === 'phobos') {
    uploadImg.style.filter = 'blur' + '(' + valueEffect + ')';
  } else if (currentEffect === 'heat') {
    uploadImg.style.filter = 'brightness' + '(' + valueEffect + ')';
  }
});

var buttonScaleSmaller = document.querySelector('.scale__control--smaller');
var buttonScaleBigger = document.querySelector('.scale__control--bigger');
var inputScale = document.querySelector('.scale__control--value');
var SCALE = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

uploadImg.style.transform = 'scale(1)';
inputScale.value = '100%';
buttonScaleSmaller.addEventListener('click', function () {
  var scaleNumber = parseInt(inputScale.value, 10);
  if (scaleNumber > SCALE.MIN) {
    scaleNumber = scaleNumber - SCALE.STEP;
    if (scaleNumber < SCALE.MIN) {
      scaleNumber = SCALE.MIN;
    }
    var scaleStyle = scaleNumber / 100;
    inputScale.value = scaleNumber + '%';
    uploadImg.style.transform = 'scale' + '(' + scaleStyle + ')';
  }
});

buttonScaleBigger.addEventListener('click', function () {
  var scaleNumber = parseInt(inputScale.value, 10);
  if (scaleNumber < SCALE.MAX) {
    scaleNumber = scaleNumber + SCALE.STEP;
    if (scaleNumber > SCALE.MAX) {
      scaleNumber = SCALE.MAX;
    }
    var scaleStyle = scaleNumber / 100;
    inputScale.value = scaleNumber + '%';
    uploadImg.style.transform = 'scale' + '(' + scaleStyle + ')';
  }
});
