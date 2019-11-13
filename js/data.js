'use strict';

(function () {

  var DataConfig = {
    SAVE: 'https://js.dump.academy/keksobooking',
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data'
  };

  var XhrConfig = {
    RESPONSE_TYPE: 'json',
    SUCCESS_STATUS: 200,
    TIMEOUT: 5000,

    ERROR_MESSAGE: {
      LOAD: 'статус ответа:',
      ERROR: 'ошибка соединения',
      TIMEOUT: 'запрос не успел выполнится за'
    }
  };

  /**
   * Init xhr config
   * @param {object} xhr XMLHttpRequest
   * @param {callback} onSuccess success callback
   * @param {callback} onError error callback
   * @return {*}
   */
  function xhrInit(xhr, onSuccess, onError) {
    xhr.responseType = XhrConfig.RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === XhrConfig.SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(XhrConfig.ERROR_MESSAGE.LOAD + ' ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(XhrConfig.ERROR_MESSAGE.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(XhrConfig.ERROR_MESSAGE.TIMEOUT + ' ' + (xhr.timeout / 1000) + ' с');
    });

    xhr.timeout = XhrConfig.TIMEOUT;

    return xhr;
  }


  window.data = {
    /**
     * Download data
     * @param {callback} cbSuccess
     * @param {callback} cbError
     */
    download: function (cbSuccess, cbError) {
      var xhr = xhrInit(new XMLHttpRequest(), cbSuccess, cbError);
      xhr.open('GET', DataConfig.DOWNLOAD);
      xhr.send();
    },
    /**
     * Upload data
     * @param {array} data
     * @param {callback} cbSuccess
     * @param {callback} cbError
     */
    upload: function (data, cbSuccess, cbError) {
      var xhr = xhrInit(new XMLHttpRequest(), cbSuccess, cbError);
      xhr.open('POST', DataConfig.SAVE);
      xhr.send(data);
    }
  };
})();
