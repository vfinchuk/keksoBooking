'use strict';

(function () {

  var RENDER_PINS_AMOUNT = 2;

  var mapElement = window.map.mapElement;
  var formElement = window.form.formElement;

  var mainWrapElement = document.querySelector('main');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var filtersWrapElement = window.filter.filtersWrapElement;

  /**
   * Rendering error massage
   * @param {string} massage - error massage
   */
  function errorMassage(massage) {
    var errorElement = document.querySelector('main').appendChild(window.util.massages.error(massage));
    var retryButton = errorElement.querySelector('.error__button');

    function retryButtonClickHandler() {
      resetApp();
      errorElement.remove();
      retryButton.removeEventListener('click', retryButtonClickHandler);
    }

    retryButton.addEventListener('click', retryButtonClickHandler);
  }

  /**
   * Rendering success massage
   * @param {string} massage - error massage
   */
  function successMassage(massage) {
    var successElement = mainWrapElement.appendChild(window.util.massages.success(massage));

    function successElementClickHandler() {
      resetApp();
      successElement.remove();
      successElement.removeEventListener('click', successElementClickHandler);
    }

    successElement.addEventListener('click', successElementClickHandler);
  }

  /**
   * Toggle page state function
   * @param {string} state - 'enable' or 'disable'
   */
  function togglePageState(state) {
    var formFields = formElement.querySelectorAll('input, select, textarea, button');
    var filterFields = filtersWrapElement.querySelectorAll('input, select');

    if (state === 'disable') {
      mapElement.classList.add('map--faded');
      formElement.querySelector('.ad-form').classList.add('ad-form--disabled');

      formFields.forEach(function (el) {
        el.setAttribute('disabled', '');
      });
      filterFields.forEach(function (el) {
        el.setAttribute('disabled', '');
      });

    } else if (state === 'enable') {

      mapElement.classList.remove('map--faded');
      formElement.querySelector('.ad-form').classList.remove('ad-form--disabled');

      formFields.forEach(function (el) {
        el.removeAttribute('disabled');
      });
      filterFields.forEach(function (el) {
        el.removeAttribute('disabled');
      });
    }
  }


  /**
   * Data success callback
   * @param {data} data
   */
  function dataSuccessCallback(data) {
    var filterData = data;

    data = window.filter.pinsAmountFilter(data, RENDER_PINS_AMOUNT);

    mapPinMainElement.addEventListener('mousedown', function () {
      mapPinMainElementMouseMoveHandler(data);
    }, {once: true});

    // Filter event listeners
    window.filter.housingTypeFilterListener(filterData);
  }

  /**
   * Data error callback123123
   * @param {string} massage - error massage
   */
  function dataErrorCallback(massage) {
    errorMassage(massage);
  }

  /**
   * Reset application callback
   */
  function resetApp() {
    window.form.resetForm();
    window.map.resetMap();
    togglePageState('disable');

    window.data.download(dataSuccessCallback, dataErrorCallback);
  }


  /**
   * Main map pin mouse move handler
   * @param {data} data
   */
  function mapPinMainElementMouseMoveHandler(data) {
    togglePageState('enable');

    window.map.renderPins(data);
    window.card.togglePopupCard(data);
    window.form.setFormInputAddress();
  }


  /* =============Rendering============= */

  /* START */
  togglePageState('disable');

  window.data.download(dataSuccessCallback, dataErrorCallback);

  window.map.movingElementOnMap(mapPinMainElement);


  addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.BUTTON_KEY.ENTER) {
      window.data.download(dataSuccessCallback, dataErrorCallback);
    }
  });


  /**
   * Send form success callback
   */
  function dataSendSuccessCallback() {
    successMassage('Заказ отправлен!');
  }

  /**
   * Send form error callback
   * @param {string} massage - error massage
   */
  function dataSendErrorCallback(massage) {
    errorMassage(massage);
  }


  function formSubmitHandler(evt) {
    evt.preventDefault();
    var formData = new FormData(formElement.querySelector('form'));
    window.data.upload(formData, dataSendSuccessCallback, dataSendErrorCallback);
    formElement.removeEventListener('submit', formSubmitHandler);
  }

  formElement.addEventListener('submit', function (evt) {
    formSubmitHandler(evt);
  });


  window.render = {
    RENDER_PINS_AMOUNT: RENDER_PINS_AMOUNT,
    filtersWrapElement: filtersWrapElement
  };

  // ***

})();
