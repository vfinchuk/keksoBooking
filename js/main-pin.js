'use strict';

(function () {

  var Y_MIN_DIAPASONE = 130;
  var Y_MAX_DIAPASONE = 630;

  var MainPinSize = {
    HEIGHT: 65,
    WIDTH: 65,
    ARROW_HEIGHT: 22
  };

  var MAIN_PIN_CENTER_X = (MainPinSize.WIDTH / 2);
  var MAIN_PIN_CENTER_Y = (MainPinSize.HEIGHT / 2);

  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var mainPin = document.querySelector('.map__pin--main');

  var Coordinate = window.utils.Coordinate;

  var defaultCoordinate = new Coordinate(mainPin.offsetLeft, mainPin.offsetTop);

  var addressInput = document.querySelector('#address');

  /**
   * Set pin location css styles
   */
  var setPinLocation = function () {

    // check left and right sides
    if (mainPin.offsetLeft <= 0 - MAIN_PIN_CENTER_X) {
      mainPin.style.left = Math.floor(0 - MAIN_PIN_CENTER_X) + 'px';
    } else if (mainPin.offsetLeft + MAIN_PIN_CENTER_X >= MAP_WIDTH) {
      mainPin.style.left = Math.floor(MAP_WIDTH - MAIN_PIN_CENTER_X) + 'px';
    }

    // check top and bottom sides
    if ((mainPin.offsetTop + MainPinSize.HEIGHT + MainPinSize.ARROW_HEIGHT) <= Y_MIN_DIAPASONE) {
      mainPin.style.top = Math.floor(Y_MIN_DIAPASONE - MainPinSize.HEIGHT - MainPinSize.ARROW_HEIGHT) + 'px';
    } else if ((mainPin.offsetTop + MainPinSize.HEIGHT + MainPinSize.ARROW_HEIGHT) >= Y_MAX_DIAPASONE) {
      mainPin.style.top = Math.floor(Y_MAX_DIAPASONE - MainPinSize.HEIGHT - MainPinSize.ARROW_HEIGHT) + 'px';
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

      window.mainPin.setAddressCoordinate();
      setPinLocation();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });


  // TODO Доработать !!!


  window.mainPin = {
    mainPinClicked: false,

    firstClickMainPin: function () {
      var mainPinClickHandler = function () {
        window.map.init();
        window.mainPin.setAddressCoordinate();
      };

      mainPin.addEventListener('mousedown', function () {
        if (!window.mainPin.mainPinClicked) {
          mainPinClickHandler();
          window.mainPin.mainPinClicked = true;
        }
      }, {once: true});

      mainPin.addEventListener('keydown', function (evt) {
        window.utils.onEnterPress(evt, function () {
          if (!window.mainPin.mainPinClicked) {
            mainPinClickHandler();
            window.mainPin.mainPinClicked = true;
          }
        });
      }, {once: true});

    },
    /**
     * set default coordinate for main map pin
     */
    setDefault: function () {
      mainPin.style.left = defaultCoordinate.x + 'px';
      mainPin.style.top = defaultCoordinate.y + 'px';
    },
    /**
     * Add address coordinate in form address input
     * @param {flag} isDisable set true when page disabled
     */
    setAddressCoordinate: function (isDisable) {

      var pinCoordinateX = Math.floor((mainPin.offsetLeft + MAIN_PIN_CENTER_X)) < 0 ? 0 : Math.floor((mainPin.offsetLeft + MAIN_PIN_CENTER_X));
      var pinCoordinateY = Math.floor((mainPin.offsetTop + MainPinSize.HEIGHT + MainPinSize.ARROW_HEIGHT));

      if (isDisable) {
        pinCoordinateX = Math.floor(mainPin.offsetLeft + MAIN_PIN_CENTER_X);
        pinCoordinateY = Math.floor(mainPin.offsetLeft + MAIN_PIN_CENTER_Y);
      }

      addressInput.value = pinCoordinateX + ', ' + pinCoordinateY;
    }
  };

  window.mainPin.firstClickMainPin();
  window.mainPin.setAddressCoordinate(true);

})();
