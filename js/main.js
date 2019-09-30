'use strict';

var MAP = window.util.BOOK_MAP;
var FORM = window.util.BOOK_FORM;
var FILTERS = window.util.BOOK_FILTERS;

var mapPinsWrap = MAP.querySelector('.map__pins');
var mapPinMain = MAP.querySelector('.map__pin--main');

var cards = window.generateCard(12);

/**
 * Do disable state on site map, card-form and map-filters from
 */
function disabledPageStateHandler() {
  MAP.classList.add('map--faded');
  FORM.querySelector('.ad-form').classList.add('ad-form--disabled');

  var formFields = FORM.querySelectorAll('input, select, textarea');
  var filterFields = FILTERS.querySelectorAll('input, select');

  formFields.forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });
  filterFields.forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });
}

/**
 * Do active state on site map, card-form and map-filters from
 */
function activePageStateHandler() {
  MAP.classList.remove('map--faded');
  FORM.querySelector('.ad-form').classList.remove('ad-form--disabled');

  var formFields = FORM.querySelectorAll('input, select, textarea');
  var filterFields = FILTERS.querySelectorAll('input, select');

  formFields.forEach(function (el) {
    el.removeAttribute('disabled');
  });
  filterFields.forEach(function (el) {
    el.removeAttribute('disabled');
  });
}


/* Activate page */
addEventListener('DOMContentLoaded', disabledPageStateHandler);

mapPinMain.addEventListener('mousedown', function () {

  activePageStateHandler();
  removeEventListener('DOMContentLoaded', disabledPageStateHandler);

  mapPinsWrap.appendChild(window.fragments.mapPinsFragment(cards));

  window.cardForm.setFormAddressHandler(mapPinMain);
});


addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activePageStateHandler();
    removeEventListener('DOMContentLoaded', disabledPageStateHandler);

    mapPinsWrap.appendChild(window.fragments.mapPinsFragment(cards));
  }
});

