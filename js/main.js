'use strict';

var ORDER_AMOUNT = 8;
var ORDER_TITLES = ['Люкс аппортаменты', '2х комнатная кв.', 'Комната с видом на море', 'Большая студия', 'Коммуналка', 'Комната с терассой', 'Квартира в центре', 'Уютный Лофт'];

var TYPES_APARTMENT = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = CHECKIN_TIMES;

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAP = document.querySelector('.map');

// Return random item in array
function getRandItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Return random number in diapason
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Return avatar path
function getAvatarUrl(i) {
  return 'img/avatars/user0' + i + '.png';
}

// Return random items and length array
function getRandSliceArray(array) {

  var j; var x; var i;
  for (i = array.length - 1; i > 0; i--) {

    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array.slice(Math.floor(Math.random() * (array.length - 1) + 1));
}

// Generate Orders objects array
function getOrders() {
  var orders = [];
  for (var i = 0; i < ORDER_AMOUNT; i++) {

    orders.push({
      author: {
        avatar: getAvatarUrl(i + 1)
      },
      offer: {
        title: getRandItem(ORDER_TITLES),
        address: '',
        price: getRandomArbitrary(300, 1000),
        type: getRandItem(TYPES_APARTMENT),
        rooms: getRandomArbitrary(1, 5),
        guests: getRandomArbitrary(1, 5),
        checkin: getRandItem(CHECKIN_TIMES),
        checkout: getRandItem(CHECKOUT_TIMES),
        features: getRandSliceArray(FEATURES),
        description: 'Here will be description',
        photos: getRandSliceArray(PHOTOS),
        location: {
          x: getRandomArbitrary(MAP.offsetLeft, (MAP.offsetLeft + MAP.offsetWidth)),
          y: getRandomArbitrary(130, 630)
        }
      }
    });

  }

  return orders;
}

// Rendering map_pin buttons
function renderMapPins(orders, list) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  for (var i = 0; i < orders.length; i++) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.querySelector('img').setAttribute('src', orders[i].author.avatar);
    pinElement.querySelector('img').setAttribute('alt', orders[i].offer.title);

    list.appendChild(pinElement);

    var pinImage = pinElement.querySelector('img');
    var locX = orders[i].offer.location.x - (pinElement.offsetWidth / 2);
    var locY = orders[i].offer.location.y - pinImage.offsetHeight;

    pinElement.style.left = locX + 'px';
    pinElement.style.top = locY + 'px';
  }

}

MAP.classList.remove('map--faded');

var mapPinsList = document.querySelector('.map__pins');
var orders = getOrders();

renderMapPins(orders, mapPinsList);
