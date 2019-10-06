'use strict';

(function () {

  var mapNode = window.util.mapNode;
  var mapFiltersWrap = mapNode.querySelector('.map__filters-container');
  var mapPinMain = mapNode.querySelector('.map__pin--main');

  /**
   * Build mapPins fragment array
   * @param {array} cards - cards array
   * @return {DocumentFragment} - collection of mapPin elements
   */
  function mapPinsFragment(cards) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#pin').content.querySelector('.map__pin');

    cards.forEach(function (card) {
      var pinElement = template.cloneNode(true);
      var pinElementImage = pinElement.querySelector('img');

      pinElement.querySelector('img').setAttribute('src', card.author.avatar);
      pinElement.querySelector('img').setAttribute('alt', card.offer.title);


      var locX = card.location.x - pinElementImage.getAttribute('width');
      var locY = card.location.y - pinElementImage.getAttribute('height');
      pinElement.style.left = locX + 'px';
      pinElement.style.top = locY + 'px';

      fragment.appendChild(pinElement);
    });

    return fragment;
  }


  /* moving main map */

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


  movingElementOnMap(mapPinMain);


  /* Render map pins fragment */

  window.pin = {
    mapPinsFragment: mapPinsFragment
  };

  // ...

})();
