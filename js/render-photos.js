'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var renderPhotos = function (photos) {
    photos.forEach(function (photo) {
      var pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = photo.url;
      pictureElement.querySelector('.picture__likes').textContent = photo.likes;
      pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
      fragment.appendChild(pictureElement);
    });
    pictureList.appendChild(fragment);
  };

  var imgFilters = document.querySelector('.img-filters');

  var showFilter = function () {
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onSuccessLoad = function (data) {
    renderPhotos(data);
    showFilter();
    var pictures = document.querySelectorAll('.picture');
    window.showBigPhoto(data, pictures);
    window.filter(data);
  };

  window.renderPhotos = {
    onSuccessLoad: onSuccessLoad,
    render: renderPhotos
  };
})();
