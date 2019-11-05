'use strict';

(function () {

  var DEFAULT_AVATAR_IMG = 'img/muffin-grey.svg';

  var titleLength = {
    MIN: 30,
    MAX: 100
  };

  var priceByHousingType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var MAX_GUESTS_AMOUNT = 100;
  var MAX_PRICE = 1000000;

  var orderForm = document.querySelector('.ad-form');

  var title = orderForm.querySelector('#title');

  var price = orderForm.querySelector('#price');
  var housingType = orderForm.querySelector('#type');

  var rooms = orderForm.querySelector('#room_number');
  var capacity = orderForm.querySelector('#capacity');

  var checkIn = orderForm.querySelector('#timein');
  var checkOut = orderForm.querySelector('#timeout');

  var avatar = orderForm.querySelector('#avatar');
  var previewImg = orderForm.querySelector('.ad-form-header__preview img');

  var images = orderForm.querySelector('#images');

  var resetButton = orderForm.querySelector('.ad-form__reset');

  /**
   * validate title input
   */
  var validateTitle = function () {
    var length = title.value.length;

    if (length === 0) {
      title.setCustomValidity('Поле обязательное для заполнения');
    } else if (length > titleLength.MAX) {
      title.setCustomValidity('Заголовок обьявления слишком длинный');
    } else if (length < titleLength.MIN) {
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
    var photo = document.querySelector('#photo').content.querySelector('div');
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
        window.utils.errorMassage('Произошла ошибка загрузки', false);
        return false;
      };
    }
  };


  /* Validate form functions after rendering page  */
  validateTitle();
  validatePrice();
  price.setAttribute('min', priceByHousingType[housingType.value]);
  validateRoomsAndCapacity();


  /* Event listener for avatar file input */
  avatar.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    readFile(file, function (evtFile) {
      previewImg.src = evtFile.target.result;
    });
  });

  /* Validate title input event listener */
  title.addEventListener('input', window.utils.debounce(validateTitle));

  /* Validate price input event listener */
  price.addEventListener('input', window.utils.debounce(validatePrice));

  /* Validate house type event listener */
  housingType.addEventListener('change', function (evt) {
    price.setAttribute('min', priceByHousingType[evt.target.value]);
    price.setAttribute('placeholder', priceByHousingType[evt.target.value]);
  });

  /* Validate rooms event listener */
  rooms.addEventListener('change', validateRoomsAndCapacity);

  /* Validate capacity event listener */
  capacity.addEventListener('change', validateRoomsAndCapacity);

  /* Validate checkIn event listener */
  checkIn.addEventListener('change', function (evt) {
    setCheckInAndOut(evt.target.value);
  });

  /* Validate checkOut event listener */
  checkOut.addEventListener('change', function (evt) {
    setCheckInAndOut(evt.target.value);
  });

  /* Add images event listener */
  images.addEventListener('change', function (evt) {
    var files = evt.target.files;

    Array.from(files).forEach(function (file) {
      readFile(file, function (evtFile) {
        renderPhoto(evtFile.target.result);
      });
    });
  });

  /* Reset button event listener */
  resetButton.addEventListener('click', function () {
    var resetButtonHandler = function () {
      window.form.disable();
      window.map.disable();
    };
    resetButton.removeEventListener('click', resetButtonHandler);
  });

  /**
   * Success handler for upload form data
   */
  var successHandler = function () {
    window.utils.successMassage('Заказ отправлен!', function () {
      orderForm.reset();
      window.popup.remove();
      window.form.disable();
      window.map.disable();
      window.mainPin.setDefault();
      window.utils.removeSuccessMassage();
    });
  };

  /**
   * Error handler for upload form data
   */
  var errorHandler = function (errorMassage) {
    window.popup.remove();
    window.utils.errorMassage(errorMassage, function () {
      window.utils.removeErrorMassage();
    });
  };

  /**
   * Submit form event listener
   */
  orderForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.upload(new FormData(orderForm), successHandler, errorHandler);
  });


  window.form = {
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

      previewImg.src = DEFAULT_AVATAR_IMG;
    }
  };

  /* Disabled form when page render */
  window.form.disable();

})();


