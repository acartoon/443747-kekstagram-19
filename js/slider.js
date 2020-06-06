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
    KEYS: {
      leftArrow: 37,

    }
  };

  slider.defaultValue = slider.MAX_VALUE;
  // применение значений по умолчанию значение 100% и без эффекта
  slider.sliderValue = slider.defaultValue;

  slider.initialPositionSlider = function () {
    // устанавливает положение слайдера по умолчанию на 100%
    slider.updateSliderPosition(slider.defaultValue);
  };

  // применение значений по умолчанию значение 100% и без эффекта
  slider.default = function () {
    slider.hideSlider();
    slider.initialPositionSlider();
  };

  // передвижение ползунка и передача значения в фукнцию по применению эффектов
  slider.mousedown = function (evt) {
    evt.preventDefault();
    var pinCoordX = slider.pin.getBoundingClientRect().left;
    var shiftX = evt.clientX - pinCoordX;

    var pinContainerLeft = slider.pinContainer.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      var newLeft = event.pageX - shiftX - pinContainerLeft;
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
      slider.updateSliderPosition(value);
    }

    function onMouseUp() {
      slider.pin.focus();
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  // при нажатии
  slider.onClickArrows = function (evt) {
    if (evt.key === window.utils.KEYS.ARROW_LEFT) {
      var stepBack = slider.sliderValue - slider.STEP_ONCLICK;
      slider.sliderValue = (stepBack <= slider.MIN_VALUE) ? slider.MIN_VALUE : stepBack;
    } else if (evt.key === window.utils.KEYS.ARROW_RIGHT) {
      var stepForward = slider.sliderValue + slider.STEP_ONCLICK;
      slider.sliderValue = (stepForward >= slider.MAX_VALUE) ? slider.MAX_VALUE : stepForward;
    }
    slider.updateSliderPosition(slider.sliderValue);
  };

  // обновление позиции слайдера исходя из получаемого значения
  slider.updateSliderPosition = function (value) {
    slider.pin.style.left = value + '%';
    window.effect.applyFilterSaturation(value);
    slider.depth.style.width = value + '%';
    slider.pinValue.setAttribute('value', value);
  };

  // скрытие слайдера
  slider.hideSlider = function () {
    slider.sliderContainer.classList.add('visually-hidden');
  };

  // отображение слайдера
  slider.visibleSlider = function () {
    slider.sliderContainer.classList.remove('visually-hidden');
  };

  slider.onPinFocus = function () {
    document.addEventListener('keydown', slider.onClickArrows);
  };

  // инициализация применения эффектов
  slider.init = function () {
    slider.default();
    slider.pin.setAttribute('tabindex', 0);
    slider.mousedown = slider.mousedown.bind(this);
    slider.pin.addEventListener('focus', slider.onPinFocus);
    slider.pin.addEventListener('mousedown', slider.mousedown);
  };

  slider.reset = function () {
    slider.default();
    slider.pin.removeEventListener('focus', slider.onPinFocus);
    slider.pin.removeEventListener('mousedown', slider.mousedown);
  };

  window.slider = {
    default: slider.default,
    init: slider.init,
    hide: slider.hideSlider,
    visible: slider.visibleSlider,
    initialPosition: slider.initialPositionSlider,
    reset: slider.reset
  };
})();
