'use strict';

(function () {
  var URL_ADRESS = {
    LOAD: 'https://javascript.pages.academy/kekstagram/data',
    SEND: 'https://javascript.pages.academy/kekstagram'
  };

  var METHOD = {
    POST: 'POST',
    GET: 'GET'
  };

  var STATUS_OK = 200;
  var TIMEOUT = 10000; // 10 секунд
  var TYPE = {
    JSON: 'json',
    FORM: 'multipart/form-data'
  };

  var configureXhr = function (xhr, onLoad, onError, type) {
    xhr.responseType = type;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
  };


  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    configureXhr(xhr, onLoad, onError, TYPE.JSON);
    xhr.open(METHOD.GET, URL_ADRESS.LOAD);
    xhr.send();
  };

  var onSend = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    configureXhr(xhr, onLoad, onError, TYPE.JSON);
    xhr.open(METHOD.POST, URL_ADRESS.SEND);
    xhr.send(data);
  };

  var showSuccessMessage = function () {
    var template = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    var success = new window.Notice(template);
    success.init();
  };

  var showErrorMessage = function () {
    var template = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var error = new window.Notice(template);
    error.init();
  };

  window.backend = {
    load: load,
    onSend: onSend,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
