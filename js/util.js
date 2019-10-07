'use strict';
(function () {

  var cardFromPath = 'https://js.dump.academy/keksobooking';
  var ordersData = 'https://js.dump.academy/keksobooking/data';

  var enterBtnKey = 13;
  var escBtnKey = 27;

  var formInvalidColor = 'rgba(255, 0, 0, 0.2)';
  var formValidColor = 'rgba(0, 255, 0, 0.2)';

  var mainNode = document.querySelector('main');
  var mapNode = document.querySelector('.map');
  var formNode = document.querySelector('.notice');
  var filtersNode = document.querySelector('.map__filters-container');
  var cardNode = document.querySelector('.map__card');

  /**
   * Return random item from array
   * @param {Array} array - array
   * @return {Array} - new array
   */
  function randomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Return random number in diapason
   * @param {Number} min - min diapason
   * @param {Number} max - max max diapason
   * @return {Number} - random number
   */
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Return array with random element and length
   * @param {Array} array - array
   * @return {Array} - new array
   */
  function randomItemsLengthArray(array) {
    var result = [];
    var length = Math.floor(Math.random() * array.length + 1);

    for (var i = 0; i < length; i++) {
      var key = Math.floor(Math.random() * (array.length - 1));
      result[i] = array[key];
      array.splice(key, 1);
    }

    return result;
  }

  /**
   * Return error massage fragment
   * @param {string} massage - error massage
   * @return {Node}
   */
  function errorMassage(massage) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#error').content.querySelector('.error');

    template = template.cloneNode(true);

    template.querySelector('.error__message').textContent = massage;

    return fragment.appendChild(template);
  }

  /**
   * Return success massage fragment
   * @param {string} massage - success massage
   * @return {Node}
   */
  function successMassage(massage) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#success').content.querySelector('.success');

    template = template.cloneNode(true);

    template.querySelector('.success__message').textContent = massage;

    return fragment.appendChild(template);
  }

  /**
   * Download data from server
   * @param {string} url - data server url
   * @param {callback} onSuccess - success callback
   * @param {callback} onError - error callback
   */
  function downloadData(url, onSuccess, onError) {
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
  }

  /**
   * Upload data to server
   * @param {string} url - server url
   * @param {array} data - data to uploading
   * @param {callback} onSuccess - success callback
   * @param {callback} onError - error callback
   */
  function uploadData(url, data, onSuccess, onError) {
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

    xhr.open('POST', url);
    xhr.send(data);
  }


  window.util = {

    locations: {
      cardFromPath: cardFromPath,
      ordersData: ordersData
    },

    mainNode: mainNode,
    mapNode: mapNode,
    formNode: formNode,
    filtersNode: filtersNode,
    cardNode: cardNode,
    enterBtnKey: enterBtnKey,
    escBtnKey: escBtnKey,

    formInvalidColor: formInvalidColor,
    formValidColor: formValidColor,

    randomArrayItem: randomArrayItem,
    randomNumber: randomNumber,
    randomItemsLengthArray: randomItemsLengthArray,

    massages: {
      error: errorMassage,
      success: successMassage
    },

    data: {
      download: downloadData,
      upload: uploadData
    }
  };

  // ...
})();
