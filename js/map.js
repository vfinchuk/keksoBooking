'use strict';

(function () {

  var map = document.querySelector('.map');

  /**
   * Success handler for map init
   * @param {data} data
   */
  var successHandler = function (data) {
    window.filter.copyData(data);
    window.pins.render(data);
    window.filter.enable();
  };

  /**
   * Error handler for map init
   * @param {string} errorMessage
   */
  var errorHandler = function (errorMessage) {
    var errorMessageElement = window.utils.getErrorMessage(errorMessage);

    var errorMessageMouseHandler = function () {
      window.utils.removeErrorMessage();
      window.data.download(successHandler, errorHandler);

      errorMessageElement.removeEventListener('click', errorMessageMouseHandler);
      errorMessageButton.removeEventListener('click', errorMessageMouseHandler);
      window.removeEventListener('keydown', errorMessageKeyDownHandler);
    };

    var errorMessageKeyDownHandler = function (evt) {
      window.utils.escPressHandler(evt, function () {
        window.utils.removeErrorMessage();
        window.data.download(successHandler, errorHandler);

        window.removeEventListener('keydown', errorMessageKeyDownHandler);
      });
    };

    if (errorMessageElement) {
      var errorMessageButton = errorMessageElement.querySelector('.error__button');
      errorMessageElement.addEventListener('click', errorMessageMouseHandler);
      errorMessageButton.addEventListener('click', errorMessageMouseHandler);
      window.addEventListener('keydown', errorMessageKeyDownHandler);
    }
  };

  window.map = {
    isActive: false,
    /**
     * Enable map
     */
    enable: function () {
      window.map.isActive = true;
      map.classList.remove('map--faded');
    },
    /**
     * Disable map
     */
    disable: function () {
      window.map.isActive = false;
      map.classList.add('map--faded');
      window.filter.disable();
      window.popup.remove();
      window.pins.remove();
      window.mainPin.setDefault();
    },
    /**
     * Init map
     */
    init: function () {
      window.map.enable();
      window.form.enable();
      window.data.download(successHandler, errorHandler);
    }
  };

})();
