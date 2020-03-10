'use strict';

(function () {

  var uploadFile = document.querySelector('.img-upload__input');
  var uploaImgBlock = document.querySelector('.img-upload__overlay');

  uploadFile.addEventListener('change', function () {
    window.utils.onOpenPopup(uploaImgBlock);
  });

  var getChangePictureSize = {
    scaleСontrolValue: document.querySelector('.scale__control--value'),
    btnSmaller: document.querySelector('.scale__control--smaller'),
    btnBigger: document.querySelector('.scale__control--bigger'),
    image: document.querySelector('.img-upload__preview > img'),
    STEP_CHANGE: 25,
    MAX_STEP: 100,
    MIN_STEP: 25,
    initialValue: 100,
    STATES: {
      smaller: 'smaller',
      bigger: 'bigger'
    }
  };
  
  getChangePictureSize.onClick = function (btn, state) {
    btn.addEventListener('click', function () {
      getChangePictureSize.changeSizeImg(state);
    });
  };
  
  getChangePictureSize.changeSizeImg = function (state) {
    this.initialValue = (state === this.STATES.smaller) ? this.initialValue - this.STEP_CHANGE : this.initialValue + this.STEP_CHANGE;
    if (this.initialValue > this.MAX_STEP) {
      this.initialValue = this.MAX_STEP;
    }
  
    if (this.initialValue < this.MIN_STEP) {
      this.initialValue = this.MIN_STEP;
    }
  
    this.scaleСontrolValue.value = this.initialValue + '%';
    this.image.style.transform = 'scale(' + this.initialValue / 100 + ')';
  };
  
  getChangePictureSize.init = function () {
    this.scaleСontrolValue.value = this.initialValue + '%';
    this.onClick(this.btnSmaller, this.STATES.smaller);
    this.onClick(this.btnBigger, this.STATES.bigger);
  };
  
  getChangePictureSize.init();

})();