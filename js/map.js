'use strict';

(function () {

  var PIN_COORDINATE = {
    DEFAULT: {
      X: 570,
      Y: 375
    },
    Y_DIAPASON: {
      TOP: 130,
      BOTTOM: 630
    }
  };

  var mapElement = document.querySelector('.map');

  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var mapPinsWrapElement = mapElement.querySelector('.map__pins');

  /**
   * Moving element on the map by click
   * @param {node} nodeElement - moving element
   */
  function movingElementOnMap(nodeElement) {
    nodeElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      function mouseMoveHandler(moveEvt) {
        moveEvt.preventDefault();

        var elWidthOffset = nodeElement.clientWidth / 2;
        var elHeightOffset = nodeElement.clientHeight / 2;

        var shift = {
          x: moveEvt.clientX - mapElement.offsetLeft - elWidthOffset,
          y: moveEvt.clientY - mapElement.offsetTop - elHeightOffset
        };

        var mapCoord = {
          left: mapElement.offsetLeft,
          right: mapElement.offsetLeft + mapElement.clientWidth
        };

        /* moving on map by x-coordinate line */
        if ((moveEvt.clientX < mapCoord.left) || (moveEvt.clientX > mapCoord.right)) {
          nodeElement.style.left = mapCoord.left;
        } else {
          nodeElement.style.left = shift.x + 'px';
        }

        /* moving on map by y-coordinate line */
        if ((moveEvt.clientY > PIN_COORDINATE.Y_DIAPASON.TOP) && (moveEvt.clientY < PIN_COORDINATE.Y_DIAPASON.BOTTOM)) {
          nodeElement.style.top = shift.y + window.scrollY + 'px';
        }

      }

      function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      }

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

    });
  }

  function renderPins(data) {
    removePins();
    mapPinsWrapElement.appendChild(window.pin.mapPinsFragment(data));
  }

  /**
   * Remove all order pins from map
   */
  function removePins() {
    var pins = mapElement.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  }

  function resetMap() {
    removePins();

    mapPinMainElement.style.left = PIN_COORDINATE.DEFAULT.X + 'px';
    mapPinMainElement.style.top = PIN_COORDINATE.DEFAULT.Y + 'px';

    var cardPopup = mapElement.querySelector('.map__card');
    if (cardPopup) {
      cardPopup.remove();
    }
  }

  window.map = {
    mapElement: mapElement,

    movingElementOnMap: movingElementOnMap,
    renderPins: renderPins,
    resetMap: resetMap
  };

  // ...

})();
