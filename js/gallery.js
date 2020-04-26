'use strict';

(function () {

  var container = document.querySelector('.pictures');

  var renderPhoto = function (photoData) {
    photoData.forEach(function (photo) {
      var photoBlock = window.picture.renderPhoto(photo);
      container.append(photoBlock);
    });
  };

  window.gallery = {
    renderPhoto: renderPhoto,
  };
})();
