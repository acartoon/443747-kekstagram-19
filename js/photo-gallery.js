'use strict';

(function () {

  function PhotoGallery(data) {
    this._photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    this._photoElement = this._photoTemplate.cloneNode(true);
    this._data = data;
  }

  PhotoGallery.prototype.init = function () {
    this._photoElement.querySelector('.picture__img').setAttribute('src', this._data.url);
    this._photoElement.querySelector('.picture__comments').textContent = this._data.comments.length;
    this._photoElement.querySelector('.picture__likes').textContent = this._data.likes;
    this._photoElement.addEventListener('click', this._onClick.bind(this));

    return this._photoElement;
  };

  PhotoGallery.prototype._onClick = function () {
    var preview = new window.PreviewPicture(this._data);
    preview.init();
  };

  window.PhotoGallery = PhotoGallery;

})();
