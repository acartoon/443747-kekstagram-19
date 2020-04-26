'use strict';

(function () {

  var KEYS = {
    ESCAPE: 'Escape',
    ESC: 'Esc'
  };

  // добавляет класс hidden
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
    KEYS: KEYS,
    hiddenElement: hiddenElement,
    visibleElement: visibleElement,
    getRandomElements: getRandomElements
  };

})();
