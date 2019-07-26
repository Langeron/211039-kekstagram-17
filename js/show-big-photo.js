'use strict';

(function () {
  var AVATAR_URL = 'img/avatar-';
  var SVG = '.svg';
  var COMMENT_COUNT = 5;
  var cloneComment = document.querySelector('.social__comment').cloneNode(true);
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var caption = bigPicture.querySelector('.social__caption');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsWrapper = bigPicture.querySelector('.social__comments');
  var comments = bigPicture.querySelectorAll('.social__comment');
  var commentsCountWrapper = bigPicture.querySelector('.social__comment-count');
  var commentLoader = bigPicture.querySelector('.comments-loader');
  var closeBtn = bigPicture.querySelector('.big-picture__cancel');

  var onPhotoEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      onPhotoClose();
    }
  };

  var onPhotoClose = function () {
    bigPicture.classList.add('hidden');
    window.util.delNodeList(Array.from(commentsWrapper.children));

    closeBtn.removeEventListener('click', onPhotoClose);
    commentLoader.removeEventListener('click', onLoadClick);
  };

  var fragmentComment = document.createDocumentFragment();
  var allComments;

  var updateCountComments = function () {
    commentsCountWrapper.firstChild.remove();
    commentsCountWrapper.insertAdjacentText('afterbegin', commentsWrapper.children.length + ' из ');
    if (commentsWrapper.children.length === allComments.length) {
      commentLoader.classList.add('hidden');
    } else {
      commentLoader.classList.remove('hidden');
    }
  };

  var showPartComments = function (newComments) {
    allComments = Array.from(newComments).slice();
    var cloneComments = Array.from(newComments).slice(0, 5);
    cloneComments.forEach(function (comment) {
      fragmentComment.appendChild(comment);
    });
    commentsWrapper.appendChild(fragmentComment);
    updateCountComments();
  };

  var onLoadClick = function () {
    var fragmentLoadComments = document.createDocumentFragment();
    var currentComments = document.querySelectorAll('.social__comment');
    var count = 0;
    currentComments = allComments.filter(function (comment, i) {
      if (comment !== currentComments[i]) {
        count++;
      }
      return count <= COMMENT_COUNT && count !== 0;
    });
    currentComments.forEach(function (comment) {
      fragmentLoadComments.appendChild(comment);
    });
    commentsWrapper.appendChild(fragmentLoadComments);
    updateCountComments();
  };

  var applyImgParametrs = function (paramPhoto) {
    var fragment = document.createDocumentFragment();
    bigPictureImg.src = paramPhoto.url;
    likes.textContent = paramPhoto.likes;
    caption.textContent = paramPhoto.description;
    commentsCount.textContent = paramPhoto.comments.length;
    window.util.delNodeList(comments);
    paramPhoto.comments.forEach(function (comment) {
      var commentElement = cloneComment.cloneNode(true);
      commentElement.querySelector('.social__picture').src = AVATAR_URL + window.util.getRandomNumber(1, 6) + SVG;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(commentElement);
    });
    var newComments = fragment.children;
    showPartComments(newComments);
  };

  var onPhotoOpen = function (paramPhoto) {
    bigPicture.classList.remove('hidden');
    applyImgParametrs(paramPhoto);

    closeBtn.addEventListener('click', onPhotoClose);
    document.addEventListener('keydown', onPhotoEscPress);
    commentLoader.addEventListener('click', onLoadClick);
  };

  var showBigPhoto = function (photos, pictures) {
    pictures.forEach(function (item, i) {
      item.addEventListener('click', function () {
        var paramPhoto = photos[i];
        onPhotoOpen(paramPhoto);
      });
    });
  };

  window.showBigPhoto = showBigPhoto;
})();
