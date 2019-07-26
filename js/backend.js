'use strict';

(function () {
  var Url = {
    UPLOAD: 'https://js.dump.academy/kekstagram',
    LOAD: 'https://js.dump.academy/kekstagram/data'
  };

  var Method = {
    POST: 'POST',
    GET: 'GET'
  };

  var Status = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    NOT_AUTHORIZED: 401,
    INVALID_REQUEST: 400
  };

  var backend = function (url, method, onSuccess, data, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Status.NOT_FOUND:
          onError('Cтатус ответа: ' + xhr.status + ' Ничего не найдено');
          break;
        case Status.INVALID_REQUEST:
          onError('Cтатус ответа: ' + xhr.status + ' Неверный запрос');
          break;
        case Status.NOT_AUTHORIZED:
          onError('Cтатус ответа: ' + xhr.status + ' Пользователь не авторизован');
          break;
        default:
          onError('Ошибка:' + xhr.status);
      }
    });

    xhr.send(data);
  };


  backend(Url.LOAD, Method.GET, window.renderPhotos.onSuccessLoad);

  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (evt) {
    backend(Url.UPLOAD, Method.POST, window.form.onSuccessUpload, new FormData(form), window.form.onErrorUpload);
    evt.preventDefault();
  });
})();
