'use strict';

(function () {
  var PHOTOS_COUNT = 25;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var renderPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(pictureElement);
  };

  var onSuccess = function (photos) {
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      renderPhoto(photos[i]);
    }

    pictureList.appendChild(fragment);
  };

  window.load(onSuccess);
})();
