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

  var setCheckInAndOut = function (time) {
    checkIn.value = time;
    checkOut.value = time;
  };

  var renderPhoto = function (src) {
    var photo = document.querySelector('#photo').content.querySelector('div');
    var template = photo.cloneNode(true);
    template.querySelector('img').src = src;
    document.querySelector('.ad-form__photo-container').insertAdjacentElement('beforeend', template);
  };

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

  /**
   * Set avatar photo
   */
  avatar.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    readFile(file, function (evtFile) {
      previewImg.src = evtFile.target.result;
    });
  });


  /**
   * Validate title
   */
  validateTitle();
  title.addEventListener('input', window.utils.debounce(validateTitle));

  /**
   * Validate price by housing type
   */
  price.setAttribute('min', priceByHousingType[housingType.value]);
  housingType.addEventListener('change', function (evt) {
    price.setAttribute('min', priceByHousingType[evt.target.value]);
  });

  validatePrice();
  price.addEventListener('input', window.utils.debounce(validatePrice));

  /**
   * Validate rooms and capacity
   */
  validateRoomsAndCapacity();
  rooms.addEventListener('change', validateRoomsAndCapacity);
  capacity.addEventListener('change', validateRoomsAndCapacity);

  /**
   * Validate check in and out
   */
  checkIn.addEventListener('change', function (evt) {
    setCheckInAndOut(evt.target.value);
  });

  checkOut.addEventListener('change', function (evt) {
    setCheckInAndOut(evt.target.value);
  });

  /**
   * set order images
   */
  images.addEventListener('change', function (evt) {
    var files = evt.target.files;

    Array.from(files).forEach(function (file) {
      readFile(file, function (evtFile) {
        renderPhoto(evtFile.target.result);
      });
    });
  });


  var resetButtonHandler = function () {
    window.form.disable();
    window.map.disable();
  };

  resetButton.addEventListener('click', function () {
    resetButtonHandler();
    resetButton.removeEventListener('click', resetButtonHandler);
  });


  var successHandler = function () {
    window.utils.successMassage('Заказ отправлен!', function () {
      orderForm.reset();
      window.form.disable();
      window.map.disable();
      window.mainPin.setDefault();
      window.utils.removeSuccessMassage();
    });
  };

  var errorHandler = function (errorMassage) {
    window.popup.remove();
    window.utils.errorMassage(errorMassage, function () {
      window.utils.removeErrorMassage();
    });
  };

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

    enable: function () {
      orderForm.classList.remove('ad-form--disabled');

      var fieldsets = orderForm.querySelectorAll('fieldset');
      fieldsets.forEach(function (fieldset) {
        fieldset.disabled = false;
      });
    },

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

  window.form.disable();

})();


