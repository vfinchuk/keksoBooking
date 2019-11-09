'use strict';

(function () {

  var COUNT_PINS = 5;

  var SizePin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var getPinTemplate = function (data) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    template = template.cloneNode(true);

    template.querySelector('img').src = data.author.avatar;
    template.querySelector('img').alt = data.offer.title;

    template.style.left = (data.location.x - SizePin.WIDTH / 2) + 'px';
    template.style.top = (data.location.y - SizePin.HEIGHT) + 'px';

    return template;
  };


  window.pins = {
    render: function (data) {
      window.pins.remove();
      window.popup.remove();

      var fragment = document.createDocumentFragment();
      var pinsWrap = document.querySelector('.map__pins');
      var countPins = data.length < COUNT_PINS ? data.length : COUNT_PINS;

      for (var i = 0; i < countPins; i++) {
        fragment.appendChild(getPinTemplate(data[i]));
      }
      pinsWrap.appendChild(fragment);

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      pins.forEach(function (pin, index) {
        window.popup.openHandler(pin, data[index]);
      });
    },

    remove: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };

})();
