'use strict';

(function () {

  var housingTypeDictionary = window.form.housingTypeDictionary;


  var cardTemplate = function (data) {
    var offer = data.offer;
    var avatar = data.author.avatar;

    var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
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
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + feature);
      fragmentFeatures.appendChild(li);
    });
    template.querySelector('.popup__features').innerHTML = '';
    template.querySelector('.popup__features').appendChild(fragmentFeatures);

    template.querySelector('.popup__description').textContent = offer.description;

    var fragmentPhotos = document.createDocumentFragment();

    offer.photos.forEach(function (photo) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = photo;
      img.width = 45;
      img.height = 45;
      img.alt = 'Фотография жилья';
      fragmentPhotos.appendChild(img);
    });
    template.querySelector('.popup__photos').innerHTML = '';
    template.querySelector('.popup__photos').appendChild(fragmentPhotos);

    return template;
  };


  var insertCardTemplate = function (template) {
    document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', template);
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

    var template = cardTemplate(data);
    insertCardTemplate(template);
    document.addEventListener('click', onPopupEscPress);
    closePopupHandler();
  };


  var onPopupEscPress = function (evt) {
    window.utils.onEscPress(evt, window.popup.remove);
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
        document.removeEventListener('keydown', onPopupEscPress);
      }
    }
  };

})();