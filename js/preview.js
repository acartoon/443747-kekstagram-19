'use strict';

(function () {

  var templateComment = document.querySelector('.social__comment');
  var pictureDetail = document.querySelector('.big-picture');

  var renderComment = function (template, commentData) {
    var comment = template.cloneNode(true);
    var img = comment.querySelector('.social__picture');
    img.setAttribute('src', commentData.avatar);
    img.setAttribute('alt', commentData.name);
    comment.querySelector('.social__text').innerHTML = commentData.message;
    comment.querySelector('.social__picture').innerHTML = commentData.name;

    return comment;
  };

  var renderComments = function (render, comments, container) {
    comments.forEach(function (comment) {
      container.append(render(templateComment, comment));
    });
  };

  // отрисовывает детальную картинку
  var renderPictureDetail = function (photoData) {
    pictureDetail.querySelector('.big-picture__img > img').setAttribute('src', photoData.url);
    pictureDetail.querySelector('.likes-count').innerHTML = photoData.likes;
    pictureDetail.querySelector('.social__caption').innerHTML = photoData.description;
    pictureDetail.querySelector('.comments-count').innerHTML = photoData.comments.length;

    var commentsContainer = pictureDetail.querySelector('.social__comments');
    commentsContainer.innerHTML = '';

    renderComments(renderComment, photoData.comments, commentsContainer);
    // window.utils.onOpenPopup(pictureDetail);
    var modal = new window.Modal(pictureDetail);
    modal.open();
  };

  var bigPictureCommentsCount = pictureDetail.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = pictureDetail.querySelector('.comments-loader');

  window.utils.hiddenElement(bigPictureCommentsCount);
  window.utils.hiddenElement(bigPictureCommentsLoader);


  window.preview = {
    renderPictureDetail: renderPictureDetail
  };
})();
