'use strict';

(function () {

  var price = {
    select: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high'
    },
    value: {
      MIN: 10000,
      MAX: 50000
    }
  };

  var filtersForm = document.querySelector('.map__filters');

  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelector('#housing-features');

  var pinsData = [];


  var checkHousingType = function (pin) {
    return housingType.value === 'any' ? true : housingType.value === pin.offer.type;
  };

  var checkHousingRooms = function (pin) {
    return housingRooms.value === 'any' ? true : parseInt(housingRooms.value, 10) === pin.offer.rooms;
  };

  var checkHousingGuests = function (pin) {
    return housingGuests.value === 'any' ? true : parseInt(housingGuests.value, 10) === pin.offer.guests;
  };

  var checkHousingPrice = function (pin) {
    var offerPrice = pin.offer.price;

    switch (housingPrice.value) {
      case price.select.LOW:
        return offerPrice < price.value.MIN;

      case price.select.MIDDLE:
        return offerPrice >= price.value.MIN && offerPrice <= price.value.MAX;

      case price.select.HIGH:
        return offerPrice > price.value.MAX;

      default:
        return offerPrice;
    }
  };

  var checkHousingFeatures = function (pin) {
    return Array.from(housingFeatures.children)
      .filter(function (featureItem) {
        return featureItem.checked === true;
      })
      .map(function (item) {
        return item.value;
      })
      .every(function (feature) {
        return pin.offer.features.includes(feature);
      });
  };


  filtersForm.addEventListener('change', window.utils.debounce(function () {
    var filterPins = pinsData.filter(function (pin) {
      return (
        checkHousingType(pin) &&
        checkHousingRooms(pin) &&
        checkHousingGuests(pin) &&
        checkHousingPrice(pin) &&
        checkHousingFeatures(pin)
      );
    });
    window.pins.render(filterPins);
  }));


  filtersForm.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, function () {
      var filterPins = pinsData.filter(function (pin) {
        return (
          checkHousingType(pin) &&
          checkHousingRooms(pin) &&
          checkHousingGuests(pin) &&
          checkHousingPrice(pin) &&
          checkHousingFeatures(pin)
        );
      });
      window.pins.render(filterPins);
    });
  });



  window.filter = {
    copyData: function (data) {
      pinsData = data.slice();
    },

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
