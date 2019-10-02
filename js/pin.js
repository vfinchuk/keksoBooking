'use strict';

(function () {

  var mapNode = window.util.mapNode;
  var mapPinsWrap = mapNode.querySelector('.map__pins');


  /**
   * Build mapPins fragment array
   * @param {array} cards - cards array
   * @return {DocumentFragment} - collection of mapPin elements
   */
  function __mapPinsFragment(cards) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#pin').content.querySelector('.map__pin');

    cards.forEach(function (card) {
      var pinElement = template.cloneNode(true);
      var pinElementImage = pinElement.querySelector('img');

      pinElement.querySelector('img').setAttribute('src', card.author.avatar);
      pinElement.querySelector('img').setAttribute('alt', card.offer.title);


      var locX = card.offer.location.x - pinElementImage.getAttribute('width');
      var locY = card.offer.location.y - pinElementImage.getAttribute('height');
      pinElement.style.left = locX + 'px';
      pinElement.style.top = locY + 'px';

      fragment.appendChild(pinElement);
    });

    return fragment;
  }

  /* Render map pins fragment */
  function renderMapPins() {
    mapPinsWrap.appendChild(__mapPinsFragment(window.card.generateCard(8)));
  }

  window.pin = {
    renderMapPins: renderMapPins
  };

  // ...

})();
