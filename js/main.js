'use strict';
// -------

var uploadFile = document.querySelector('.img-upload__input');
var uploaImgBlock = document.querySelector('.img-upload__overlay');

uploadFile.addEventListener('change', function () {
  onOpenPopup(uploaImgBlock);
});

// onOpenPopup(uploaImgBlock);
