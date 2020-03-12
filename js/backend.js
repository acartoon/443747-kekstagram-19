'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var STATUS_OK = 200;
  var TIMEOUT = 10000; // 10 секунд
  var TYPE = 'json';

  var configureXhr = function (xhr, onLoad, onError) {
    xhr.responseType = TYPE;
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
    configureXhr(xhr, onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  var onSend = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    configureXhr(xhr, onLoad, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    onSend: onSend
  };
})();
