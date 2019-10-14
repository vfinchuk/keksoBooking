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

    var formFields = formNode.querySelectorAll('input, select, textarea');
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

    var formFields = formNode.querySelectorAll('input, select, textarea');
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
    document.querySelector('main').appendChild(window.util.massages.error(error));
    var el = document.querySelector('.error__button');

    el.addEventListener('click', function () {
      resetAppHandler();
      document.querySelector('.error').remove();
    });
  };

  /**
   * Rendering success massage
   * @param {string} massage - error massage
   */
  var renderSuccessMassage = function (massage) {
    var massageNode = window.util.massages.success(massage);
    mainNode.appendChild(massageNode);
    var el = document.querySelector('.success');

    el.addEventListener('click', function () {
      resetAppHandler();
      el.remove();
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
    var dataSuccessHandler = function (data) {
      enableApp();
      renderPins(data);
      setFormInputAddress();
    };
    var dataErrorHandler = function (massage) {
      renderErrorMassage(massage);
    };

    dataLoad(dataSuccessHandler, dataErrorHandler);
  };

  var resetAppHandler = function () {
    disabledPage();
    formNode.querySelector('form').reset();
    window.keksMap.removePinsHandler();
    startApp();
  };


  var sendFormHandler = function (data) {
    var sendSuccessHandler = function (data) {
      renderSuccessMassage('Заказ отправлен!1');
    };

    var sendErrorHandler = function (massage) {
      renderErrorMassage(massage);
    };

    formDataSend(data, sendSuccessHandler, sendErrorHandler);
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

  /**
   * First click on Main
   */
  mapPinMain.addEventListener('mousedown', function () {
    startApp();
  }, {once: true});


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

  window.render = {


  };

})();
