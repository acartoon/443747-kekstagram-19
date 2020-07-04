'use strict';

(function () {

  function UploadImgModal(window) {
    this._super.call(this, window);
    this._inputHash = this._window.querySelector('.text__hashtags');
    this._inputDesc = this._window.querySelector('.text__description');
    this._onRemoveDocumentOnKeydown = this._onRemoveDocumentOnKeydown.bind(this);
    this._btnSubmit = this._window.querySelector('.img-upload__submit');
    this._onSubmit = this._onSubmit.bind(this);
  }

  UploadImgModal.prototype = Object.create(window.Modal.prototype);
  UploadImgModal.prototype.constructor = window.UploadImgModal;
  UploadImgModal.prototype._super = window.Modal;


  UploadImgModal.prototype.initEvents = function () {

    // добавление обработчиков эффектов, слайдера и размера изображения и валидации
    window.slider.init();
    window.effect.init();
    window.validation.init();
    window.pictireSize.init();

    // добавление своих обработчиков
    this._inputHash.addEventListener('focus', this._onRemoveDocumentOnKeydown);
    this._inputDesc.addEventListener('focus', this._onRemoveDocumentOnKeydown);
    this._inputHash.addEventListener('blur', this._onDocumentEscDown);
    this._inputDesc.addEventListener('blur', this._onDocumentEscDown);

    this.onSubmit();
  };

  UploadImgModal.prototype.onSubmit = function () {
    if(true) {
      this._btnSubmit.addEventListener('click', this._onSubmit);
    }
  };

  UploadImgModal.prototype._onSubmit = function (evt) {
    evt.preventDefault();

    var imgUploadFormElement = document.querySelector('#upload-select-image');
    this.onBtnCloseClick();
    window.backend.onSend(new FormData(imgUploadFormElement), window.backend.showSuccessMessage, window.backend.showErrorMessage);
  };

  UploadImgModal.prototype._onRemoveDocumentOnKeydown = function () {
    document.removeEventListener('keydown', this._onKeyEscDown);
  };

  UploadImgModal.prototype.init = function () {
    this.open();
    this.initEvents();
    this._closeBtn.addEventListener('click', this.removeEvents);
  };

  UploadImgModal.prototype.removeEvents = function () {
    this.onBtnCloseClick();
    // удаление своих обработчиков
    this._inputHash.removeEventListener('focus', this._onRemoveDocumentOnKeydown);
    this._inputDesc.removeEventListener('focus', this._onRemoveDocumentOnKeydown);
    this._inputHash.removeEventListener('blur', this.onDocumentKeydown);
    this._inputDesc.removeEventListener('blur', this.onDocumentKeydown);
    this._closeBtn.removeEventListener('click', this.removeEvents);
    this._btnSubmit.removeEventListener('click', this._onSubmit);

    // удаление обработчиков слайдера, эффектов и изменения размера изображения
    window.effect.reset();
    window.validation.reset();
    window.slider.reset();
    window.pictireSize.reset();
  };

  window.UploadImgModal = UploadImgModal;
})();
