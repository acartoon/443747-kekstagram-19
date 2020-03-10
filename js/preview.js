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
  var renderPictureDetail = function (photoMock) {
    pictureDetail.querySelector('.big-picture__img > img').setAttribute('src', photoMock.url);
    pictureDetail.querySelector('.likes-count').innerHTML = photoMock.likes;
    pictureDetail.querySelector('.social__caption').innerHTML = photoMock.description;
    pictureDetail.querySelector('.comments-count').innerHTML = photoMock.comment.length;

    var commentsContainer = pictureDetail.querySelector('.social__comments');
    commentsContainer.innerHTML = '';

    renderComments(renderComment, photoMock.comment, commentsContainer);
    window.utils.onOpenPopup(pictureDetail);
  };

  var bigPictureCommentsCount = pictureDetail.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = pictureDetail.querySelector('.comments-loader');

  window.utils.hiddenElement(bigPictureCommentsCount);
  window.utils.hiddenElement(bigPictureCommentsLoader);


  window.preview = {
    renderPictureDetail: renderPictureDetail
  }
})()