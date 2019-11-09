'use strict';

(function () {

  var Coordinate = window.utils.Coordinate;

  var mainPinSize = {
    HEIGHT: 65,
    WIDTH: 65,
    ARROW_HEIGHT: 22
  };

  var Y_MIN_DIAPASONE = 130;
  var Y_MAX_DIAPASONE = 630;

  var MAIN_PIN_CENTER_X = (mainPinSize.WIDTH / 2);
  var MAIN_PIN_CENTER_Y = (mainPinSize.HEIGHT / 2);


  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var mainPin = document.querySelector('.map__pin--main');

  var defaultCoordinate = new Coordinate(mainPin.offsetLeft, mainPin.offsetTop);

  /**
   * Add address coordinate in form address input
   * @param {flag} isDisable set true when page disabled
   */
  var setAddressCoordinate = function (isDisable) {

    var pinCoordinateX = Math.floor((mainPin.offsetLeft + MAIN_PIN_CENTER_X)) < 0 ? 0 : Math.floor((mainPin.offsetLeft + MAIN_PIN_CENTER_X));
    var pinCoordinateY = Math.floor((mainPin.offsetTop + mainPinSize.HEIGHT + mainPinSize.ARROW_HEIGHT));

    if (isDisable) {
      pinCoordinateX = Math.floor(mainPin.offsetLeft + MAIN_PIN_CENTER_X);
      pinCoordinateY = Math.floor(mainPin.offsetLeft + MAIN_PIN_CENTER_Y);
    }

    document.querySelector('#address').value = pinCoordinateX + ', ' + pinCoordinateY;
  };

  /**
   * Set pin location css styles
   */
  var pinLocationHandler = function () {

    // check left and right sides
    if (mainPin.offsetLeft <= 0 - MAIN_PIN_CENTER_X) {
      mainPin.style.left = Math.floor(0 - MAIN_PIN_CENTER_X) + 'px';
    } else if (mainPin.offsetLeft + MAIN_PIN_CENTER_X >= MAP_WIDTH) {
      mainPin.style.left = Math.floor(MAP_WIDTH - MAIN_PIN_CENTER_X) + 'px';
    }

    // check top and bottom sides
    if (mainPin.offsetTop + mainPinSize.HEIGHT <= Y_MIN_DIAPASONE) {
      mainPin.style.top = Math.floor(Y_MIN_DIAPASONE - mainPinSize.HEIGHT) + 'px';
    } else if (mainPin.offsetTop + mainPinSize.HEIGHT >= Y_MAX_DIAPASONE) {
      mainPin.style.top = Math.floor(Y_MAX_DIAPASONE - mainPinSize.HEIGHT) + 'px';
    }

  };

  /**
   * map pin main moving event listener
   */
  mainPin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    var startCoordinate = new Coordinate(downEvt.clientX, downEvt.clientY);

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinate.x - moveEvt.clientX,
        y: startCoordinate.y - moveEvt.clientY
      };

      startCoordinate.setX(moveEvt.clientX);
      startCoordinate.setY(moveEvt.clientY);

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

      setAddressCoordinate();
      pinLocationHandler();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });


  mainPin.addEventListener('mousedown', function () {
    window.map.init();
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, window.map.init);
  });


  setAddressCoordinate(true);


  window.mainPin = {
    /**
     * set default coordinate for main map pin
     */
    setDefault: function () {
      mainPin.style.left = defaultCoordinate.x + 'px';
      mainPin.style.top = defaultCoordinate.y + 'px';
    }
  };

})();
