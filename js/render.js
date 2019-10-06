'use strict';

(function () {

  var ordersData = 'https://js.dump.academy/keksobooking/data';

  var mapNode = window.util.mapNode;
  var formNode = window.util.formNode;
  var filtersNode = window.util.filtersNode;

  var mapPinsWrap = mapNode.querySelector('.map__pins');
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
      el.setAttribute('disabled', '');
    });
    filterFields.forEach(function (el) {
      el.setAttribute('disabled', '');
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

  function reloadPageHandler() {
    document.querySelector('.error__button').addEventListener('click', function () {
      window.location.reload();
    });
  }

  disabledPageStateHandler();

  function ordersDataSuccessHandler(data) {
    /* activate page */
    activePageStateHandler();
    /* card form */
    window.form.setFormAddressHandler(mapPinMain);
    /* map pin */
    mapPinsWrap.appendChild(window.pin.mapPinsFragment(data));
    /* map card */
    window.card.togglePopupCard(data);
    /* update form address if mapPinMain on move */
    mapPinMain.addEventListener('mousedown', function () {
      window.form.setFormAddressHandler(mapPinMain);
      mapPinMain.addEventListener('mousemove', function () {
        window.form.setFormAddressHandler(mapPinMain);
      });
    });
  }


  function ordersDataErrorHandler(error) {
    document.querySelector('main').appendChild(window.util.fragments.errorMassage(error));
    reloadPageHandler();
  }


  mapPinMain.addEventListener('mousedown', function () {

    window.dataLoad(ordersData, ordersDataSuccessHandler, ordersDataErrorHandler);

  }, {once: true});


  addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterBtnKey) {
      window.dataLoad(ordersData, ordersDataSuccessHandler, ordersDataErrorHandler);
    }
  });

})();
