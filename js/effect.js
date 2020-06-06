'use strict';

(function () {

  var pictureEffects = {
    form: document.querySelector('.img-upload__form'),
    sliderContainer: document.querySelector('.effect-level'),
    depth: document.querySelector('.effect-level__depth'),
    image: document.querySelector('.img-upload__preview > img'),
    switches: document.querySelectorAll('.effects__radio'),
    value: 1,
    defaultValue: 100,
    activeEffect: 'none',
    activeFilter: null,
    DEFAULT_EFFECT: 'none'
  };

  pictureEffects.getFilterProperty = function (sliderValue) {
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

  // состояние по умолчанию
  pictureEffects.defaultState = function () {
    pictureEffects.image.classList = '';
    pictureEffects.image.style.filter = null;
    pictureEffects.image.src = '';
  };

  // применение фильтров на изображение
  pictureEffects.onClickSwitch = function (evt) {
    var effect = evt.target.getAttribute('value');
    pictureEffects.activeFilter = evt.target;

    if (effect === 'none') {
      window.slider.hide();
    } else {
      window.slider.visible();
    }
    pictureEffects.applyFilter(effect);
  };

  // применяется нужный класс исходя из фильтра / отображать скрывать фильтр
  pictureEffects.applyFilter = function (effect) {
    pictureEffects.activeEffect = effect;

    var filterProperty = pictureEffects.getFilterProperty(pictureEffects.activeEffect);
    pictureEffects.image.className = filterProperty.name;
    if (effect === pictureEffects.DEFAULT_EFFECT) {
      window.slider.default();
    } else {
      window.slider.visible();
      window.slider.initialPosition();
    }
  };

  // применение насыщенности фильтра
  pictureEffects.applyFilterSaturation = function (value) {
    var filterProperty = pictureEffects.getFilterProperty(value);
    pictureEffects.image.style.filter = filterProperty.filterProperty;
  };

  // инициализация применения эффектов
  pictureEffects.reset = function () {
    pictureEffects.switches.forEach(function (input) {
      input.removeEventListener('click', pictureEffects.onClickSwitch);
    });
    pictureEffects.defaultState();
    pictureEffects.form.reset();
  };

  pictureEffects.init = function () {
    pictureEffects.switches.forEach(function (input) {
      input.addEventListener('click', pictureEffects.onClickSwitch);
    });
  };

  window.effect = {
    reset: pictureEffects.reset,
    init: pictureEffects.init,
    applyFilterSaturation: pictureEffects.applyFilterSaturation
  };
})();
