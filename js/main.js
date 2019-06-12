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
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var photos = [];

var getArrayPhotos = function (count) {
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
};

getArrayPhotos(25);

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


