'use strict';

(function () {
  function Notice(template) {
    this._template = template;
    this._KEYS = window.utils.KEYS;
    this._template = template.cloneNode(true);
    this._btn = this._template.querySelector('button');
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onCloseMessage = this._onCloseMessage.bind(this);
  }

  Notice.prototype.init = function () {
    document.body.append(this._template);
    document.body.classList.add('modal-open');
    this._template.addEventListener('click', this._onClose);
    document.addEventListener('keydown', this._onEscKeydown);
    this._btn.addEventListener('click', this._onCloseMessage);
  };

  Notice.prototype._onCloseMessage = function () {
    this._template.remove();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this._onEscKeydown);
    this._template.removeEventListener('click', this._onEscKeydown);
    this._btn.removeEventListener('click', this._onCloseMessage);
  };

  Notice.prototype._onClose = function (evt) {
    if (evt.target.classList.contains('success')) {
      this._onCloseMessage();
    }
  };

  Notice.prototype._onEscKeydown = function (evt) {
    if (evt.key === this._KEYS.ESCAPE || evt.key === this._KEYS.ESC) {
      this._onCloseMessage();
      document.removeEventListener('keydown', this._onEscKeydown);
    }
  };

  window.Notice = Notice;

})();
