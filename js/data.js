'use strict';

(function () {

  var XHR = {
    RESPONSE_TYPE: 'json',
    SUCCESS_STATUS: 200,
    XHR_TIMEOUT: 2000,
    PATH_UPLOAD: 'https://js.dump.academy/keksobooking',
    PATH_DOWNLOAD: 'https://js.dump.academy/keksobooking/data',

    ERROR_MASSAGE: {
      LOAD: 'Cтатус ответа:',
      ERROR: 'Ошибка соединения',
      TIMEOUT: 'Запрос не успел выполнится за'
    }

  };


  /**
   * Init XMLHttpRequest
   * @param {callback} onSuccess - success callback
   * @param {callback} onError - error callback
   * @return {object} XMLHttpRequest
   */
  function xhrInit(onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = XHR.RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR.SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(XHR.ERROR_MASSAGE.LOAD + ' ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(XHR.ERROR_MASSAGE.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(XHR.ERROR_MASSAGE.TIMEOUT + ' ' + xhr.timeout + ' мс');
    });

    xhr.timeout = XHR.XHR_TIMEOUT;

    return xhr;
  }


  /**
   * Download data to server
   * @param {callback} cbSuccess - success callback
   * @param {callback} cbError - error callback
   */
  function download(cbSuccess, cbError) {
    var xhr = xhrInit(cbSuccess, cbError);
    xhr.open('GET', XHR.PATH_DOWNLOAD);
    xhr.send();
  }


  /**
   * Upload data to server
   * @param {array} data - upload data to server
   * @param {callback} cbSuccess - success callback
   * @param {callback} cbError - error callback
   */
  function upload(data, cbSuccess, cbError) {
    var xhr = xhrInit(cbSuccess, cbError);

    xhr.open('POST', XHR.PATH_UPLOAD);
    xhr.send(data);
  }


  window.data = {
    download: download,
    upload: upload
  };

  // ...

})();
