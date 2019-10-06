'use strict';

(function () {

  window.dataLoad = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 20000;
    xhr.open('GET', url);
    xhr.send();
  };

})();
