'use strict';

(function () {

  // var MAP = window.util.BOOK_MAP;
  // var FORM = window.util.BOOK_FORM;
  // var FILTERS = window.util.BOOK_FILTERS;

  var mapFiltersWrap = window.util.BOOK_MAP.querySelector('.map__filters-container');
  var cards = window.generateCard(12);

  mapFiltersWrap.insertAdjacentElement('beforebegin', window.fragments.cardFragment(cards[2]));


  /**
   * Handler for close card popup
   * @private
   */
  function __closeMapCardHandler() {
    document.querySelector('.map__card').remove();
  }


  addEventListener('DOMContentLoaded', function () {

    var mapCardCloseBtn = document.querySelector('.popup__close');
    mapCardCloseBtn.addEventListener('click', __closeMapCardHandler);
  });


  // ...

})();
