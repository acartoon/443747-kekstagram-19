'use strict';

(function () {

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 20px 0';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  var data = [];

  var onLoadHandler = function (photoData) {
    data = photoData;
    console.log(data)
    window.gallery.renderPhoto(data);
    window.sort.getSort(data);
  };

  onLoadHandler(window.data.photosMock);
  // window.backend.load(onLoadHandler, errorHandler);


})();
