'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000; // 10 секунд
  var TYPE = 'json';

  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open('GET', url);
    xhr.send();
  };


  window.load(URL, onSuccess, onError);

  function onSuccess(data) {
    console.log(data);
  }

  function onError(data) {
    console.log(data);
  }

})();
