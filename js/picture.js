'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__info').inerHTML = photo.description;
    photoElement.querySelector('.picture__likes').inerHTML = photo.likes;

    photoElement.addEventListener('click', function () {
      window.preview.renderPictureDetail(photo);
    });

    return photoElement;
  };

  window.picture = {
    renderPhoto: renderPhoto
  };


  //  ///////

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview > img');

  fileChooser.addEventListener('change', function () {
    document.querySelector('.img-upload__preview > img').src = '';

    var effectsPreview = document.querySelectorAll('.effects__preview');

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        // effectsPreview.forEach(function (item) {
        //   item.style.backgroundImage = 'url('  + reader.result + ')';
        // });
      });

      reader.readAsDataURL(file);
    }
  });


})();

