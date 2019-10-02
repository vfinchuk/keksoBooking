'use strict';

(function () {

  var formNode = window.util.formNode;
  var roomsSelect = formNode.querySelector('select[name="rooms"]');
  var capacitySelect = formNode.querySelector('select[name="capacity"]');
  var titleInput = formNode.querySelector('input[name="title"]');
  var priceInput = formNode.querySelector('input[name="price"]');
  var typeApartmentSelect = formNode.querySelector('select[name="type"]');
  var checkInSelect = formNode.querySelector('select[name="timein"]');
  var checkOutSelect = formNode.querySelector('select[name="timeout"]');


  var timeout = null;

  function __setTimeoutInputHandler(evt, callback) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      callback(evt, evt.target);
    }, 250);
  }

  function __setSelectedOption(selectNode, optionVal) {
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
  function __validateRoomsAndCapacityHandler(roomsNode, capacityNode) {
    var rooms = parseInt(roomsNode.options[roomsNode.selectedIndex].value, 10);
    var guests = parseInt(capacityNode.options[capacityNode.selectedIndex].value, 10);

    if (rooms !== guests) {
      var roomsErrorText = rooms < guests ? 'Комнат меньше чем гостей' : 'Комнат больше чем гостей';
      var capacityErrorText = rooms < guests ? 'Гостей больше чем комнат' : 'Гостей меньше чем комнат';

      roomsNode.setCustomValidity(roomsErrorText);
      capacityNode.setCustomValidity(capacityErrorText);
      roomsNode.style.backgroundColor = window.util.formInvalidColor;
      capacityNode.style.backgroundColor = window.util.formInvalidColor;

    } else {

      roomsNode.setCustomValidity('');
      capacityNode.setCustomValidity('');
      roomsNode.style.backgroundColor = window.util.formValidColor;
      capacityNode.style.backgroundColor = window.util.formValidColor;
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
  function __validateTitle(evt, titleNode) {
    var titleLength = evt.target.value.length;

    if (titleLength === 0) {
      titleNode.setCustomValidity('Поле обязательное для заполнения');
      titleNode.style.backgroundColor = window.util.formInvalidColor;
    } else if (titleLength > 100) {
      titleNode.setCustomValidity('Заголовок обьявления слишком длинный');
      titleNode.style.backgroundColor = window.util.formInvalidColor;
    } else if (titleLength < 30) {
      titleNode.setCustomValidity('Заголовок обьявления слишком короткий');
      titleNode.style.backgroundColor = window.util.formInvalidColor;
    } else {
      titleNode.setCustomValidity('');
      titleNode.style.backgroundColor = window.util.formValidColor;
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
  function __validatePrice(evt, priceNode) {
    var price = parseInt(evt.target.value, 10);

    if (price > 1000000) {
      priceNode.setCustomValidity('Вы привысили максимальное значение 1.000.000');
      priceNode.style.backgroundColor = window.util.formInvalidColor;
    } else if (price <= 0) {
      priceNode.setCustomValidity('Минимальная цена не божет быть меньше 1');
      priceNode.style.backgroundColor = window.util.formInvalidColor;
    } else {
      priceNode.setCustomValidity('');
      priceNode.style.backgroundColor = window.util.formValidColor;
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
  function __validateTypeApartment(price, typeNode) {

    switch (true) {
      case price >= 0 && price < 1000:
        __setSelectedOption(typeNode, 'bungalo');
        typeNode.style.backgroundColor = window.util.formValidColor;
        break;
      case price >= 1000 && price < 5000:
        __setSelectedOption(typeNode, 'flat');
        typeNode.style.backgroundColor = window.util.formValidColor;
        break;
      case price >= 5000 && price < 10000:
        __setSelectedOption(typeNode, 'house');
        typeNode.style.backgroundColor = window.util.formValidColor;
        break;
      case price >= 10000:
        __setSelectedOption(typeNode, 'palace');
        typeNode.style.backgroundColor = window.util.formValidColor;
        break;
    }

    if (!price) {
      typeNode.style.backgroundColor = window.util.formInvalidColor;
    }

    return false;
  }

  /**
   * Include X Y coordinate mapPin in address input field
   * @param {node} el event target element
   */
  function setFormAddressHandler(el) {
    var locX = parseInt(el.offsetLeft + (el.clientWidth / 2), 10);
    var locY = parseInt(el.offsetTop + el.clientHeight, 10);

    formNode.querySelector('input[name="address"]').value = locX + ' ' + locY;
  }


  /* Validate rooms and guests amount */
  roomsSelect.addEventListener('change', function () {
    __validateRoomsAndCapacityHandler(roomsSelect, capacitySelect);
  });

  capacitySelect.addEventListener('change', function () {
    __validateRoomsAndCapacityHandler(roomsSelect, capacitySelect);
  });

  /* Validate title */
  titleInput.addEventListener('input', function (evt) {
    __setTimeoutInputHandler(evt, __validateTitle);
  });

  /* Validate price and type apartment*/
  priceInput.addEventListener('input', function (evt) {
    var price = __validatePrice(evt, priceInput);
    __setTimeoutInputHandler(evt, __validatePrice);
    __validateTypeApartment(price, typeApartmentSelect);
  });

  /* Validate checkIn and checkOut selects */
  checkInSelect.addEventListener('change', function (evt) {
    __setSelectedOption(checkOutSelect, evt.target.value);
    evt.target.style.backgroundColor = window.util.formValidColor;
    checkOutSelect.style.backgroundColor = window.util.formValidColor;
  });

  checkOutSelect.addEventListener('change', function (evt) {
    __setSelectedOption(checkInSelect, evt.target.value);
    evt.target.style.backgroundColor = window.util.formValidColor;
    checkInSelect.style.backgroundColor = window.util.formValidColor;
  });


  window.cardForm = {
    setFormAddressHandler: setFormAddressHandler
  };

  // ...

})();


