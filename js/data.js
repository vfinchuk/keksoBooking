'use strict';

(function () {

  var dataConfig = {
    SAVE: 'https://js.dump.academy/keksobooking',
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data'
  };

  var xhrConfig = {
    RESPONSE_TYPE: 'json',
    SUCCESS_STATUS: 200,
    TIMEOUT: 5000,

    ERROR_MASSAGE: {
      LOAD: 'статус ответа:',
      ERROR: 'ошибка соединения',
      TIMEOUT: 'запрос не успел выполнится за'
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
      onError(xhrConfig.ERROR_MASSAGE.TIMEOUT + ' ' + (xhr.timeout / 1000) + ' с');
    });

    xhr.timeout = xhrConfig.TIMEOUT;

    return xhr;
  }


  window.data = {
    download: function (cbSuccess, cbError) {
      var xhr = xhrInit(new XMLHttpRequest(), cbSuccess, cbError);
      xhr.open('GET', dataConfig.DOWNLOAD);
      xhr.send();
    },

    upload: function (data, cbSuccess, cbError) {
      var xhr = xhrInit(new XMLHttpRequest(), cbSuccess, cbError);
      xhr.open('POST', dataConfig.SAVE);
      xhr.send(data);
    }
  };
})();
