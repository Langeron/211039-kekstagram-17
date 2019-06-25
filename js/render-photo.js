'use strict';

(function () {
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

  var PHOTOS_COUNT = 25;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var getArrayPhotos = function (count) {
    var photos = [];
    for (var i = 1; i <= count; i++) {
      var photosOption = {
        url: PATH.PHOTO + i + FORMAT_IMG.JPG,
        likes: window.util.getRandomNumber(15, 200),
        comments: [
          {
            avatar: PATH.AVATAR + window.util.getRandomNumber(1, 6) + FORMAT_IMG.SVG,
            message: COMMENTS[window.util.getRandomNumber(0, COMMENTS.length - 1)],
            name: NAMES[window.util.getRandomNumber(0, NAMES.length - 1)]
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

})();
