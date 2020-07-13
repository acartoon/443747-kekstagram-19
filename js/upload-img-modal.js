'use strict';

(function () {

  function UploadImgModal(window) {
    this._super.call(this, window);

    this._inputHash = this._window.querySelector('.text__hashtags');
    this._inputDesc = this._window.querySelector('.text__description');
    this._btnSubmit = this._window.querySelector('.img-upload__submit');
    this._form = document.querySelector('#upload-select-image');

    this._onRemoveDocumentOnKeydown = this._onRemoveDocumentOnKeydown.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onTextArea = this._onTextArea.bind(this);

  }


  UploadImgModal.prototype = Object.create(window.Modal.prototype);
  UploadImgModal.prototype.constructor = window.UploadImgModal;
  UploadImgModal.prototype._super = window.Modal;


  UploadImgModal.prototype.initEvents = function () {

    // добавление обработчиков эффектов, слайдера и размера изображения и валидации
    window.slider.init();
    window.effect.init();
    window.pictireSize.init();

    // проверка хэш-тегов и комментария
    // this._form.reportValidity();
    this._inputHash.addEventListener('keyup', this._onInput);
    this._inputDesc.addEventListener('keyup', this._onTextArea);
    // добавление своих обработчиков
    this._inputHash.addEventListener('focus', this._onRemoveDocumentOnKeydown);
    this._inputDesc.addEventListener('focus', this._onRemoveDocumentOnKeydown);
    this._inputHash.addEventListener('blur', this._onDocumentEscDown);
    this._inputDesc.addEventListener('blur', this._onDocumentEscDown);
  };

  // проверка хеш-тегов
  UploadImgModal.prototype._onInput = function (evt) {
    window.validation.onHashtagKeyup(evt);

    this._form.reportValidity();
  };

  // проверка комментария
  UploadImgModal.prototype._onTextArea = function (evt) {
    window.validation.onTextAreaKeyup(evt);

    this._form.reportValidity();
  };

  // отправка формы
  UploadImgModal.prototype._onSubmit = function (evt) {
    evt.preventDefault();

    if (this._inputHash.validity.valid && this._inputDesc.validity.valid) {
      this.onBtnCloseClick();

      // отправляю форму
      window.backend.onSend(new FormData(this._form), window.backend.showSuccessMessage, window.backend.showErrorMessage);
      // удаляю все обработчики
      this.onBtnClick();
    }
  };

  UploadImgModal.prototype._onRemoveDocumentOnKeydown = function () {
    document.removeEventListener('keydown', this._onKeyEscDown);
  };

  UploadImgModal.prototype.init = function () {
    this.open();

    // добавление обработчиков
    this.initEvents();

    this._closeBtn.addEventListener('click', this.onBtnClick);
    this._btnSubmit.addEventListener('click', this._onSubmit);
  };

  // закрытие формы/удаление обработчиков
  UploadImgModal.prototype.onBtnClick = function () {
    this.onBtnCloseClick();

    // удаление своих обработчиков
    this._inputHash.removeEventListener('focus', this._onRemoveDocumentOnKeydown);
    this._inputHash.removeEventListener('input', this._onInput);
    this._inputHash.removeEventListener('blur', this.onDocumentKeydown);

    this._inputDesc.removeEventListener('focus', this._onRemoveDocumentOnKeydown);
    this._inputDesc.removeEventListener('blur', this.onDocumentKeydown);

    this._btnSubmit.removeEventListener('click', this._onSubmit);
    this._btnSubmit.removeEventListener('click', this.onBtnClick);

    this._closeBtn.removeEventListener('click', this.onBtnClick);

    // удаление обработчиков слайдера, эффектов и изменения размера изображения
    window.effect.reset();
    window.slider.reset();
    window.pictireSize.reset();
  };

  window.UploadImgModal = UploadImgModal;
  window.UploadImgModal.onSubmit = UploadImgModal.onSubmit;
})();
