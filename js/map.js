'use strict';

(function () {

  var map = document.querySelector('.map');

  var successHandler = function (data) {
    window.filter.copyData(data);
    window.pins.render(data);
  };

  var errorHandler = function (errorMassage) {
    window.utils.errorMassage(errorMassage, function () {
      window.utils.removeErrorMassage();
      window.data.download(successHandler, errorHandler);
    });
  };

  window.map = {
    isActive: false,
    enable: function () {
      window.map.isActive = true;
      map.classList.remove('map--faded');
      window.filter.enable();
    },

    disable: function () {
      window.map.isActive = false;
      map.classList.add('map--faded');
      window.filter.disable();
      window.popup.remove();
      window.pins.remove();
      window.mainPin.setDefault();
    },

    init: function () {
      window.map.enable();
      window.form.enable();
      window.data.download(successHandler, errorHandler);
    }
  };

})();
