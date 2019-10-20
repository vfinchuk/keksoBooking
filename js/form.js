'use strict';

(function () {


  var FIELD_BG_COLOR = {
    DEFAULT: 'rgba(255, 255, 2555, 1)',
    INVALID: 'rgba(255, 0, 0, 0.2)',
    VALID: 'rgba(0, 255, 0, 0.2)'
  };

  var formElement = document.querySelector('.notice');
  var mapPinMainElement = window.map.mapElement.querySelector('.map__pin--main');

  var roomsSelect = formElement.querySelector('select[name="rooms"]');
  var capacitySelect = formElement.querySelector('select[name="capacity"]');
  var titleInput = formElement.querySelector('input[name="title"]');
  var priceInput = formElement.querySelector('input[name="price"]');
  var typeApartmentSelect = formElement.querySelector('select[name="type"]');
  var checkInSelect = formElement.querySelector('select[name="timein"]');
  var checkOutSelect = formElement.querySelector('select[name="timeout"]');

  var timeout = null;
  var CB_DELAY = 250;

  function setTimeoutEventCallback(evt, callback) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      callback(evt, evt.target);
    }, CB_DELAY);
  }

  function setSelectedOption(selectNode, optionVal) {
    selectNode.querySelectorAll('option').forEach(function (el) {
      el.removeAttribute('selected');
      if (el.getAttribute('value') === optionVal) {
        el.setAttribute('selected', '');
      }
    });
  }

  /**
   * Validate amount rooms and guests
   * @param {node} roomsNode - rooms select from form
   * @param {node} capacityNode - capacity select from form
   * @return {boolean} true | false
   * @private
   */
  function validateRoomsAndCapacityHandler(roomsNode, capacityNode) {
    var rooms = parseInt(roomsNode.options[roomsNode.selectedIndex].value, 10);
    var guests = parseInt(capacityNode.options[capacityNode.selectedIndex].value, 10);

    if (rooms !== guests) {
      var roomsErrorText = rooms < guests ? 'Комнат меньше чем гостей' : 'Комнат больше чем гостей';
      var capacityErrorText = rooms < guests ? 'Гостей больше чем комнат' : 'Гостей меньше чем комнат';

      roomsNode.setCustomValidity(roomsErrorText);
      capacityNode.setCustomValidity(capacityErrorText);
      roomsNode.style.backgroundColor = FIELD_BG_COLOR.INVALID;
      capacityNode.style.backgroundColor = FIELD_BG_COLOR.INVALID;

    } else {

      roomsNode.setCustomValidity('');
      capacityNode.setCustomValidity('');
      roomsNode.style.backgroundColor = FIELD_BG_COLOR.VALID;
      capacityNode.style.backgroundColor = FIELD_BG_COLOR.VALID;
      return true;
    }

    return false;
  }

  /**
   * Validate order title input
   * @param {node} evt - input event
   * @param {node} titleNode - form title input
   * @return {boolean}
   * @private
   */
  function validateTitle(evt, titleNode) {
    var titleLength = evt.target.value.length;

    if (titleLength === 0) {
      titleNode.setCustomValidity('Поле обязательное для заполнения');
      titleNode.style.backgroundColor = FIELD_BG_COLOR.INVALID;
    } else if (titleLength > 100) {
      titleNode.setCustomValidity('Заголовок обьявления слишком длинный');
      titleNode.style.backgroundColor = FIELD_BG_COLOR.INVALID;
    } else if (titleLength < 30) {
      titleNode.setCustomValidity('Заголовок обьявления слишком короткий');
      titleNode.style.backgroundColor = FIELD_BG_COLOR.INVALID;
    } else {
      titleNode.setCustomValidity('');
      titleNode.style.backgroundColor = FIELD_BG_COLOR.VALID;
      return true;
    }

    return false;
  }

  /**
   * Validate order price input
   * @param {node} evt - input event
   * @param {node} priceNode - form price input
   * @return {*} if price available return price sum or false
   * @private
   */
  function validatePrice(evt, priceNode) {
    var price = parseInt(evt.target.value, 10);

    if (price > 1000000) {
      priceNode.setCustomValidity('Вы привысили максимальное значение 1.000.000');
      priceNode.style.backgroundColor = FIELD_BG_COLOR.INVALID;
    } else if (price <= 0) {
      priceNode.setCustomValidity('Минимальная цена не божет быть меньше 1');
      priceNode.style.backgroundColor = FIELD_BG_COLOR.INVALID;
    } else {
      priceNode.setCustomValidity('');
      priceNode.style.backgroundColor = FIELD_BG_COLOR.VALID;
      return price;
    }
    return false;
  }

  /**
   * Validate type apartment select
   * @param {int} price - price by night
   * @param {node} typeNode - apartment type select
   * @return {boolean}
   * @private
   */
  function validateTypeApartment(price, typeNode) {

    switch (true) {
      case price >= 0 && price < 1000:
        setSelectedOption(typeNode, 'bungalo');
        typeNode.style.backgroundColor = FIELD_BG_COLOR.VALID;
        break;
      case price >= 1000 && price < 5000:
        setSelectedOption(typeNode, 'flat');
        typeNode.style.backgroundColor = FIELD_BG_COLOR.VALID;
        break;
      case price >= 5000 && price < 10000:
        setSelectedOption(typeNode, 'house');
        typeNode.style.backgroundColor = FIELD_BG_COLOR.VALID;
        break;
      case price >= 10000:
        setSelectedOption(typeNode, 'palace');
        typeNode.style.backgroundColor = FIELD_BG_COLOR.VALID;
        break;
    }

    if (!price) {
      typeNode.style.backgroundColor = FIELD_BG_COLOR.INVALID;
    }

    return false;
  }

  /**
   * Include X Y coordinate mapPin in address input field
   * @param {node} el event target element
   */
  function setFormAddress(el) {
    var locX = parseInt(el.offsetLeft + (el.clientWidth / 2), 10);
    var locY = parseInt(el.offsetTop + el.clientHeight, 10);

    formElement.querySelector('input[name="address"]').value = locX + ' ' + locY;
  }


  /**
   * Add and update address in form input when mapPin move.
   */
  function setFormInputAddress() {
    window.form.setFormAddress(mapPinMainElement);

    function formAddressMouseMoveHandler() {
      mapPinMainElement.addEventListener('mousedown', function () {
        setFormAddress(mapPinMainElement);
        mapPinMainElement.addEventListener('mousemove', function () {
          setFormAddress(mapPinMainElement);
          mapPinMainElement.removeEventListener('mousemove', formAddressMouseMoveHandler);
        });
        mapPinMainElement.removeEventListener('mousedown', formAddressMouseMoveHandler);
      });
    }

    mapPinMainElement.addEventListener('mousedown', formAddressMouseMoveHandler);
  }

  /**
   * Reset form
   */
  function resetForm() {
    formElement.querySelector('form').reset();
    titleInput.style.backgroundColor = FIELD_BG_COLOR.DEFAULT;
    capacitySelect.style.backgroundColor = FIELD_BG_COLOR.DEFAULT;
    roomsSelect.style.backgroundColor = FIELD_BG_COLOR.DEFAULT;
    typeApartmentSelect.style.backgroundColor = FIELD_BG_COLOR.DEFAULT;
    priceInput.style.backgroundColor = FIELD_BG_COLOR.DEFAULT;
  }


  /* Validate rooms and guests amount */
  roomsSelect.addEventListener('change', function () {
    validateRoomsAndCapacityHandler(roomsSelect, capacitySelect);
  });

  capacitySelect.addEventListener('change', function () {
    validateRoomsAndCapacityHandler(roomsSelect, capacitySelect);
  });

  /* Validate title */
  titleInput.addEventListener('input', function (evt) {
    setTimeoutEventCallback(evt, validateTitle);
  });

  /* Validate price and type apartment*/
  priceInput.addEventListener('input', function (evt) {
    var price = validatePrice(evt, priceInput);
    setTimeoutEventCallback(evt, validatePrice);
    validateTypeApartment(price, typeApartmentSelect);
  });

  /* Validate checkIn and checkOut selects */
  checkInSelect.addEventListener('change', function (evt) {
    setSelectedOption(checkOutSelect, evt.target.value);
    evt.target.style.backgroundColor = FIELD_BG_COLOR.VALID;
    checkOutSelect.style.backgroundColor = FIELD_BG_COLOR.VALID;
  });

  checkOutSelect.addEventListener('change', function (evt) {
    setSelectedOption(checkInSelect, evt.target.value);
    evt.target.style.backgroundColor = FIELD_BG_COLOR.VALID;
    checkInSelect.style.backgroundColor = FIELD_BG_COLOR.VALID;
  });


  window.form = {
    formElement: formElement,

    setFormInputAddress: setFormInputAddress,
    setFormAddress: setFormAddress,
    resetForm: resetForm
  };

  // ...

})();


