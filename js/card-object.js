'use strict';

(function () {

  var cardData = window.cardData;
  var mapNode = window.util.mapNode;

  /**
   * Generate array with card objects
   * @param {Number} amount - cards amount
   * @return {Array} - cards array
   */
  function generateCard(amount) {
    var cards = [];
    amount = amount < cardData.titles.length ? amount : cardData.titles.length;

    for (var i = 0; i < amount; i++) {

      cards[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: cardData.titles[i],
          address: function () {
            return this.location.x + ', ' + this.location.y;
          },
          price: window.util.randomNumber(300, 1000),
          type: window.util.randomArrayItem(cardData.apartments),
          rooms: window.util.randomNumber(1, 5),
          guests: window.util.randomNumber(1, 5),
          checkin: window.util.randomArrayItem(cardData.checkIns),
          checkout: window.util.randomArrayItem(cardData.checkOuts()),
          features: window.util.randomItemsLengthArray(cardData.features),
          description: 'Here will be description',
          photos: window.util.randomItemsLengthArray(cardData.photos),
          location: {
            x: window.util.randomNumber(mapNode.offsetLeft, mapNode.offsetWidth),
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
