'use strict';

(function () {

  var uploadFile = document.querySelector('.img-upload__input');
  var uploaImgBlock = document.querySelector('.img-upload__overlay');
  var modal = new window.Modal(uploaImgBlock);

  uploadFile.addEventListener('change', function () {
    modal.open();
  });

  var imgUploadFormElement = document.querySelector('.img-upload__form');

  var Form = function (template, func) {
    this._template = template;
    this._KEYS = window.utils.KEYS;
    this._func = func;
    this._message = template.cloneNode(true);
    this._btn = this._message.querySelector('.success__button');

    this.init = function () {
      this._func();
      document.body.append(this._message);
      this._onClose();
    };

    this._onClose = function () {
      this._onKeydown = this._onKeydown.bind(this);
      this._onClose2 = this._onClose2.bind(this);
      this._closeMessage = this._closeMessage.bind(this);
      this._message.addEventListener('click', this._onClose2);
      document.addEventListener('keydown', this._onKeydown);
      this._btn.addEventListener('click', this._closeMessage);
    };

    this._resetForm = function () {
      document.querySelector('.img-upload__form').reset();
    };

    this._closeMessage = function () {
      this._message.remove();
      this._btn.removeEventListener('click', this._closeMessage);
      this._message.removeEventListener('click', this._onKeydown);
      document.removeEventListener('keydown', this._onKeydown);
    };

    this._onClose2 = function (evt) {
      if (evt.target.classList.contains('success')) {
        this._closeMessage();
      }
    };

    this._onKeydown = function (evt) {
      if (evt.key === this._KEYS.ESCAPE || evt.key === this._KEYS.ESC) {
        this._closeMessage();
        document.removeEventListener('keydown', this._onKeydown);
      }
    };
  };

  function showSuccessMessage() {
    var template = document.querySelector('#success').content.querySelector('.success');
    var success = new Form(template, modal._close);
    success.init();
  }

  function showErrorMessage() {
    var template = document.querySelector('#error').content.querySelector('.error');
    var error = new Form(template, modal._close);
    error.init();
  }

  imgUploadFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.onSend(new FormData(imgUploadFormElement), showSuccessMessage, showErrorMessage);
    window.effect.default();
  });

})();
