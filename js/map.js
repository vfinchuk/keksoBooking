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
  };

  /**
   * Error handler for map init
   * @param {string} errorMessage
   */
  var errorHandler = function (errorMessage) {
    window.utils.errorMessage(errorMessage, function () {
      window.utils.removeErrorMessage();
      window.data.download(successHandler, errorHandler);
    });
  };

  window.map = {
    isActive: false,
    /**
     * Enable map
     */
    enable: function () {
      window.map.isActive = true;
      map.classList.remove('map--faded');
      window.filter.enable();
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
