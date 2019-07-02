'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var renderPhoto = function (photos) {
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

  var photos = [];

  var onSuccess = function (data) {
    photos = data;
    renderPhoto(data);
    showFilter();
  };
  var popularFilter = imgFilters.querySelector('#filter-popular');
  var newFilter = imgFilters.querySelector('#filter-new');
  var discussedFilter = imgFilters.querySelector('#filter-discussed');
  var filtersList = imgFilters.querySelectorAll('.img-filters__button');

  var delNodeList = function (list) {
    list.forEach(function (item) {
      item.remove();
    });
  };

  window.load(window.util.Method.GET, onSuccess);

  filtersList.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      var clonePhotos = photos.slice();
      var target = evt.currentTarget;
      filtersList.forEach(function (filter) {
        filter.classList.remove('img-filters__button--active');
      });
      var currentPhotos = document.querySelectorAll('.picture');
      var currentFilter;
      switch (target) {
        case discussedFilter:
          discussedFilter.classList.add('img-filters__button--active');
          var discussedPhotos = clonePhotos;
          discussedPhotos.sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });
          currentFilter = discussedPhotos;
          break;
        case popularFilter:
          popularFilter.classList.add('img-filters__button--active');
          currentFilter = photos;
          break;
        case newFilter:
          newFilter.classList.add('img-filters__button--active');
          currentFilter = window.util.shuffle(clonePhotos);
      }
      window.debounce(delNodeList(currentPhotos))
      // delNodeList(currentPhotos);
      window.debounce(renderPhoto(currentFilter));
    });
  });
})();
