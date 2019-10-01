'use strict';

(function () {

  var formNode = window.util.formNode;

  var roomsSelect = formNode.querySelector('select[name="rooms"]');
  var capacitySelect = formNode.querySelector('select[name="capacity"]');

  /**
   * Validate amount rooms and guests
   * @param {node} roomsEl rooms select from form
   * @param {node} capacityEl capacity select from form
   */
  function __validateRoomsAndCapacitySelect(roomsEl, capacityEl) {
    var rooms = parseInt(roomsEl.options[roomsEl.selectedIndex].value, 10);
    var guests = parseInt(capacityEl.options[capacityEl.selectedIndex].value, 10);

    if (rooms !== guests) {
      var roomsErrorText = rooms < guests ? 'Комнат меньше чем гостей' : 'Комнат больше чем гостей';
      var capacityErrorText = rooms < guests ? 'Гостей больше чем комнат' : 'Гостей меньше чем комнат';

      roomsEl.setCustomValidity(roomsErrorText);
      capacityEl.setCustomValidity(capacityErrorText);

    } else {

      roomsEl.setCustomValidity('');
      capacityEl.setCustomValidity('');

    }
  }

  // function __validateTitle() {
  //
  // };

  // function __validatePriceByNight() {
  //
  // };
  //
  // function __validateCheckInCheckOut() {
  //
  // };


  /**
   * Include X Y coordinate mapPin in address input field
   * @param {node} el event target element
   */
  function setFormAddressHandler(el) {
    var locX = parseInt(el.offsetLeft + (el.clientWidth / 2), 10);
    var locY = parseInt(el.offsetTop + el.clientHeight, 10);

    formNode.querySelector('input[name="address"]').value = locX + ' ' + locY;
  }


  /* Validation rooms and guests amount */
  roomsSelect.addEventListener('change', function () {
    __validateRoomsAndCapacitySelect(roomsSelect, capacitySelect);
  });

  capacitySelect.addEventListener('change', function () {
    __validateRoomsAndCapacitySelect(roomsSelect, capacitySelect);
  });


  window.cardForm = {
    setFormAddressHandler: setFormAddressHandler
  };

  // ...
})();
