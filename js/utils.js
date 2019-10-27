'use strict';
(function () {

  var BUTTON_KEY = {
    ENTER: 13,
    ESC: 27
  };

  var DEBOUNCE_DELAY = 500;

  window.utils = {

    Coordinate: function (x, y) {
      this.x = x;
      this.y = y;
      this.setX = function (newX) {
        this.x = newX;
      };
      this.setY = function (newY) {
        this.y = newY;
      };
    },

    onEnterPress: function (evt, action) {
      if (evt.keyCode === BUTTON_KEY.ENTER) {
        action();
      }
    },

    onEscPress: function (evt, action) {
      if (evt.keyCode === BUTTON_KEY.ESC) {
        action();
      }
    },

    debounce: function (callback) {
      var timeout = null;

      return function () {
        var args = arguments;
        if (timeout !== null) {
          window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
          callback.apply(null, args);
        }, DEBOUNCE_DELAY);
      };
    },

    errorMassage: function (massage, errorButtonHandler) {
      var template = document.querySelector('#error').content.querySelector('.error');
      template = template.cloneNode(true);

      template.querySelector('.error__message').textContent = massage;

      var errorButton = template.querySelector('.error__button');

      errorButton.addEventListener('click', function () {
        errorButtonHandler();
        errorButton.removeEventListener('click', errorButtonHandler);
      });

      errorButton.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, function () {
          errorButtonHandler();
        });
      });

      document.body.insertAdjacentElement('afterbegin', template);
    },

    successMassage: function (massage, successHandler) {
      var template = document.querySelector('#success').content.querySelector('.success');
      template = template.cloneNode(true);

      template.querySelector('.success__message').textContent = massage;
      document.body.insertAdjacentElement('afterbegin', template);

      var successNode = document.querySelector('.success');
      successNode.addEventListener('click', function () {
        successHandler();
        successNode.removeEventListener('click', successHandler);
      });

      successNode.addEventListener('keyodwn', function (evt) {
        window.utils.onEscPress(evt, function () {
          successHandler();
        });
      });


    },

    removeErrorMassage: function () {
      document.querySelector('.error').remove();
    },

    removeSuccessMassage: function () {
      document.querySelector('.success').remove();
    }
  };

  // ...

})();
