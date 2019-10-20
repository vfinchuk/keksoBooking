'use strict';
(function () {

  var BUTTON_KEY = {
    ENTER: 13,
    ESC: 27
  };

  /**
   * Return error massage fragment
   * @param {string} massage - error massage
   * @return {Node}
   */
  function errorMassage(massage) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#error').content.querySelector('.error');

    template = template.cloneNode(true);

    template.querySelector('.error__message').textContent = massage;

    return fragment.appendChild(template);
  }

  /**
   * Return success massage fragment
   * @param {string} massage - success massage
   * @return {Node}
   */
  function successMassage(massage) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#success').content.querySelector('.success');

    template = template.cloneNode(true);

    template.querySelector('.success__message').textContent = massage;

    return fragment.appendChild(template);
  }


  window.util = {
    BUTTON_KEY: BUTTON_KEY,

    massages: {
      error: errorMassage,
      success: successMassage
    }
  };

  // ...

})();
