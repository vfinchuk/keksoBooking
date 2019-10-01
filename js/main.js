'use strict';

var mapNode = window.util.mapNode;
var formNode = window.util.formNode;
var filtersNode = window.util.filtersNode;

var mapPinMain = mapNode.querySelector('.map__pin--main');

/**
 * Do disable state on site map, card-form and map-filters from
 */
function disabledPageStateHandler() {
  mapNode.classList.add('map--faded');
  formNode.querySelector('.ad-form').classList.add('ad-form--disabled');

  var formFields = formNode.querySelectorAll('input, select, textarea');
  var filterFields = formNode.querySelectorAll('input, select');

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
  mapNode.classList.remove('map--faded');
  formNode.querySelector('.ad-form').classList.remove('ad-form--disabled');

  var formFields = formNode.querySelectorAll('input, select, textarea');
  var filterFields = filtersNode.querySelectorAll('input, select');

  formFields.forEach(function (el) {
    el.removeAttribute('disabled');
  });
  filterFields.forEach(function (el) {
    el.removeAttribute('disabled');
  });
}


disabledPageStateHandler();

mapPinMain.addEventListener('mousedown', function () {
  /* activate page */
  activePageStateHandler();

  /* card form */
  window.cardForm.setFormAddressHandler(mapPinMain);

  /* map pin */
  window.map.renderMapPins();
  window.map.togglePopupCardOrder();
});


addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ENTER_BTN) {
    activePageStateHandler();
  }
});

