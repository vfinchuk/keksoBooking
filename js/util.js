'use strict';
(function () {

  var enterBtnKey = 13;
  var escBtnKey = 27;

  var formInvalidColor = 'rgba(255, 0, 0, 0.2)';
  var formValidColor = 'rgba(0, 255, 0, 0.2)';

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


  window.util = {
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
    randomItemsLengthArray: randomItemsLengthArray
  };

  // ...
})();
