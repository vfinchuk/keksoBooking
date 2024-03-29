'use strict';

(function () {

  var DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';

  var MAX_GUESTS_AMOUNT = 100;
  var MAX_PRICE = 1000000;

  var TitleLength = {
    MIN: 30,
    MAX: 100
  };

  var PriceByHousingType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var photoTemplate = document.querySelector('#photo');

  var orderForm = document.querySelector('.ad-form');

  var title = orderForm.querySelector('#title');

  var price = orderForm.querySelector('#price');
  var housingType = orderForm.querySelector('#type');

  var rooms = orderForm.querySelector('#room_number');
  var capacity = orderForm.querySelector('#capacity');

  var checkIn = orderForm.querySelector('#timein');
  var checkOut = orderForm.querySelector('#timeout');

  var avatar = orderForm.querySelector('#avatar');
  var previewImage = orderForm.querySelector('.ad-form-header__preview img');

  var images = orderForm.querySelector('#images');

  var resetButton = orderForm.querySelector('.ad-form__reset');

  /**
   * validate title input
   */
  var validateTitle = function () {
    var length = title.value.length;

    if (length === 0) {
      title.setCustomValidity('Поле обязательное для заполнения');
    } else if (length > TitleLength.MAX) {
      title.setCustomValidity('Заголовок обьявления слишком длинный');
    } else if (length < TitleLength.MIN) {
      title.setCustomValidity('Заголовок обьявления слишком короткий');
    } else {
      title.setCustomValidity('');
    }
  };

  /**
   * validate price input
   */
  var validatePrice = function () {
    var minValue = parseInt(price.getAttribute('min'), 10);
    var value = parseInt(price.value, 10);

    price.setAttribute('placeholder', PriceByHousingType[housingType.options[housingType.selectedIndex].value]);

    if (price.value === '') {
      price.setCustomValidity('Введите цену за ночь');
    } else if (value < minValue) {
      price.setCustomValidity('Минимальная цена на ' + window.form.housingTypeDictionary[housingType.value] + ' составляет ' + minValue + 'руб.');
    } else if (value > MAX_PRICE) {
      price.setCustomValidity('Максимальная цена не должна превышать ' + MAX_PRICE + 'руб.');
    } else if (value >= minValue) {
      price.setCustomValidity('');
    }
  };

  /**
   * validate rooms and capacity fields
   */
  var validateRoomsAndCapacity = function () {
    var roomsAmount = parseInt(rooms.value, 10);
    var guestsAmount = parseInt(capacity.value, 10);

    if (roomsAmount < guestsAmount && roomsAmount !== MAX_GUESTS_AMOUNT) {
      capacity.setCustomValidity('Гостей больше чем комнат');
    } else if (roomsAmount === MAX_GUESTS_AMOUNT && guestsAmount !== 0) {
      capacity.setCustomValidity('Не для гостей');
    } else if (guestsAmount === 0 && roomsAmount !== MAX_GUESTS_AMOUNT) {
      rooms.setCustomValidity('Необходимо 100 комнат');
    } else {
      capacity.setCustomValidity('');
      rooms.setCustomValidity('');
    }
  };

  /**
   * Set checkIn and checkOut selects
   * @param {int} time
   */
  var setCheckInAndOut = function (time) {
    checkIn.value = time;
    checkOut.value = time;
  };

  /**
   * Rendering photo
   * @param {string} src
   */
  var renderPhoto = function (src) {
    var photo = photoTemplate.content.querySelector('div');
    var template = photo.cloneNode(true);
    template.querySelector('img').src = src;
    document.querySelector('.ad-form__photo-container').insertAdjacentElement('beforeend', template);
  };

  /**
   * Read files from input[type="file"]
   * @param {file} file
   * @param {callback} callback
   */
  var readFile = function (file, callback) {
    if (file) {
      var reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = function (evt) {
        callback(evt);
      };
      reader.onerror = function () {
        window.utils.getErrorMessage('Произошла ошибка загрузки', false);
        return false;
      };
    }
  };

  /* event handlers */

  var avatarChangeHandler = function (evt) {
    var file = evt.target.files[0];
    readFile(file, function (evtFile) {
      previewImage.src = evtFile.target.result;
    });
  };

  var validateTitleHandler = function () {
    validateTitle();
  };

  var validatePriceHandler = function () {
    validatePrice();
  };

  var housingTypeChangeHandler = function (evt) {
    price.setAttribute('min', PriceByHousingType[evt.target.value]);
    price.setAttribute('placeholder', PriceByHousingType[evt.target.value]);
  };

  var validateRoomsAndCapacityHandler = function () {
    validateRoomsAndCapacity();
  };

  var checkInOutHandler = function (evt) {
    setCheckInAndOut(evt.target.value);
  };

  var imagesChangeHandler = function (evt) {
    var files = evt.target.files;

    Array.from(files).forEach(function (file) {
      readFile(file, function (evtFile) {
        renderPhoto(evtFile.target.result);
      });
    });
  };

  var resetButtonHandler = function () {
    orderForm.reset();
    window.popup.remove();
    window.form.disable();
    window.filter.reset();
    window.map.disable();
    window.mainPin.setDefault();
    window.mainPin.setAddressCoordinate(true);

    window.mainPin.firstClickMainPin();
  };

  avatar.addEventListener('change', avatarChangeHandler);

  title.addEventListener('input', window.utils.debounce(validateTitleHandler));

  price.addEventListener('input', window.utils.debounce(validatePriceHandler));

  housingType.addEventListener('change', housingTypeChangeHandler);

  rooms.addEventListener('change', validateRoomsAndCapacityHandler);

  capacity.addEventListener('change', validateRoomsAndCapacityHandler);

  checkIn.addEventListener('change', checkInOutHandler);
  checkOut.addEventListener('change', checkInOutHandler);

  images.addEventListener('change', imagesChangeHandler);

  /* Reset button event listener */
  resetButton.addEventListener('click', resetButtonHandler);

  /**
   * Success handler for upload form data
   */
  var successHandler = function () {
    orderForm.reset();
    window.filter.reset();
    window.map.disable();
    window.form.disable();
    window.mainPin.setAddressCoordinate(true);

    window.mainPin.firstClickMainPin();
    window.form.defaultValidateFunctions();


    var successMessageElement = window.utils.getSuccessMessage('Заказ отправлен!');

    var successMessageMouseHandler = function () {
      window.utils.removeSuccessMessage();

      successMessageElement.removeEventListener('click', successMessageMouseHandler);
      window.removeEventListener('keydown', successMessageKeyDownHandler);
    };

    var successMessageKeyDownHandler = function (evt) {
      window.utils.escPressHandler(evt, function () {
        window.utils.removeSuccessMessage();

        window.removeEventListener('keydown', successMessageKeyDownHandler);
      });
    };

    if (successMessageElement) {
      successMessageElement.addEventListener('click', successMessageMouseHandler);
      window.addEventListener('keydown', successMessageKeyDownHandler);
    }
  };

  /**
   * Error handler for upload form data
   * @param {string} errorMessage
   */
  var errorHandler = function (errorMessage) {
    window.popup.remove();

    var errorMessageElement = window.utils.getErrorMessage(errorMessage);

    var errorMessageMouseHandler = function () {
      window.utils.removeErrorMessage();
      window.form.defaultValidateFunctions();

      window.mainPin.firstClickMainPin();

      errorMessageElement.removeEventListener('click', errorMessageMouseHandler);
      errorMessageButton.removeEventListener('click', errorMessageMouseHandler);
      window.removeEventListener('keydown', errorMessageKeyDownHandler);
    };

    var errorMessageKeyDownHandler = function (evt) {
      window.utils.escPressHandler(evt, function () {
        window.utils.removeErrorMessage();
        window.form.defaultValidateFunctions();

        window.mainPin.firstClickMainPin();

        window.removeEventListener('keydown', errorMessageKeyDownHandler);
      });
    };

    if (errorMessageElement) {
      var errorMessageButton = errorMessageElement.querySelector('.error__button');
      errorMessageElement.addEventListener('click', errorMessageMouseHandler);
      errorMessageButton.addEventListener('click', errorMessageMouseHandler);
      window.addEventListener('keydown', errorMessageKeyDownHandler);
    }

  };

  var orderFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.data.upload(new FormData(orderForm), successHandler, errorHandler);
  };

  orderForm.addEventListener('submit', orderFormSubmitHandler);


  window.form = {
    defaultValidateFunctions: function () {
      /* Validate form functions after rendering page  */
      validateTitle();
      validatePrice();
      price.setAttribute('min', PriceByHousingType[housingType.value]);
      validateRoomsAndCapacity();
    },

    housingTypeDictionary: {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    },
    /**
     * Enable form
     */
    enable: function () {
      orderForm.classList.remove('ad-form--disabled');

      var fieldsets = orderForm.querySelectorAll('fieldset');
      fieldsets.forEach(function (fieldset) {
        fieldset.disabled = false;
      });
    },
    /**
     * Disable form
     */
    disable: function () {
      orderForm.classList.add('ad-form--disabled');

      var fieldsets = orderForm.querySelectorAll('fieldset');
      fieldsets.forEach(function (fieldset) {
        fieldset.disabled = true;
      });

      var photos = orderForm.querySelectorAll('.ad-form__photo');
      photos.forEach(function (photo) {
        photo.remove();
      });

      previewImage.src = DEFAULT_AVATAR_IMAGE;
    }
  };

  /* Disabled form when page render */
  window.form.disable();

  window.form.defaultValidateFunctions();
})();


