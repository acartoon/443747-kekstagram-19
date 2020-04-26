'use strict';

(function () {

  var templateComment = document.querySelector('.social__comment');
  var pictureDetail = document.querySelector('.big-picture');
  var COMMENT_VALUE_STEP = 5;


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

  var initComments = function (render, comments, container) {
    var bigPictureCommentsLoader = pictureDetail.querySelector('.comments-loader');
    window.utils.hiddenElement(bigPictureCommentsLoader);

    var commentsToRender = comments.length > COMMENT_VALUE_STEP ? COMMENT_VALUE_STEP : comments.length;

    if (comments.length > COMMENT_VALUE_STEP) {
      window.utils.visibleElement(bigPictureCommentsLoader);

      bigPictureCommentsLoader.addEventListener('click', onBtnClick);
    }


    renderComments(render, comments.slice(0, commentsToRender), container);

    function onBtnClick(evt) {
      evt.preventDefault();

      renderComments(render, comments.slice(commentsToRender, commentsToRender + COMMENT_VALUE_STEP), container);
      commentsToRender += COMMENT_VALUE_STEP;

      if (commentsToRender > comments.length) {
        window.utils.hiddenElement(bigPictureCommentsLoader);
        bigPictureCommentsLoader.removeEventListener('click', onBtnClick);
      }
    }
  };

  // отрисовывает детальную картинку
  var renderPictureDetail = function (photoData) {
    pictureDetail.querySelector('.big-picture__img > img').setAttribute('src', photoData.url);
    pictureDetail.querySelector('.likes-count').innerHTML = photoData.likes;
    pictureDetail.querySelector('.social__caption').innerHTML = photoData.description;
    pictureDetail.querySelector('.comments-count').innerHTML = photoData.comments.length;

    var commentsContainer = pictureDetail.querySelector('.social__comments');
    commentsContainer.innerHTML = '';

    initComments(renderComment, photoData.comments, commentsContainer);
    // window.utils.onOpenPopup(pictureDetail);
    var modal = new window.Modal(pictureDetail);
    modal.open();
  };

  var bigPictureCommentsCount = pictureDetail.querySelector('.social__comment-count');

  window.utils.hiddenElement(bigPictureCommentsCount);

  window.preview = {
    renderPictureDetail: renderPictureDetail
  };
})();
