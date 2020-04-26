'use strict';

(function () {

  var uploadFile = document.querySelector('.img-upload__input');
  var uploadImgBlock = document.querySelector('.img-upload__overlay');
  var form = new window.Modal(uploadImgBlock);

  uploadFile.addEventListener('change', function () {
    form.open();
    var initpictireSize = window.pictireSize.init.bind(window.pictireSize.getChangePictureSize);
    initpictireSize();
  });

  var imgUploadFormElement = document.querySelector('.img-upload__form');

  var Notice = function (template, onCloseForm) {
    this._template = template;
    this._KEYS = window.utils.KEYS;
    this._onCloseForm = onCloseForm;
    this._message = template.cloneNode(true);
    this._btn = this._message.querySelector('button');
    this._onKeydown = this._onKeydown.bind(this);
    this._onClose = this._onClose.bind(this);
    this._closeMessage = this._closeMessage.bind(this);
  };

  Notice.prototype.init = function () {
    this._onCloseForm();
    document.body.append(this._message);
    document.body.classList.add('modal-open');
    this._message.addEventListener('click', this._onClose);
    document.addEventListener('keydown', this._onKeydown);
    this._btn.addEventListener('click', this._closeMessage);
  };


  Notice.prototype._closeMessage = function () {
    this._message.remove();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this._onKeydown);
    this._message.removeEventListener('click', this._onKeydown);
    this._btn.removeEventListener('click', this._closeMessage);
  };

  Notice.prototype._onClose = function (evt) {
    if (evt.target.classList.contains('success')) {
      this._closeMessage();
    }
  };

  Notice.prototype._onKeydown = function (evt) {
    if (evt.key === this._KEYS.ESCAPE || evt.key === this._KEYS.ESC) {
      this._closeMessage();
      document.removeEventListener('keydown', this._onKeydown);
    }
  };

  function showSuccessMessage() {
    var template = document.querySelector('#success').content.querySelector('.success');
    var success = new Notice(template, form._onClose);
    imgUploadFormElement.removeEventListener('submit', submit);
    success.init();
  }

  function showErrorMessage() {
    var template = document.querySelector('#error').content.querySelector('.error');
    var error = new Notice(template, form._onClose);
    error.init();
  }

  function submit(evt) {
    evt.preventDefault();
    window.backend.onSend(new FormData(imgUploadFormElement), showSuccessMessage, showErrorMessage);
    window.effect.default();
    window.slider.default();
  }

  imgUploadFormElement.addEventListener('submit', submit);

})();
