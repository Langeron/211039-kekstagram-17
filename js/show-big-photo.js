'use strict';

(function () {
  var AVATAR_URL = 'img/avatar-';
  var SVG = '.svg';
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var caption = bigPicture.querySelector('.social__caption');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commetsWrapper = bigPicture.querySelector('.social__comments');
  var commets = bigPicture.querySelectorAll('.social__comment');
  var cloneComment = bigPicture.querySelector('.social__comment').cloneNode(true);
  var fragment = document.createDocumentFragment();
  var commentCout = bigPicture.querySelector('.social__comment-count');
  var commentLoader = bigPicture.querySelector('.comments-loader');

  commentCout.classList.add('visually-hidden');
  commentLoader.classList.add('visually-hidden');


  var showBigPhoto = function (photos) {
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = photos[0].url;
    likes.textContent = photos[0].likes;
    caption.textContent = photos[0].description;
    commentsCount.textContent = photos[0].comments.length;

    window.util.delNodeList(commets);
    photos[0].comments.forEach(function (comment) {
      var commentElement = cloneComment.cloneNode(true);
      commentElement.querySelector('.social__picture').src = AVATAR_URL + window.util.getRandomNumber(1, 6) + SVG;
      commentElement.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(commentElement);
    });

    commetsWrapper.appendChild(fragment);
  };

  window.showBigPhoto = showBigPhoto;
})();
