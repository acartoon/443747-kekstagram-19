'use strict';

(function () {
  var pictureEffects = {
    pin: document.querySelector('.effect-level__pin'),
    pinValue: document.querySelector('.effect-level__value'),
    sliderContainer: document.querySelector('.effect-level'),
    depth: document.querySelector('.effect-level__depth'),
    pinContainer: document.querySelector('.effect-level__line'),
    image: document.querySelector('.img-upload__preview > img'),
    value: 1,
    activeEffect: 'none',
    effects: {
      none: 'none',
      chrome: 'grayscale',
      sepia: 'sepia',
      marvin: 'invert',
      phobos: 'blur',
      heat: 'brightness'
    }
  };
  
  pictureEffects.mousedown = function (evt) {
    console.log('click')
  
    evt.preventDefault();
    var pinCoordX = this.pin.getBoundingClientRect().left;
  
    var pinContainerLeft = this.pinContainer.getBoundingClientRect().left;
    var shiftX = event.clientX - pinCoordX;
  
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  
    function onMouseMove() {
      var newLeft = event.clientX - shiftX - pinContainerLeft;
      if (newLeft < 0) {
        newLeft = 0;
      }
  
      var maxValue = pictureEffects.pinContainer.getBoundingClientRect().width;
      if (newLeft > maxValue) {
        newLeft = maxValue;
      }
  
      pictureEffects.setSliderValue(newLeft);
    }
  
    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };
  
  pictureEffects.setSliderValue = function (value) {
    pictureEffects.pin.style.left = value + 'px';
    pictureEffects.value = Math.floor(value / pictureEffects.pinContainer.getBoundingClientRect().width * 100);
    pictureEffects.setValue(pictureEffects.value);
    pictureEffects.depth.style.width = pictureEffects.value + '%';
    pictureEffects.pinValue.setAttribute('value', pictureEffects.value);
  };
  
  pictureEffects.toAddClass = function () {
    document.addEventListener('click', function (evt) {
      if (evt.target.matches('input[type="radio"]')) {
        var value = evt.target.getAttribute('value');
        pictureEffects.activeEffect = value;
        var classAdd = (value !== pictureEffects.effects.none) ? 'effects__preview--' + value : '';
        pictureEffects.image.className = classAdd;
        pictureEffects.setValue(100);
        pictureEffects.setSliderValue(pictureEffects.pinContainer.getBoundingClientRect().width);
      }
    });
  };
  
  pictureEffects.hiddenSlider = function () {
    pictureEffects.sliderContainer.classList.add('visually-hidden');
  };
  
  pictureEffects.visibleSlider = function () {
    pictureEffects.sliderContainer.classList.remove('visually-hidden');
  };
  
  pictureEffects.setValue = function (value) {
    var styleName = pictureEffects.activeEffect;
    var set = {
      none: 'none',
      chrome: value / 100,
      sepia: value / 100,
      marvin: value + '%',
      phobos: value / 100 * 3 + 'px',
      heat: 1 + 2 * value / 100
    };

    if (styleName === 'none') {
      pictureEffects.image.style.filter = null;
      pictureEffects.hiddenSlider();
    } else {
      pictureEffects.image.style.filter = pictureEffects.effects[styleName] + '(' + set[styleName] + ')';
      pictureEffects.visibleSlider();
    }
  };
  
  pictureEffects.init = function () {
    pictureEffects.hiddenSlider();
    this.toAddClass();
    pictureEffects.pin.addEventListener('mousedown', function (evt) {
      pictureEffects.mousedown(evt);
    });
  };
  
  pictureEffects.init();
})();