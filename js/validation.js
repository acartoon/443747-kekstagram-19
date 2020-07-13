'use strict';

(function () {
  var validation = {
    MAX_COUNT: 5,
    MAX_LENGTH: 20,
    MIN_LENGTH: 2,
    MAX_LENGTH_TEXTAREA: 140,
    HASHTAG_PATTERN: /[a-zA-Z0-9\u0400-\u04FF]+$/,
    input: document.querySelector('.text__hashtags'),
    textarea: document.querySelector('.text__description'),
    hash: '#',
    errors: []
  };

  validation.mistakes = {
    firstСharacter: 'Хэш-тег должен начинаться с символа #',
    hash: 'Хештеги должны разделяться пробелами',
    tagContent: 'Хештег должен состоять из букв и чисел, а также не может содержать пробелы, спецсимволы и тд',
    minLengtTags: 'Минимальное количество символов может быть не меньшье ' + validation.MIN_LENGTH + ' символов',
    maxLengtTags: 'Максимальное количество символов может быть не больше ' + validation.MAX_LENGTH + ' символов',
    doubleTags: 'Хештеги не могут использоваться дважды',
    maxCountTag: 'Максимальное количество хештегов не может быть больше ' + validation.MAX_COUNT
  };

  validation.splitTags = function (string) {
    var tagsArray = string.length > 0 ? string.toLowerCase().split(' ') : [];
    return tagsArray;
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
    return item.length <= validation.MAX_LENGTH ? true : false;
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

  validation.renderErrors = function (elem) {
    elem.style.border = '2px solid #ce2727';
  };

  validation.unrenderErrors = function (elem) {
    elem.style.border = null;
  };

  validation.checkAll = function (tagsArray) {
    if (!validation.checkCountTags(tagsArray)) {
      validation.pushErrorMessage(validation.mistakes.maxCountTag);
      validation.renderErrors(validation.input);
    } else {
      tagsArray.forEach(function (item) {
        if (!validation.checkMinLengtTags(item)) {
          validation.pushErrorMessage(validation.mistakes.minLengtTags);
        }

        if (!validation.checkFirstСharacter(item)) {
          validation.pushErrorMessage(validation.mistakes.firstСharacter);
        }

        if (!validation.checkHashNumber(item)) {
          validation.pushErrorMessage(validation.mistakes.hash);
        }

        if (!validation.checkMaxLengtTags(item)) {
          validation.pushErrorMessage(validation.mistakes.maxLengtTags);
        }

        if (!validation.checkTagsContent(item)) {
          validation.pushErrorMessage(validation.mistakes.tagContent);
        }

        if (!validation.checkDoubleTags(tagsArray)) {
          validation.pushErrorMessage(validation.mistakes.doubleTags);
        }

      }); // end foreach
      if (validation.errors.length === 0 && !validation.checkDoubleTags(tagsArray)) {
        validation.pushErrorMessage(validation.mistakes.doubleTags);
      }
    } // end else
  };

  validation.getValue = function (tags) {
    var tagsArray = validation.splitTags(tags);
    validation.checkAll(tagsArray);
  };

  // валидация комментария
  validation.onTextAreaKeyup = function (evt) {
    var textarea = evt.target;

    if (textarea.value.length > validation.MAX_LENGTH_TEXTAREA) {
      validation.textarea.setCustomValidity('Масимальная длина поля не более ' + validation.MAX_LENGTH_TEXTAREA + ' символов');
      validation.renderErrors(validation.textarea);
    } else {
      validation.textarea.setCustomValidity('');
      validation.unrenderErrors(validation.textarea);
    }
  };

  validation.onHashtagKeyup = function (evt) {
    var tags = evt.target.value.trim();

    // при вводе инпута обнуляется массив ошибок
    validation.errors = [];
    validation.getValue(tags);

    if (validation.errors.length !== 0) {
      validation.input.setCustomValidity(validation.errors.join('. \n'));
      validation.renderErrors(validation.input);
    } else {
      validation.unrenderErrors(validation.input);
      validation.input.setCustomValidity('');
      // window.UploadImgModal.onSubmit();
    }
  };


  window.validation = {
    onHashtagKeyup: validation.onHashtagKeyup,
    onTextAreaKeyup: validation.onTextAreaKeyup,
  };

})();
