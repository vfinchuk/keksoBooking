'use strict';

(function () {

  var Price = {
    SELECT: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high'
    },
    VALUE: {
      MIN: 10000,
      MAX: 50000
    }
  };

  var filtersForm = document.querySelector('.map__filters');

  var filtersFormSelects = filtersForm.querySelectorAll('select');

  var filtersFormFieldset = filtersForm.querySelector('fieldset');


  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelector('#housing-features');

  var pinsData = [];

  /**
   * Check housing type
   * @param {object} pin
   * @return {boolean}
   */
  var checkHousingType = function (pin) {
    return housingType.value === 'any' ? true : housingType.value === pin.offer.type;
  };

  /**
   * Check housing rooms
   * @param {object} pin
   * @return {boolean}
   */
  var checkHousingRooms = function (pin) {
    return housingRooms.value === 'any' ? true : parseInt(housingRooms.value, 10) === pin.offer.rooms;
  };

  /**
   * Check housing guests
   * @param {object} pin
   * @return {boolean}
   */
  var checkHousingGuests = function (pin) {
    return housingGuests.value === 'any' ? true : parseInt(housingGuests.value, 10) === pin.offer.guests;
  };

  /**
   * Check housing price
   * @param {object} pin
   * @return {boolean}
   */
  var checkHousingPrice = function (pin) {
    var offerPrice = pin.offer.price;

    switch (housingPrice.value) {
      case Price.SELECT.LOW:
        return offerPrice < Price.VALUE.MIN;

      case Price.SELECT.MIDDLE:
        return offerPrice >= Price.VALUE.MIN && offerPrice <= Price.VALUE.MAX;

      case Price.SELECT.HIGH:
        return offerPrice > Price.VALUE.MAX;

      default:
        return offerPrice;
    }
  };

  /**
   * Check housing guests
   * @param {object} pin
   * @return {boolean}
   */
  var checkHousingFeatures = function (pin) {
    return Array.from(housingFeatures.children)
      .filter(function (featureItem) {
        return featureItem.checked;
      })
      .map(function (item) {
        return item.value;
      })
      .every(function (feature) {
        return pin.offer.features.includes(feature);
      });
  };

  /**
   * filtered pins
   */
  var renderFilteredPins = function () {
    var pins = pinsData.filter(function (pin) {
      return (
        checkHousingType(pin) &&
        checkHousingRooms(pin) &&
        checkHousingGuests(pin) &&
        checkHousingPrice(pin) &&
        checkHousingFeatures(pin)
      );
    });
    window.pins.render(pins);
  };

  /**
   * Filter form event listener
   */

  var filtersFormChangeHandler = function () {
    renderFilteredPins();
  };

  filtersForm.addEventListener('change', window.utils.debounce(filtersFormChangeHandler));

  /* Filter form event listener */
  var filtersFormEnterKeyHandler = function (evt) {
    window.utils.enterPressHandler(evt, function () {
      renderFilteredPins();
    });
  };

  filtersForm.addEventListener('keydown', filtersFormEnterKeyHandler);


  window.filter = {
    reset: function () {
      filtersForm.reset();
    },
    /**
     * Copy data for filters
     * @param {array} data
     */
    copyData: function (data) {
      pinsData = data.slice();
    },
    /**
     * Enable filter form
     */
    enable: function () {
      filtersForm.classList.remove('map__filters--disabled');
      filtersFormFieldset.disabled = false;

      filtersFormSelects.forEach(function (select) {
        select.disabled = false;
      });
    },
    /**
     * Disable filter form
     */
    disable: function () {
      filtersForm.classList.add('map__filters--disabled');
      filtersFormFieldset.disabled = true;

      filtersFormSelects.forEach(function (select) {
        select.disabled = true;
      });
    }
  };

  /* Disabled form when page render */
  window.filter.disable();

})();
