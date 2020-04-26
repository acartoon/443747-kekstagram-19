'use strict';

(function () {

  // var uploadFile = document.querySelector('.img-upload__input');
  // var uploaImgBlock = document.querySelector('.img-upload__overlay');
  // var modal = new window.Modal(uploaImgBlock);

  // uploadFile.addEventListener('change', function () {
  //   modal.open();
  // });

  var getChangePictureSize = {
    scaleСontrolValue: document.querySelector('.scale__control--value'),
    btnSmaller: document.querySelector('.scale__control--smaller'),
    btnBigger: document.querySelector('.scale__control--bigger'),
    image: document.querySelector('.img-upload__preview > img'),
    STEP_CHANGE: 25,
    MAX_STEP: 100,
    MIN_STEP: 25,
    initialValue: 100,
    defaultValue: 100,
  };

  getChangePictureSize.changeSizeImg = function (evt) {

    var target = evt.target;
    this.initialValue = (target === this.btnSmaller) ? this.initialValue - this.STEP_CHANGE : this.initialValue + this.STEP_CHANGE;
    if (this.initialValue > this.MAX_STEP) {
      this.initialValue = this.MAX_STEP;
    }

    if (this.initialValue < this.MIN_STEP) {
      this.initialValue = this.MIN_STEP;
    }

    this.setValue(this.initialValue);
    // this.scaleСontrolValue.setAttribute('value', this.initialValue + '%');
    // this.scaleСontrolValue.value = this.initialValue + '%';
    this.image.style.transform = 'scale(' + this.initialValue / 100 + ')';
  };


  getChangePictureSize.default = function () {
    this.setValue(this.defaultValue);
  };

  getChangePictureSize.setValue = function (value) {
    this.scaleСontrolValue.setAttribute('value', value + '%');
    this.scaleСontrolValue.value = value + '%';
  };



  getChangePictureSize.init = function () {
    getChangePictureSize.default();

    getChangePictureSize.changeSizeImg = getChangePictureSize.changeSizeImg.bind(this);
    getChangePictureSize.btnSmaller.addEventListener('click', getChangePictureSize.changeSizeImg);
    getChangePictureSize.btnBigger.addEventListener('click', getChangePictureSize.changeSizeImg);
  };

  getChangePictureSize.removeListener = function () {
    getChangePictureSize.btnSmaller.removeEventListener('click', getChangePictureSize.changeSizeImg);
    getChangePictureSize.btnBigger.removeEventListener('click', getChangePictureSize.changeSizeImg);
  };

  getChangePictureSize.reset = function () {
    getChangePictureSize.default();
    getChangePictureSize.removeListener();
  };

  window.pictireSize = {
    reset: getChangePictureSize.reset,
    init: getChangePictureSize.init,
    getChangePictureSize: getChangePictureSize
  };

})();
