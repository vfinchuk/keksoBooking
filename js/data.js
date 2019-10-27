'use strict';

(function () {

  var xhrConfig = {
    RESPONSE_TYPE: 'json',
    SUCCESS_STATUS: 200,
    TIMEOUT: 5000,

    ERROR_MASSAGE: {
      LOAD: 'Cтатус ответа:',
      ERROR: 'Ошибка соединения',
      TIMEOUT: 'Запрос не успел выполнится за'
    }
  };

  function xhrInit(xhr, onSuccess, onError) {
    xhr.responseType = xhrConfig.RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === xhrConfig.SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(xhrConfig.ERROR_MASSAGE.LOAD + ' ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(xhrConfig.ERROR_MASSAGE.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(xhrConfig.ERROR_MASSAGE.TIMEOUT + ' ' + xhr.timeout + ' мс');
    });

    xhr.timeout = xhrConfig.TIMEOUT;

    return xhr;
  }


  window.data = {
    download: function (cbSuccess, cbError) {
      var xhr = xhrInit(new XMLHttpRequest(), cbSuccess, cbError);
      xhr.open('GET', window.config.DOWNLOAD_DATA);
      xhr.send();
    },

    upload: function (data, cbSuccess, cbError) {
      var xhr = xhrInit(new XMLHttpRequest(), cbSuccess, cbError);
      xhr.open('POST', window.config.SAVE_DATA);
      xhr.send(data);
    }
  };

  // ...

})();
