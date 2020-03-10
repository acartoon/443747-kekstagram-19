'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');

  window.data.photosMock.forEach(function (photo) {
    var photoBlock = window.picture.renderPhoto(photo);
    picturesContainer.append(photoBlock);
  });
})()