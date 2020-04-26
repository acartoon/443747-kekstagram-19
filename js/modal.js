'use strict';

(function () {

  var KEYS = {
    ESCAPE: 'Escape',
    ESC: 'Esc'
  };

  window.Modal = function (window, buttonClass) {
    this._window = window;
    this._buttonClass = buttonClass;
    this.KEYS = KEYS;
    this._onClose = this._onClose.bind(this);
    this._closeBtn = this._window.querySelector('.cancel');
    this._inputHash = document.querySelector('.text__hashtags');
    this._inputDesc = document.querySelector('.text__description');

  };

  window.Modal.prototype._closeModalOnKeydown = function () {
    document.addEventListener('keydown', this._onKeydown);
  };

  window.Modal.prototype.open = function () {
    this._window.classList.remove('hidden');
    document.body.classList.add('modal-open');
    this._closeBtn.addEventListener('click', this._onClose);
    this._onKeydown = this._onKeydown.bind(this);
    document.addEventListener('keydown', this._onKeydown);

    this._inputHash.addEventListener('focus', this.removeClose.bind(this));
    this._inputDesc.addEventListener('focus', this.removeClose.bind(this));
    this._inputHash.addEventListener('blur', this._closeModalOnKeydown.bind(this));
    this._inputDesc.addEventListener('blur', this._closeModalOnKeydown.bind(this));
  };

  window.Modal.prototype.removeClose = function () {
    document.removeEventListener('keydown', this._onKeydown);
  };

  window.Modal.prototype._onKeydown = function (evt) {
    if (evt.key === KEYS.ESCAPE || evt.key === KEYS.ESC) {
      this._onClose();
      document.removeEventListener('keydown', this._onKeydown);
    }
  };

  window.Modal.prototype._onClose = function () {
    window.effect.default();
    window.slider.default();

    window.pictireSize.reset();
    document.querySelector('.img-upload__preview > img').removeAttribute('style');
    this._window.classList.add('hidden');
    document.body.classList.remove('modal-open');
    this._closeBtn.removeEventListener('click', this._onClose);
  };

})();
