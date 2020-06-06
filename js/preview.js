'use strict';

(function () {

  function PreviewPicture(data) {
    this._photoData = data;
    this._template = document.querySelector('.big-picture');
    this._btnLoader = this._template.querySelector('.comments-loader');
  }

  PreviewPicture.prototype._renderPicture = function () {
    this._template.querySelector('.big-picture__img > img').setAttribute('src', this._photoData.url);
    this._template.querySelector('.likes-count').textContent = this._photoData.likes;
    this._template.querySelector('.social__caption').textContent = this._photoData.description;
    this._template.querySelector('.comments-count').textContent = this._photoData.comments.length;
  };

  PreviewPicture.prototype._renderComments = function () {
    var commentCount = this._template.querySelector('.social__comment-count').firstChild;
    var commentsContainer = this._template.querySelector('.social__comments');
    var comments = new window.RenderComments.RenderComments(this._photoData.comments, commentsContainer, this._btnLoader, commentCount);
    comments.init();
  };

  PreviewPicture.prototype.init = function () {
    this._renderPicture();
    this._renderComments();
    var modal = new window.Modal(this._template);
    modal.open();
  };

  window.PreviewPicture = PreviewPicture;
})();
