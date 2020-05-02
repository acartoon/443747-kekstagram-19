'use strict';

(function () {

  var container = document.querySelector('.pictures');

  var render = function (photoData) {
    photoData.forEach(function (photo) {
      var photoBlock = new window.PhotoGallery(photo).init();
      container.append(photoBlock);
    });
  };

  window.renderGallery = render;
})();
