'use strict';

(function () {
  var AVATAR_URL = 'img/avatar-';
  var SVG = '.svg';
  var cloneComment = document.querySelector('.social__comment').cloneNode(true);

  var showBigPhoto = function (photos, pictures) {
    var bigPicture = document.querySelector('.big-picture');
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var likes = bigPicture.querySelector('.likes-count');
    var caption = bigPicture.querySelector('.social__caption');
    var commentsCount = bigPicture.querySelector('.comments-count');
    var commentsWrapper = bigPicture.querySelector('.social__comments');
    var comments = bigPicture.querySelectorAll('.social__comment');
    var fragment = document.createDocumentFragment();
    var commentCout = bigPicture.querySelector('.social__comment-count');
    var commentLoader = bigPicture.querySelector('.comments-loader');
    var closeBtn = bigPicture.querySelector('.big-picture__cancel');

    commentCout.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');


    var onPhotoEscPress = function (evt) {
      if (evt.keyCode === window.util.KEY_CODE.ESC) {
        onPhotoClose();
      }
    };

    var onPhotoClose = function () {
      bigPicture.classList.add('hidden');
      window.util.delNodeList(Array.from(commentsWrapper.children));

      closeBtn.removeEventListener('click', onPhotoClose);
    };

    var applyImgParametrs = function (photosArray, i) {
      bigPictureImg.src = photosArray[i].url;
      likes.textContent = photosArray[i].likes;
      caption.textContent = photosArray[i].description;
      commentsCount.textContent = photosArray[i].comments.length;
      window.util.delNodeList(comments);
      photosArray[i].comments.forEach(function (comment) {
        var commentElement = cloneComment.cloneNode(true);
        commentElement.querySelector('.social__picture').src = AVATAR_URL + window.util.getRandomNumber(1, 6) + SVG;
        commentElement.querySelector('.social__text').textContent = comment.message;
        fragment.appendChild(commentElement);
      });
      commentsWrapper.appendChild(fragment);
    };

    var onPhotoOpen = function (i) {
      bigPicture.classList.remove('hidden');
      applyImgParametrs(photos, i);
      closeBtn.addEventListener('click', onPhotoClose);
      document.addEventListener('keydown', onPhotoEscPress);
    };


    pictures.forEach(function (item, i) {
      item.addEventListener('click', function () {
        onPhotoOpen(i);
      });
    });
  };

  window.showBigPhoto = showBigPhoto;
})();
