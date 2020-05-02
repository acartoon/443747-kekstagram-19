'use strict';

(function () {

  var KEYS_CODE = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var hiddenElement = function (element) {
    element.classList.add('hidden');
  };

  var visibleElement = function (element) {
    element.classList.remove('hidden');
  };

  var getRandomValue = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  var getRandomElements = function (count, min, max) {
    var result = [];
    while (result.length < count) {
      var value = getRandomValue(min, max);
      if (!result.includes(value)) {
        result.push(value);
      }
    }
    return result;
  };

  window.utils = {
    KEYS: KEYS_CODE,
    FILE_TYPES: FILE_TYPES,
    hiddenElement: hiddenElement,
    visibleElement: visibleElement,
    getRandomElements: getRandomElements
  };

})();
