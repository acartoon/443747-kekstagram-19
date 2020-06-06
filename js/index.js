'use strict';

(function () {

  var uploadFile = document.querySelector('.img-upload__input');
  var uploadImgBlock = document.querySelector('.img-upload__overlay');
  var uploadImage = new window.UploadImgModal(uploadImgBlock);

  // инициализация открытия модального окна загрузки фото
  uploadFile.addEventListener('change', function () {
    window.uploadFile();
    uploadImage.init();
  });

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


  var onLoadHandler = function (photoData) {
    var data = photoData;
    window.renderGallery(data);
    var sort = new window.Sort(data);
    sort.init();
  };

  // onLoadHandler(window.data.photosMock);
  window.backend.load(onLoadHandler, errorHandler);

})();
