'use strict';
(function () {

  var errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
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

    showErrorMessage: function (message, errorMessageCb) {
      var template = errorMessageTemplateElement.cloneNode(true);
      template.querySelector('.error__message').textContent = message;

      mainElement.insertAdjacentElement('afterbegin', template);

      var errorButton = document.querySelector('.error__button');

      errorButton.addEventListener('click', function (evt) {
        evt.stopPropagation();
        errorMessageCb();
        errorButton.removeEventListener('click', errorMessageCb);
      }, {once: true});

      document.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, function () {
          errorMessageCb();
        });
      }, {once: true});


      var errorElement = document.querySelector('.error');
      errorElement.addEventListener('click', function (evt) {
        evt.preventDefault();
        errorMessageCb();
        errorElement.removeEventListener('click', errorMessageCb);
      }, {once: true});
    },

    showSuccessMessage: function (message, successHandler) {
      var template = successMessageTemplateElement.cloneNode(true);

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
