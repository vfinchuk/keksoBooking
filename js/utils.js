'use strict';
(function () {

  var errorMassageTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var successMassageTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var mainElement = document.querySelector('main');

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

      mainElement.insertAdjacentElement('afterbegin', template);

      var errorButton = document.querySelector('.error__button');

      errorButton.addEventListener('click', function (evt) {
        evt.stopPropagation();
        errorButtonHandler();
        errorButton.removeEventListener('click', errorButtonHandler);
      }, {once: true});

      document.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, function () {
          errorButtonHandler();
        });
      }, {once: true});


      var errorElement = document.querySelector('.error');
      errorElement.addEventListener('click', function (evt) {
        evt.preventDefault();
        errorButtonHandler();
        errorElement.removeEventListener('click', errorButtonHandler);
      }, {once: true});
    },

    successMessage: function (message, successHandler) {
      var template = successMassageTemplateElement.cloneNode(true);

      template.querySelector('.success__message').textContent = message;
      mainElement.insertAdjacentElement('afterbegin', template);

      var successNode = document.querySelector('.success');
      successNode.addEventListener('click', function () {
        successHandler();
        successNode.removeEventListener('click', successHandler);
      });

      document.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, function () {
          successHandler();
        }, {once: true});
      });
    },

    removeErrorMessage: function () {
      var errorElement = mainElement.querySelector('.error');
      if (errorElement) {
        errorElement.remove();
      }

    },

    removeSuccessMessage: function () {
      var successElement = document.querySelector('.success');
      if (successElement) {
        successElement.remove();
      }
    }
  };

})();
