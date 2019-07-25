'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  var popularFilter = imgFilters.querySelector('#filter-popular');
  var newFilter = imgFilters.querySelector('#filter-new');
  var discussedFilter = imgFilters.querySelector('#filter-discussed');
  var filtersList = imgFilters.querySelectorAll('.img-filters__button');

  var removeActiveClass = function () {
    filtersList.forEach(function (filter) {
      filter.classList.remove('img-filters__button--active');
    });
  };

  var updatePhoto = function (currentPhotos, currentFilter) {
    window.util.delNodeList(currentPhotos);
    window.renderPhotos.render(currentFilter);
    var newPictures = document.querySelectorAll('.picture');
    window.showBigPhoto(currentFilter, newPictures);
  };

  var defineFilter = function (target, photos) {
    var clonePhotos = photos.slice();
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
        break;
    }
    return currentFilter;
  };

  var filter = function (photos) {
    filtersList.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        var target = evt.currentTarget;
        removeActiveClass();
        var currentPhotos = document.querySelectorAll('.picture');
        var currentFilter = defineFilter(target, photos);

        window.debounce(updatePhoto.bind(null, currentPhotos, currentFilter));
      });
    });
  };
  window.filter = filter;
})();
