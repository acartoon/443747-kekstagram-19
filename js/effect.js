'use strict';

(function () {

  var getFilterProperty = function (sliderValue) {
    var heat = 1 + 2 * (sliderValue / 100);
    var effects = {
      none: {
        name: '',
        filterProperty: ''
      },
      chrome: {
        filterProperty: 'grayscale(' + sliderValue / 100 + ')',
        name: 'effects__preview--chrome'
      },
      sepia: {
        filterProperty: 'sepia(' + sliderValue / 100 + ')',
        name: 'effects__preview--sepia'
      },
      marvin: {
        filterProperty: 'invert(' + sliderValue + '%)',
        name: 'effects__preview--marvin'
      },
      phobos: {
        filterProperty: 'blur(' + sliderValue / 100 * 3 + 'px)',
        name: 'effects__preview--phobos'
      },
      heat: {
        filterProperty: 'brightness(' + heat + ')',
        name: 'effects__preview--heat'
      }
    };
    return effects[pictureEffects.activeEffect];
  };

  // инициализация
  var pictureEffects = {
    pin: document.querySelector('.effect-level__pin'),
    pinValue: document.querySelector('.effect-level__value'),
    sliderContainer: document.querySelector('.effect-level'),
    depth: document.querySelector('.effect-level__depth'),
    pinContainer: document.querySelector('.effect-level__line'),
    image: document.querySelector('.img-upload__preview > img'),
    value: 1,
    defaultValue: 100,
    activeEffect: 'none',
  };

  // применение значений по умолчанию значение 100% и без эффекта
  pictureEffects.default = function () {
    // скрывает слайдер
    pictureEffects.hiddenSlider();

    // отменяет выбранные значения
    document.querySelectorAll('[name="effect"]').forEach(function (element) {
      element.checked = false;
    });

    // устанавливает значение по умолчанию
    var defaultElem = document.querySelector('#effect-none');
    defaultElem.checked = true;

    // устанавливает положение слайдера по умолчанию на 100%
    pictureEffects.setSliderValue(pictureEffects.defaultValue);

    // устанавливает параметр фильтра
    pictureEffects.setValue(pictureEffects.defaultValue);

  };

  // передвижение ползунка и передача значения в фукнцию по применению эффектов
  pictureEffects.mousedown = function (evt) {

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

      // значение в % положения слайдера и параметров фильтра
      var value = Math.floor(newLeft / pictureEffects.pinContainer.getBoundingClientRect().width * 100);

      // устанавливает положение слайдера
      pictureEffects.setSliderValue(value);

      // устанавливает значение активного фильтра
      pictureEffects.setValue(value);
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  // устанавливает позицию слайдера исходя из получаемого значения в %
  pictureEffects.setSliderValue = function (value) {
    pictureEffects.pin.style.left = value + '%';
    pictureEffects.setValue(value);
    pictureEffects.depth.style.width = value + '%';
    pictureEffects.pinValue.setAttribute('value', value);
  };

  // срабатывание функции при нажатии на фильтры
  pictureEffects.toAddClass = function () {
    var switches = document.querySelectorAll('.effects__radio');
    switches.forEach(function (input) {
      input.addEventListener('click', pictureEffects.onClickSwitch);
    });
  };

  // скрытие отображение слайдера при нажатии на фильтры, применения фильтра
  pictureEffects.onClickSwitch = function (evt) {
    var effect = evt.target.getAttribute('value');
    if (effect === 'none') {
      pictureEffects.hiddenSlider();
    } else {
      pictureEffects.visibleSlider();
    }
    pictureEffects.initFilter(effect);
  };

  // применяется нужный класс исходя их фильтра
  pictureEffects.initFilter = function (effect) {
    pictureEffects.activeEffect = effect;

    var filterProperty = getFilterProperty(pictureEffects.activeEffect, pictureEffects.defaultValue);
    // добавляет нужный класс исходя из эффекта
    pictureEffects.image.className = filterProperty.name;
    pictureEffects.setSliderValue(pictureEffects.defaultValue);
  };

  // скрытие слайдера
  pictureEffects.hiddenSlider = function () {
    pictureEffects.sliderContainer.classList.add('visually-hidden');
  };

  // отображение слайдера
  pictureEffects.visibleSlider = function () {
    pictureEffects.sliderContainer.classList.remove('visually-hidden');
  };

  // функция по переключению эффектов
  pictureEffects.setValue = function (value) {
    var filterProperty = getFilterProperty(value);
    pictureEffects.image.style.filter = filterProperty.filterProperty;
  };

  // инициализация применения эффектов
  pictureEffects.init = function () {
    pictureEffects.default();
    this.toAddClass();
    pictureEffects.pin.addEventListener('mousedown', function (evt) {
      pictureEffects.mousedown(evt);
    });
  };

  pictureEffects.init();

  window.effect = {
    default: pictureEffects.default
  };

})();
