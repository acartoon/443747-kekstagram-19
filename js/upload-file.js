'use strict';

(function () {

  var uploadFile = {
    input: document.querySelector('.img-upload__input'),
    preview: document.querySelector('.img-upload__preview > img')
  };

  uploadFile.onChangeInput = function () {
    document.querySelector('.img-upload__preview > img').src = '';

    var file = uploadFile.input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.utils.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadFile.preview.src = reader.result;

      });
      reader.readAsDataURL(file);
    }
  };
  window.uploadFile = uploadFile.onChangeInput;

})();
