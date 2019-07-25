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
    200: 200,
    404: 404,
    401: 401,
    400: 400
  };

  var backend = function (url, method, onSuccess, data, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status[200]:
          onSuccess(xhr.response);
          break;
        case Status[404]:
          onError('Cтатус ответа: ' + xhr.status + ' Ничего не найдено');
          break;
        case Status[400]:
          onError('Cтатус ответа: ' + xhr.status + ' Неверный запрос');
          break;
        case Status[401]:
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
