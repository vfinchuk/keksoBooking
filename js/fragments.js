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

  /**
   * Build card fragment
   * @param {object} card - card object
   * @return {Node} - card__popup fragment
   */
  function cardFragment(card) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#card').content.querySelector('.map__card');

    template.querySelector('.popup__title').textContent = card.offer.title;
    template.querySelector('.popup__text--address').textContent = card.offer.address();
    template.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    template.querySelector('.popup__type').textContent = card.offer.type;
    template.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    template.querySelector('.popup__features').textContent = card.offer.features.join(', ');
    template.querySelector('.popup__description').textContent = card.offer.description;
    template.querySelector('.popup__photos').textContent = '';
    template.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    card.offer.photos.forEach(function (photo) {
      var image = document.createElement('img');
      image.setAttribute('src', photo);

      template.querySelector('.popup__photos').appendChild(image);
    });

    return fragment.appendChild(template);
  }


  window.fragments = {
    mapPinsFragment: mapPinsFragment,
    cardFragment: cardFragment
  };

  // ...

})();
