'use strict';

(function () {

  var mapNode = window.util.mapNode;
  var mapPinsWrap = mapNode.querySelector('.map__pins');
  var mapFiltersWrap = mapNode.querySelector('.map__filters-container');
  var mapPinMain = mapNode.querySelector('.map__pin--main');

  /**
   * Build mapPins fragment array
   * @param {array} cards - cards array
   * @return {DocumentFragment} - collection of mapPin elements
   */
  function __mapPinsFragment(cards) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#pin').content.querySelector('.map__pin');

    cards.forEach(function (card) {
      var pinElement = template.cloneNode(true);
      var pinElementImage = pinElement.querySelector('img');

      pinElement.querySelector('img').setAttribute('src', card.author.avatar);
      pinElement.querySelector('img').setAttribute('alt', card.offer.title);


      var locX = card.offer.location.x - pinElementImage.getAttribute('width');
      var locY = card.offer.location.y - pinElementImage.getAttribute('height');
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

        /* moving on map by x-coordinate */
        if (
          (moveEvt.clientX < (mapNode.offsetLeft + elWidthOffset)) ||
          (moveEvt.clientX > (mapNode.offsetLeft + mapNode.clientWidth - elWidthOffset))
        ) {
          nodeElement.style.left = (mapNode.offsetLeft + elWidthOffset);
        } else {
          nodeElement.style.left = shift.x + 'px';
        }

        /* moving on map by y-coordinate */
        if (moveEvt.clientY < (mapNode.offsetTop + elHeightOffset)) {
          nodeElement.style.top = mapNode.offsetTop + mapNode.scrollTop + 'px';
        } else if (moveEvt.clientY > (mapNode.offsetTop + mapNode.clientHeight - mapFiltersWrap.clientHeight)) {
          nodeElement.style.top = (mapNode.offsetTop + mapNode.clientHeight - mapFiltersWrap.clientHeight) - nodeElement.clientHeight + mapNode.scrollTop + 'px';
        } else {
          nodeElement.style.top = shift.y + mapNode.scrollTop + 'px';
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
  function renderMapPins() {
    mapPinsWrap.appendChild(__mapPinsFragment(window.card.generateCard(8)));
  }

  window.pin = {
    renderMapPins: renderMapPins
  };

  // ...

})();
