'use strict';

(function () {

  var CARD_DATA = {
    amount: 8,
    titles: [
      'Люкс аппортаменты',
      '2х комнатная кв.',
      'Комната с видом на море',
      'Большая студия',
      'Коммуналка',
      'Комната с терассой',
      'Квартира в центре',
      'Уютный Лофт'
    ],
    apartments: ['palace', 'flat', 'house', 'bungalo'],
    checkIns: ['12:00', '13:00', '14:00'],
    checkOuts: function () {
      return this.checkIns;
    },
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  };

  window.CARD_DATA = CARD_DATA;

})();
