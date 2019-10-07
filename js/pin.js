'use strict';

(function () {

  /**
   * Build mapPins fragment array
   * @param {array} cards - cards array
   * @return {DocumentFragment} - collection of mapPin elements
   */
  function mapPinsFragment(cards) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#pin').content.querySelector('.map__pin');

    template = template.cloneNode(true);

    cards.forEach(function (card) {
      var pinElement = template.cloneNode(true);
      var pinElementImage = pinElement.querySelector('img');

      pinElement.querySelector('img').setAttribute('src', card.author.avatar);
      pinElement.querySelector('img').setAttribute('alt', card.offer.title);


      var locX = card.location.x - pinElementImage.getAttribute('width');
      var locY = card.location.y - pinElementImage.getAttribute('height');
      pinElement.style.left = locX + 'px';
      pinElement.style.top = locY + 'px';

      fragment.appendChild(pinElement);
    });

    return fragment;
  }


  window.pin = {
    mapPinsFragment: mapPinsFragment
  };

  // ...

})();
