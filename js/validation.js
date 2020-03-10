'use strict';

(function () {
  var validation = {
    MAX_COUNT: 5,
    MAX_LENGTH: 20,
    MIN_LENGTH: 2,
    tagsArray: [],
    HASHTAG_PATTERN: /^#[a-zA-Z0-9\u0400-\u04FF]+$/,
    hash: '#',
    input: document.querySelector('.text__hashtags'),
    mistakes: {
      firstСharacter: 'Хэш-тег начинается с символа #',
      hash: 'Символ # может быть только вначале хештега',
      tagContent: 'Хештеги состоять из букв и чисел и не может содержать пробелы, спецсимволы и тд',
      minLengtTags: 'Минимальное количество символов может быть не меньшье ' + 2 + ' символов',
      maxLengtTags: 'Максимальное количество символов может быть не больше ' + 20 + ' символов',
      doubleTags: 'Хештеги не могут использоваться дважды',
      maxCountTag: 'Максимальное количество хештегов не может быть больше ' + 5
    },
    errors: []
  };

  validation.splitTags = function (string) {
    validation.tagsArray = string.toLowerCase().split(' ');
  };

  // теги начинаются с решетки
  validation.checkFirstСharacter = function (item) {
    return item[0] === validation.hash ? true : false;
  };

  // решетка только в начале тега
  validation.checkHashNumber = function (item) {
    return item.indexOf(validation.hash, 1) === -1;
  };

  // длина одного тега не больше 20 знаков
  validation.checkMaxLengtTags = function (item) {
    return item.length < validation.MAX_LENGTH ? true : false;
  };

  // длина одного тега не меньше 1 знака
  validation.checkMinLengtTags = function (item) {
    return item.length >= validation.MIN_LENGTH ? true : false;
  };

  // тег содержит только буквы и цифры
  validation.checkTagsContent = function (item) {
    return validation.HASHTAG_PATTERN.test(item);
  };

  // максимальное количество тегов
  validation.checkCountTags = function (array) {
    return array.length <= validation.MAX_COUNT ? true : false;
  };

  // повторы одинаковых тегов
  validation.checkDoubleTags = function (array) {
    return array.every(function (item, ind) {
      return array.indexOf(item) === ind;
    });
  };

  // добавление ошибок в массив ошибок
  validation.pushErrorMessage = function (errorMessages) {
    if (validation.errors.indexOf(errorMessages) === -1) {
      validation.errors.push(errorMessages);
    }
  };

  validation.chackAll = function (array) {
    if (!validation.checkCountTags(array)) {
      validation.pushErrorMessage(validation.mistakes.maxCountTag);
    } else {
      array.forEach(function (item) {
        if (!validation.checkFirstСharacter(item)) {
          validation.pushErrorMessage(validation.mistakes.firstСharacter);
        }
        if (!validation.checkHashNumber(item)) {
          validation.pushErrorMessage(validation.mistakes.hash);
        }
        if (!validation.checkTagsContent(item)) {
          validation.pushErrorMessage(validation.mistakes.tagContent);
        }
        if (!validation.checkMaxLengtTags(item)) {
          validation.pushErrorMessage(validation.mistakes.maxLengtTags);
        }
        if (!validation.checkMinLengtTags(item)) {
          validation.pushErrorMessage(validation.mistakes.minLengtTags);
        }
      });
      if (validation.errors.length === 0) {
        if (!validation.checkDoubleTags(validation.tagsArray)) {
          validation.pushErrorMessage(validation.mistakes.doubleTags);
        }
      }
    }
  };

  validation.getValue = function () {
    var inputValue = validation.input.value;
    validation.splitTags(inputValue);
    validation.chackAll(validation.tagsArray);
  };

  validation.init = function () {
    validation.input.addEventListener('keyup', function () {
      validation.errors = [];
      validation.getValue();
      if (validation.errors.length !== 0) {
        validation.input.setCustomValidity(validation.errors.join('\n'));
      } else {
        validation.input.setCustomValidity('');
      }
    });
  };

  validation.init();
})();

