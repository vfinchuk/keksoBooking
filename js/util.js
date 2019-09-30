'use strict';
(function () {

  var BOOK_MAP = document.querySelector('.map');
  var BOOK_FORM = document.querySelector('.notice');
  var BOOK_FILTERS = document.querySelector('.map__filters-container');
  var BOOK_CARD = document.querySelector('.map__card');

  var ENTER_BTN = 13;
  var ESC_BTN = 27;
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


  window.util = {
    BOOK_MAP: BOOK_MAP,
    BOOK_FORM: BOOK_FORM,
    BOOK_FILTERS: BOOK_FILTERS,
    BOOK_CARD: BOOK_CARD,
    ENTER_BTN: ENTER_BTN,
    ESC_BTN: ESC_BTN,

    randomArrayItem: randomArrayItem,
    randomNumber: randomNumber,
    randomItemsLengthArray: randomItemsLengthArray
  };

  // ...
})();
