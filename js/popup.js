'use strict';

(function () {

  var housingTypeDictionary = window.form.housingTypeDictionary;

  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var getCardTemplate = function (data) {
    var offer = data.offer;
    var avatar = data.author.avatar;

    var template = cardTemplateElement.cloneNode(true);

    template.querySelector('.popup__avatar').src = avatar;
    template.querySelector('.popup__title').textContent = offer.title;
    template.querySelector('.popup__text--address').textContent = offer.address;
    template.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    template.querySelector('.popup__type').textContent = housingTypeDictionary[offer.type];
    template.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    var fragmentFeatures = document.createDocumentFragment();

    offer.features.forEach(function (feature) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature', 'popup__feature--' + feature);
      fragmentFeatures.appendChild(listItem);
    });
    template.querySelector('.popup__features').innerHTML = '';
    template.querySelector('.popup__features').appendChild(fragmentFeatures);

    template.querySelector('.popup__description').textContent = offer.description;

    var fragmentPhotos = document.createDocumentFragment();

    offer.photos.forEach(function (photo) {
      var image = document.createElement('img');
      image.classList.add('popup__photo');
      image.src = photo;
      image.width = 45;
      image.height = 45;
      image.alt = 'Фотография жилья';
      fragmentPhotos.appendChild(image);
    });
    template.querySelector('.popup__photos').innerHTML = '';
    template.querySelector('.popup__photos').appendChild(fragmentPhotos);

    return template;
  };


  var insertCardTemplate = function (template) {
    mapFiltersContainer.insertAdjacentElement('beforebegin', template);
  };


  var closePopupHandler = function () {
    var closePopup = document.querySelector('.popup__close');
    closePopup.addEventListener('click', function () {
      window.popup.remove();
    });
  };


  var openPopup = function (data) {
    var card = document.querySelector('.popup');
    if (card) {
      card.remove();
    }

    var template = getCardTemplate(data);
    insertCardTemplate(template);
    document.addEventListener('click', escPressPopupHandler);
    closePopupHandler();
  };


  var escPressPopupHandler = function (evt) {
    window.utils.onEscPress(evt, window.popup.remove);
    document.removeEventListener('click', escPressPopupHandler);
  };


  window.popup = {
    openHandler: function (pin, data) {

      pin.addEventListener('click', function () {
        openPopup(data);
      });

      pin.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, function () {
          openPopup(data);
        });
      });

    },

    remove: function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
        document.removeEventListener('keydown', escPressPopupHandler);
      }
    }
  };

})();
