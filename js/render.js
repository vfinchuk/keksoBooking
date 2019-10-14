'use strict';

(function () {

  var mainNode = window.util.mainNode;
  var mapNode = window.util.mapNode;
  var formNode = window.util.formNode;
  var filtersNode = window.util.filtersNode;

  var mapPinMain = mapNode.querySelector('.map__pin--main');

  /**
   * Do disable state on site map, card-form and map-filters from
   */
  var disabledPage = function () {
    mapNode.classList.add('map--faded');
    formNode.querySelector('.ad-form').classList.add('ad-form--disabled');

    var formFields = formNode.querySelectorAll('input, select, textarea, button');
    var filterFields = formNode.querySelectorAll('input, select');

    formFields.forEach(function (el) {
      el.setAttribute('disabled', '');
    });
    filterFields.forEach(function (el) {
      el.setAttribute('disabled', '');
    });
  };

  /**
   * Do active state on site map, card-form and map-filters from
   */
  var enableApp = function () {
    mapNode.classList.remove('map--faded');
    formNode.querySelector('.ad-form').classList.remove('ad-form--disabled');

    var formFields = formNode.querySelectorAll('input, select, textarea, button');
    var filterFields = filtersNode.querySelectorAll('input, select');

    formFields.forEach(function (el) {
      el.removeAttribute('disabled');
    });
    filterFields.forEach(function (el) {
      el.removeAttribute('disabled');
    });
  };


  /**
   * Map pins rendering
   * @param {data} data
   */
  var renderPins = function (data) {
    window.keksMap.renderPins(data);
    window.card.togglePopupCard(data);
  };

  /**
   * Add and update address in form input when mapPin move.
   */
  var setFormInputAddress = function () {
    window.form.setFormAddressHandler(mapPinMain);

    /* update form address if mapPinMain on move */
    mapPinMain.addEventListener('mousedown', function () {
      window.form.setFormAddressHandler(mapPinMain);
      mapPinMain.addEventListener('mousemove', function () {
        window.form.setFormAddressHandler(mapPinMain);
      });
    });
  };

  /**
   * Rendering error massage
   * @param {string} error - error massage
   */
  var renderErrorMassage = function (error) {
    var errorNode = document.querySelector('main').appendChild(window.util.massages.error(error));
    var tryBtn = errorNode.querySelector('.error__button');

    tryBtn.addEventListener('click', function () {
      resetAppHandler();
      errorNode.remove();
    });
  };

  /**
   * Rendering success massage
   * @param {string} massage - error massage
   */
  var renderSuccessMassage = function (massage) {
    var successNode = mainNode.appendChild(window.util.massages.success(massage));

    successNode.addEventListener('click', function () {
      resetAppHandler();
      successNode.remove();
    });
  };


  /**
   * Data load function
   * @param {callback} onSuccess
   * @param {callback} onError
   */
  var dataLoad = function (onSuccess, onError) {
    window.util.data.download(
        window.util.locations.ordersData,
        onSuccess,
        onError
    );
  };

  var formDataSend = function (data, onSuccess, onError) {
    window.util.data.upload(
        window.util.locations.cardFromPath,
        data,
        onSuccess,
        onError
    );
  };

  /* =============handlers============= */


  var startAppHandler = function () {
    var successHandler = function (data) {
      enableApp();
      renderPins(data);
      setFormInputAddress();
    };
    var errorHandler = function (massage) {
      renderErrorMassage(massage);
    };

    dataLoad(successHandler, errorHandler);
  };

  var resetAppHandler = function () {
    window.form.resetFormHandler();
    window.keksMap.resetMapHandler();
    disabledPage();
    startApp();
  };


  var sendFormHandler = function (data) {
    var successHandler = function (data) {
      renderSuccessMassage('Заказ отправлен!');
    };

    var errorHandler = function (massage) {
      renderErrorMassage(massage);
    };

    formDataSend(data, successHandler, errorHandler);
  };

  var startApp = function () {
    mapPinMain.addEventListener('mousedown', function () {
      startAppHandler();
    }, {once: true});
  };

  /* =============Rendering============= */


  /* START */
  startApp();
  disabledPage();
  window.keksMap.movingElementOnMap(mapPinMain); // Moving event listener


  addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterBtnKey) {
      startAppHandler();
    }
  });

  /**
   * Send order form handler
   */
  formNode.addEventListener('submit', function (evt) {
    evt.preventDefault();
    sendFormHandler(new FormData(formNode.querySelector('form')));
  });


  // ***

})();
