'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');


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

  var renderPhoto = function (photoData) {
    photoData.forEach(function (photo) {
      var photoBlock = window.picture.renderPhoto(photo);
      picturesContainer.append(photoBlock);
    });
  };


  window.backend.load(renderPhoto, errorHandler);

})();
