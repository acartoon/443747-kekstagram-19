'use strict';

(function () {

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

  getChangePictureSize.setValue = function (value) {
    getChangePictureSize.scaleСontrolValue.setAttribute('value', value + '%');
    getChangePictureSize.scaleСontrolValue.value = value + '%';
  };

  getChangePictureSize.onBtnSmallerClick = function () {
    getChangePictureSize.initialValue = getChangePictureSize.initialValue - getChangePictureSize.STEP_CHANGE;
    if (getChangePictureSize.initialValue < getChangePictureSize.MIN_STEP) {
      getChangePictureSize.initialValue = getChangePictureSize.MIN_STEP;
    }
    getChangePictureSize.setValue(getChangePictureSize.initialValue);
    getChangePictureSize.image.style.transform = 'scale(' + getChangePictureSize.initialValue / 100 + ')';
  };

  getChangePictureSize.onBtnBiggerClick = function () {
    getChangePictureSize.initialValue = getChangePictureSize.initialValue + getChangePictureSize.STEP_CHANGE;

    if (getChangePictureSize.initialValue > getChangePictureSize.MAX_STEP) {
      getChangePictureSize.initialValue = getChangePictureSize.MAX_STEP;
    }

    getChangePictureSize.setValue(getChangePictureSize.initialValue);
    getChangePictureSize.image.style.transform = 'scale(' + getChangePictureSize.initialValue / 100 + ')';
  };

  getChangePictureSize.defaultParams = function () {
    getChangePictureSize.setValue(getChangePictureSize.defaultValue);
  };

  getChangePictureSize.init = function () {
    getChangePictureSize.defaultParams();

    getChangePictureSize.onBtnSmallerClick = getChangePictureSize.onBtnSmallerClick.bind(this);
    getChangePictureSize.onBtnBiggerClick = getChangePictureSize.onBtnBiggerClick.bind(this);

    getChangePictureSize.btnSmaller.addEventListener('click', getChangePictureSize.onBtnSmallerClick);
    getChangePictureSize.btnBigger.addEventListener('click', getChangePictureSize.onBtnBiggerClick);
  };

  getChangePictureSize.removeListeners = function () {
    getChangePictureSize.btnSmaller.removeEventListener('click', getChangePictureSize.onBtnSmallerClick);
    getChangePictureSize.btnBigger.removeEventListener('click', getChangePictureSize.onBtnBiggerClick);
  };

  getChangePictureSize.reset = function () {
    getChangePictureSize.defaultParams();
    getChangePictureSize.removeListeners();
  };

  window.pictireSize = {
    reset: getChangePictureSize.reset,
    init: getChangePictureSize.init,
    getChangePictureSize: getChangePictureSize
  };
})();
