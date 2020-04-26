'use strict';

(function () {
  // инициализация
  var slider = {
    form: document.querySelector('.img-upload__form'),
    pin: document.querySelector('.effect-level__pin'),
    pinValue: document.querySelector('.effect-level__value'),
    sliderContainer: document.querySelector('.effect-level'),
    depth: document.querySelector('.effect-level__depth'),
    pinContainer: document.querySelector('.effect-level__line'),
    image: document.querySelector('.img-upload__preview > img'),
    value: 1,
    activeEffect: 'none',
    activeFilter: null,
    STEP_ONCLICK: 10,
    MIN_VALUE: 0,
    MAX_VALUE: 100,
  };

  slider.defaultValue = slider.MAX_VALUE;
  // применение значений по умолчанию значение 100% и без эффекта
  slider.sliderValue = slider.defaultValue;

  slider.initial = function () {
    // устанавливает положение слайдера по умолчанию на 100%
    slider.setSliderValue(slider.defaultValue);
  }

  // применение значений по умолчанию значение 100% и без эффекта
  slider.default = function () {
    // скрывает слайдер
    slider.hiddenSlider();
    slider.initial();
  };

  // передвижение ползунка и передача значения в фукнцию по применению эффектов
  slider.mousedown = function (evt) {

    evt.preventDefault();
    var pinCoordX = this.pin.getBoundingClientRect().left;

    var pinContainerLeft = this.pinContainer.getBoundingClientRect().left;
    var shiftX = event.clientX - pinCoordX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove() {
      var newLeft = event.clientX - shiftX - pinContainerLeft;
      if (newLeft < slider.MIN_VALUE) {
        newLeft = slider.MIN_VALUE;
      }

      var maxValue = slider.pinContainer.getBoundingClientRect().width;
      if (newLeft > maxValue) {
        newLeft = maxValue;
      }

      // значение в % положения слайдера и параметров фильтра
      var value = Math.floor(newLeft / slider.pinContainer.getBoundingClientRect().width * slider.MAX_VALUE);
      slider.sliderValue = value;
      // устанавливает положение слайдера
      slider.setSliderValue(value);

      // устанавливает значение активного фильтра
      window.effect.setValue(value);
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  // при нажатии
  slider.onClick = function (evt) {
    if (evt.keyCode === 37) {
      slider.sliderValue = (slider.sliderValue <= slider.MIN_VALUE) ? slider.MIN_VALUE : slider.sliderValue - slider.STEP_ONCLICK;
      // sliderValue -= STEP_ONCLICK;
      // if (sliderValue < 0) {
      //   sliderValue = 0;
      // }
    } else if (evt.keyCode === 39) {
      slider.sliderValue = (slider.sliderValue >= slider.MAX_VALUE) ? slider.MAX_VALUE : slider.sliderValue + slider.STEP_ONCLICK;
    }
    slider.setSliderValue(slider.sliderValue);
  }

  // устанавливает позицию слайдера исходя из получаемого значения в %
  slider.setSliderValue = function (value) {
    slider.pin.style.left = value + '%';
    window.effect.setValue(value);
    slider.depth.style.width = value + '%';
    slider.pinValue.setAttribute('value', value);
  };


  // скрытие слайдера
  slider.hiddenSlider = function () {
    slider.sliderContainer.classList.add('visually-hidden');
  };

  // отображение слайдера
  slider.visibleSlider = function () {
    slider.sliderContainer.classList.remove('visually-hidden');
  };

  // инициализация применения эффектов
  slider.init = function () {
    slider.pin.setAttribute('tabindex', 0);
    slider.pin.addEventListener('focus', function () {
      document.addEventListener('keydown', slider.onClick);
    });
    slider.default();
    slider.pin.addEventListener('mousedown', function (evt) {
      slider.mousedown(evt);
    });
  };

  slider.init();

  window.slider = {
    default: slider.default,
    init: slider.init,
    hide: slider.hiddenSlider,
    visible: slider.visibleSlider,
    initial: slider.initial
  };
})();
