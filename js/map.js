'use strict';

(function () {

  var mapNode = window.util.mapNode;

  var mapPinsWrap = mapNode.querySelector('.map__pins');
  var mapFiltersWrap = mapNode.querySelector('.map__filters-container');
  /**
   * Moving element on the map by click
   * @param {node} nodeElement - moving element
   */
  function movingElementOnMap(nodeElement) {
    nodeElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      function __mouseMoveHandler(moveEvt) {
        moveEvt.preventDefault();

        var elWidthOffset = nodeElement.clientWidth / 2;
        var elHeightOffset = nodeElement.clientHeight / 2;

        var shift = {
          x: moveEvt.clientX - mapNode.offsetLeft - elWidthOffset,
          y: moveEvt.clientY - mapNode.offsetTop - elHeightOffset
        };

        var mapCoord = {
          left: mapNode.offsetLeft + elWidthOffset,
          right: mapNode.offsetLeft + mapNode.clientWidth - elWidthOffset,
          top: mapNode.offsetTop + elHeightOffset,
          bottom: (mapNode.offsetTop + mapNode.clientHeight) - mapFiltersWrap.clientHeight,
        };

        /* moving on map by x-coordinate */
        if ((moveEvt.clientX < mapCoord.left) || (moveEvt.clientX > mapCoord.right)) {
          nodeElement.style.left = mapCoord.left;
        } else {
          nodeElement.style.left = shift.x + 'px';
        }


        /* moving on map by y-coordinate */
        if (moveEvt.clientY < mapCoord.top) {
          nodeElement.style.top = mapNode.offsetTop + window.scrollY + 'px';
        } else if (moveEvt.clientY > mapCoord.bottom - window.scrollY) {
          nodeElement.style.top = mapCoord.bottom - nodeElement.clientHeight + 'px';
        } else {
          nodeElement.style.top = shift.y + window.scrollY + 'px';
        }

      }

      function __mouseUpHandler() {
        document.removeEventListener('mousemove', __mouseMoveHandler);
        document.removeEventListener('mouseup', __mouseUpHandler);
      }

      document.addEventListener('mousemove', __mouseMoveHandler);
      document.addEventListener('mouseup', __mouseUpHandler);

    });
  }

  function renderPins(data) {
    removePinsHandler();
    mapPinsWrap.appendChild(window.pin.mapPinsFragment(data));
  }

  /**
   * Remove all order pins from map
   */
  function removePinsHandler() {
    var pins = mapNode.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  }

  window.keksMap = {
    movingElementOnMap: movingElementOnMap,
    removePinsHandler: removePinsHandler,
    renderPins: renderPins
  };

  // ...

})();
