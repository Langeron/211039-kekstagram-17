'use strict';

(function () {
  window.load = function (url, method, onSuccess, data, onError) {
    var URL = url;
    var Status = {
      200: 200,
      404: 404,
      401: 401,
      400: 400
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, URL);

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
})();
