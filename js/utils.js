'use strict';
(function () {

  var errorMassageTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var successMassageTemplateElement = document.querySelector('#success').content.querySelector('.success');

  var ButtonKey = {
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
      if (evt.keyCode === ButtonKey.ENTER) {
        action();
      }
    },

    onEscPress: function (evt, action) {
      if (evt.keyCode === ButtonKey.ESC) {
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

    errorMessage: function (message, errorButtonHandler) {
      var template = errorMassageTemplateElement.cloneNode(true);

      template.querySelector('.error__message').textContent = message;

      var errorButton = template.querySelector('.error__button');

      errorButton.addEventListener('click', function () {
        errorButtonHandler();
        errorButton.removeEventListener('click', errorButtonHandler);
      });

      window.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, function () {
          errorButtonHandler();
        });
      });

      document.body.insertAdjacentElement('afterbegin', template);
    },

    successMessage: function (message, successHandler) {
      var template = successMassageTemplateElement.cloneNode(true);

      template.querySelector('.success__message').textContent = message;
      document.body.insertAdjacentElement('afterbegin', template);

      var successNode = document.querySelector('.success');
      successNode.addEventListener('click', function () {
        successHandler();
        successNode.removeEventListener('click', successHandler);
      });

      window.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, function () {
          successHandler();
        });
      });
    },

    removeErrorMessage: function () {
      document.body.querySelector('.error').remove();
    },

    removeSuccessMessage: function () {
      document.body.querySelector('.success').remove();
    }
  };

})();
