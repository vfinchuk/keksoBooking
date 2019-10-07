'use strict';

(function () {

  var mapNode = window.util.mapNode;
  var mapFiltersWrap = window.util.mapNode.querySelector('.map__filters-container');

  /**
   * Build card fragment
   * @param {object} card - card object
   * @return {Node} - card__popup fragment
   */
  function __cardFragment(card) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#card').content.querySelector('.map__card');

    template = template.cloneNode(true);

    template.querySelector('.popup__title').textContent = card.offer.title;
    template.querySelector('.popup__text--address').textContent = card.offer.address;
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

  /**
   * Handler for close card popup
   * @private
   */
  function closePopupCard() {
    document.querySelector('.map__card').remove();
  }

  /**
   * Toggle for show popup card
   * @param {array} cards - card objects array
   */
  function togglePopupCard(cards) {
    var mapPins = mapNode.querySelectorAll('.map__pin');

    mapPins.forEach(function (pin) {

      if (!pin.classList.contains('map__pin--main')) {
        pin.addEventListener('click', function () {

          var mapCard = document.querySelector('.map__card');
          if (mapCard) {
            document.querySelector('.popup__close').removeEventListener('click', closePopupCard);
            closePopupCard();
          }

          var pinTitle = pin.querySelector('img').getAttribute('alt');

          for (var i = 0; i < cards.length; i++) {
            if (pinTitle === cards[i].offer.title) {
              mapFiltersWrap.insertAdjacentElement('beforebegin', __cardFragment(cards[i]));
            }
          }
          document.querySelector('.popup__close').addEventListener('click', closePopupCard);
        });
      }
    });
  }


  window.card = {
    closePopupCard: closePopupCard,
    togglePopupCard: togglePopupCard
  };

  // ...

})();
