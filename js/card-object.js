'use strict';

(function () {

  var CARD_DATA = window.CARD_DATA;
  var MAP = window.util.BOOK_MAP;

  /**
   * Generate array with card objects
   * @param {Number} amount - cards amount
   * @return {Array} - cards array
   */
  function generateCard(amount) {
    var cards = [];
    amount = amount < CARD_DATA.titles.length ? amount : CARD_DATA.titles.length;

    for (var i = 0; i < amount; i++) {

      cards[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: CARD_DATA.titles[i],
          address: function () {
            return this.location.x + ', ' + this.location.y;
          },
          price: window.util.randomNumber(300, 1000),
          type: window.util.randomArrayItem(CARD_DATA.apartments),
          rooms: window.util.randomNumber(1, 5),
          guests: window.util.randomNumber(1, 5),
          checkin: window.util.randomArrayItem(CARD_DATA.checkIns),
          checkout: window.util.randomArrayItem(CARD_DATA.checkOuts()),
          features: window.util.randomItemsLengthArray(CARD_DATA.features),
          description: 'Here will be description',
          photos: window.util.randomItemsLengthArray(CARD_DATA.photos),
          location: {
            x: window.util.randomNumber(MAP.offsetLeft, MAP.offsetWidth),
            y: window.util.randomNumber(130, 630)
          }
        }
      };
    }
    return cards;
  }

  window.generateCard = generateCard;

  // ...

})();
