'use strict';

(function () {

  var mapNode = window.util.mapNode;
  var mapPinsWrap = mapNode.querySelector('.map__pins');
  var mapFiltersWrap = window.util.mapNode.querySelector('.map__filters-container');
  var cards = window.generateCard(12);

  /**
   * Handler for close card popup
   * @private
   */
  function __closeMapCardHandler() {
    document.querySelector('.map__card').remove();
  }


  /**
   * Toggle for show popup card
   */
  function togglePopupCardOrder() {
    var mapPins = mapNode.querySelectorAll('.map__pin');

    mapPins.forEach(function (pin) {

      if (!pin.classList.contains('map__pin--main')) {
        pin.addEventListener('click', function () {

          var mapCard = document.querySelector('.map__card');
          if (mapCard) {
            document.querySelector('.popup__close').removeEventListener('click', __closeMapCardHandler);
            __closeMapCardHandler();
          }

          var pinTitle = pin.querySelector('img').getAttribute('alt');

          for (var i = 0; i < cards.length; i++) {
            if (pinTitle === cards[i].offer.title) {
              mapFiltersWrap.insertAdjacentElement('beforebegin', window.fragments.cardFragment(cards[i]));
            }
          }
          document.querySelector('.popup__close').addEventListener('click', __closeMapCardHandler);
        });
      }
    });
  }

  /**
   * Event close card__popup by esc button
   */
  addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.escBtnKey && document.querySelector('.map__card')) {
      __closeMapCardHandler();
    }
  });

  /**
   * Render map pins fragment
   */
  function renderMapPins() {
    mapPinsWrap.appendChild(window.fragments.mapPinsFragment(cards));
  }


  window.map = {
    togglePopupCardOrder: togglePopupCardOrder,
    renderMapPins: renderMapPins
  };

  // ...

})();
