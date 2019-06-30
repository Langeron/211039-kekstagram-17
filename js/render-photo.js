'use strict';

(function () {

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

  var imgFilters = document.querySelector('.img-filters');

  var showFilter = function () {
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onSuccess = function (photos) {
    photos.forEach(function (photo) {
      renderPhoto(photo);
    });
    pictureList.appendChild(fragment);
    showFilter();
  };

  window.load(window.util.Method.GET, onSuccess);
})();
