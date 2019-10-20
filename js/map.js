'use strict';

(function () {


  var MAP_PIN_DEFAULT_COOR = {
    X: 570,
    Y: 375
  };


  var mapElement = document.querySelector('.map');

  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var mapPinsWrapElement = mapElement.querySelector('.map__pins');
  var mapFiltersWrapElement = mapElement.querySelector('.map__filters-container');

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
          left: mapElement.offsetLeft + elWidthOffset,
          right: mapElement.offsetLeft + mapElement.clientWidth - elWidthOffset,
          top: mapElement.offsetTop + elHeightOffset,
          bottom: (mapElement.offsetTop + mapElement.clientHeight) - mapFiltersWrapElement.clientHeight,
        };

        /* moving on map by x-coordinate */
        if ((moveEvt.clientX < mapCoord.left) || (moveEvt.clientX > mapCoord.right)) {
          nodeElement.style.left = mapCoord.left;
        } else {
          nodeElement.style.left = shift.x + 'px';
        }


        /* moving on map by y-coordinate */
        if (moveEvt.clientY < mapCoord.top) {
          nodeElement.style.top = mapElement.offsetTop + window.scrollY + 'px';
        } else if (moveEvt.clientY > mapCoord.bottom - window.scrollY) {
          nodeElement.style.top = mapCoord.bottom - nodeElement.clientHeight + 'px';
        } else {
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

    mapPinMainElement.style.left = MAP_PIN_DEFAULT_COOR.X + 'px';
    mapPinMainElement.style.top = MAP_PIN_DEFAULT_COOR.Y + 'px';

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
