'use strict';

var CARD_DATA = {
  amount: 8,
  titles: [
    'Люкс аппортаменты',
    '2х комнатная кв.',
    'Комната с видом на море',
    'Большая студия',
    'Коммуналка',
    'Комната с терассой',
    'Квартира в центре',
    'Уютный Лофт'
  ],
  apartments: ['palace', 'flat', 'house', 'bungalo'],
  checkIns: ['12:00', '13:00', '14:00'],
  checkOuts: function () {
    return this.checkIns;
  },
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ]
};

var MAP = document.querySelector('.map');

/**
 * Return random item from array
 * @param {Array} array - array
 * @return {Array} - new array
 */
function randomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Return random number in diapason
 * @param {Number} min - min diapason
 * @param {Number} max - max max diapason
 * @return {Number} - random number
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Return array with random element and length
 * @param {Array} array - array
 * @return {Array} - new array
 */
function randomItemsLengthArray(array) {
  var result = [];
  var length = Math.floor(Math.random() * array.length + 1);

  for (var i = 0; i < length; i++) {
    var key = Math.floor(Math.random() * (array.length - 1));
    result[i] = array[key];
    array.splice(key, 1);
  }

  return result;
}

/**
 * Generate array with card objects
 * @param {Number} amount - cards amount
 * @return {Array} - cards array
 */
function generateCard(amount) {
  var cards = [];
  amount = amount < CARD_DATA.titles.length ? amount : CARD_DATA.titles.length;

  for (var i = 0; i < amount; i++) {

    cards[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: randomArrayItem(CARD_DATA.titles),
        address: function () {
          return this.location.x + ', ' + this.location.y;
        },
        price: randomNumber(300, 1000),
        type: randomArrayItem(CARD_DATA.apartments),
        rooms: randomNumber(1, 5),
        guests: randomNumber(1, 5),
        checkin: randomArrayItem(CARD_DATA.checkIns),
        checkout: randomArrayItem(CARD_DATA.checkOuts()),
        features: randomItemsLengthArray(CARD_DATA.features),
        description: 'Here will be description',
        photos: randomItemsLengthArray(CARD_DATA.photos),
        location: {
          x: randomNumber(MAP.offsetLeft, MAP.offsetWidth),
          y: randomNumber(130, 630)
        }
      }
    };
  }
  return cards;
}

/**
 * Build mapPins fragment array
 * @param {array} cards - cards array
 * @return {DocumentFragment} - collection of mapPin elements
 */
function mapPinsFragment(cards) {
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

/**
 * Build card fragment
 * @param {object} card - card object
 * @return {Node} - card__popup element
 */
function cardFragment(card) {
  var template = document.querySelector('#card').content.querySelector('.map__card');

  template.querySelector('.popup__title').textContent = card.offer.title;
  template.querySelector('.popup__text--address').textContent = card.offer.address();
  template.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  template.querySelector('.popup__type').textContent = card.offer.type;
  template.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  template.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  template.querySelector('.popup__features').textContent = card.offer.features.join(', ');
  template.querySelector('.popup__description').textContent = card.offer.description;
  template.querySelector('.popup__photos').textContent = '';
  template.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

  card.offer.photos.forEach(function (photo) {
    var image = document.createElement('img');
    image.setAttribute('src', photo);

    template.querySelector('.popup__photos').appendChild(image);
  });

  return template;
}

MAP.classList.remove('map--faded');

var cards = generateCard(12);
var mapPinsWrap = document.querySelector('.map__pins');

mapPinsWrap.appendChild(mapPinsFragment(cards));
