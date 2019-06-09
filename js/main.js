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

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var photos = [];

for (var i = 1; i <= 25; i++) {
  var photosFeature = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: [
      {
        avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
        message: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
        name: NAMES[getRandomNumber(0, NAMES.length - 1)]
      }
    ]
  };

  photos.push(photosFeature);
}

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

var insertElement = function (wrapper, item) {
  wrapper.appendChild(item);
};

insertElement(pictureList, fragment);
