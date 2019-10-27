'use strict';

(function () {

  var filtersForm = document.querySelector('.map__filters');

  // var pins = [];


  window.filter = {
    // copyData: function (data) {
    //   pins = data.slice();
    // },

    enable: function () {
      filtersForm.classList.remove('map__filters--disabled');
      filtersForm.querySelector('fieldset').disabled = false;

      var selects = filtersForm.querySelectorAll('select');

      selects.forEach(function (select) {
        select.disabled = false;
      });
    },

    disable: function () {
      filtersForm.classList.add('map__filters--disabled');
      filtersForm.querySelector('fieldset').disabled = true;

      var selects = filtersForm.querySelectorAll('select');

      selects.forEach(function (select) {
        select.disabled = true;
      });
    }
  };


})();
