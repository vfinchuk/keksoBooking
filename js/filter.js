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
   * Event listener housing type filter
   */
  housingTypeFilterSelect.addEventListener('change', function (evt) {

    function housingTypeFilterCallback(data) {
      var houseTypeSelected = evt.target.options[evt.target.selectedIndex].value;
      if (houseTypeSelected !== 'any') {
        data = data.filter(function (item) {
          return item.offer.type === houseTypeSelected;
        });
      }

      window.map.renderPins(data);
      window.card.togglePopupCard(data);
    }

    window.data.download(housingTypeFilterCallback, window.render.dataErrorCallback);
  });


  window.filter = {
    filtersWrapElement: filtersWrapElement,
    housingTypeFilterSelect: housingTypeFilterSelect,

    pinsAmountFilter: pinsAmountFilter
  };

  // ...

})();
