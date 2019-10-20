'use strict';

(function () {


  var filtersWrapElement = document.querySelector('.map__filters-container');
  var housingTypeFilterSelect = filtersWrapElement.querySelector('select[name="housing-type"]');


  /**
   * Slice data array
   * @param {data} data - orders data
   * @param {int} pinsAmount - amount pins for rendering on map
   * @return {data} data - sliced data
   */
  function pinsAmountFilter(data, pinsAmount) {
    return data.slice(0, pinsAmount);
  }

  /**
   * Filter by house type
   * @param {data} data
   */
  function housingTypeFilterListener(data) {
    var filterData = data;

    housingTypeFilterSelect.addEventListener('change', function (evt) {
      var houseTypeSelected = evt.target.options[evt.target.selectedIndex].value;

      if (houseTypeSelected !== 'any') {
        filterData = data.filter(function (item) {
          return item.offer.type === houseTypeSelected;
        });
      } else {
        filterData = data;
      }

      filterData = pinsAmountFilter(filterData, window.render.RENDER_PINS_AMOUNT);

      window.map.renderPins(filterData);
      window.card.togglePopupCard(filterData);
      window.card.closePopupCard();
    });
  }


  window.filter = {
    filtersWrapElement: filtersWrapElement,
    housingTypeFilterListener: housingTypeFilterListener,
    pinsAmountFilter: pinsAmountFilter
  };

  // ...

})();
