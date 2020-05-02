'use strict';

(function () {

  function Modal(window) {
    this._window = window;
    this._closeBtn = this._window.querySelector('.cancel');

    this.onBtnCloseClick = this.onBtnCloseClick.bind(this);
    this._onKeyEscDown = this._onKeyEscDown.bind(this);
    this._onDocumentEscDown = this._onDocumentEscDown.bind(this);
  }

  Modal.prototype._onDocumentEscDown = function () {
    document.addEventListener('keydown', this._onKeyEscDown);
  };

  Modal.prototype.open = function () {
    this._window.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', this._onKeyEscDown);
    this._closeBtn.addEventListener('click', this.onBtnCloseClick);
  };

  Modal.prototype._onKeyEscDown = function (evt) {
    if (evt.key === window.utils.KEYS.ESCAPE || evt.key === window.utils.KEYS.ESC) {
      this.onBtnCloseClick();
      document.removeEventListener('keydown', this._onKeyEscDown);
    }
  };

  Modal.prototype.onBtnCloseClick = function () {
    this._closeBtn.removeEventListener('click', this.onBtnCloseClick);
    this._window.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  window.Modal = Modal;

})();
