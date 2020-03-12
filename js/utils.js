'use strict';

(function () {

  var KEYS = {
    ESCAPE: 'Escape',
    ESC: 'Esc'
  };

  // добавляет класс hidden
  var hiddenElement = function (element) {
    element.classList.add('hidden');
  };

  window.Modal = function (window, buttonClass) {
    this._window = window;
    this._buttonClass = buttonClass;
    this.KEYS = KEYS;

    this._closeModalOnKeydown = function () {
      this._onKeydown = this._onKeydown.bind(this);
      document.addEventListener('keydown', this._onKeydown);
    };

    this.open = function () {
      this._window.classList.remove('hidden');
      document.body.classList.add('modal-open');
      this._close = this._close.bind(this);
      this._onClose();
      this._closeModalOnKeydown();
    };

    this._onKeydown = function (evt) {
      if (evt.key === this.KEYS.ESCAPE || evt.key === this.KEYS.ESC) {
        this._close();
        document.removeEventListener('keydown', this._onKeydown);
      }
    };

    this._close = function () {
      this._window.classList.add('hidden');
      document.body.classList.remove('modal-open');
      // console.log(this._window);
    };

    this._onClose = function () {
      var closeBtn = this._window.querySelector('.cancel');
      closeBtn.addEventListener('click', this._close);
    };
  };

  window.utils = {
    KEYS: KEYS,
    hiddenElement: hiddenElement
  };

})();
