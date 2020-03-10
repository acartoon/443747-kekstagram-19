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
  }

})();
