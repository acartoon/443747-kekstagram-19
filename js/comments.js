'use strict';

(function () {


  function Comment(data, template) {
    this._data = data;
    this._comment = template.cloneNode(true);
    this._img = this._comment.querySelector('.social__picture');
  }

  Comment.prototype.init = function () {
    this._img.setAttribute('src', this._data.avatar);
    this._img.setAttribute('alt', this._data.name);
    this._comment.querySelector('.social__text').textContent = this._data.message;
    this._comment.querySelector('.social__picture').textContent = this._data.name;
    return this._comment;
  };

  function RenderComments(data, container, btnLoadMore, renderComment) {
    this._container = container;
    this._data = data;
    this._btnLoadMore = btnLoadMore;
    this._COMMENT_VALUE_STEP = 5;
    this._valueToRender = this._COMMENT_VALUE_STEP;
    this._commentsToRender = [];
    this._render = this._render.bind(this);
    this._commentTemplate = document.querySelector('.social__comment');
    this._onBtnClick = this._onBtnClick.bind(this);
    this._renderComment = renderComment;
  }

  RenderComments.prototype.init = function () {
    this._container.innerHTML = '';
    window.utils.hiddenElement(this._btnLoadMore);
    this._valueToRender = this._data.length > this._COMMENT_VALUE_STEP ? this._COMMENT_VALUE_STEP : this._data.length;
    this._commentsToRender = this._data.slice(0, this._valueToRender);
    this._renderComment.data = this._valueToRender + ' из ';
    this._render(this._commentsToRender);
    if (this._data.length > this._COMMENT_VALUE_STEP) {
      window.utils.visibleElement(this._btnLoadMore);

      this._btnLoadMore.addEventListener('click', this._onBtnClick);
    }
  };

  RenderComments.prototype._onBtnClick = function (evt) {
    evt.preventDefault();
    this._commentsToRender = this._data.slice(this._valueToRender, this._valueToRender + this._COMMENT_VALUE_STEP);
    this._render(this._commentsToRender);
    var nextStep = this._valueToRender + this._COMMENT_VALUE_STEP;
    this._valueToRender = nextStep > this._data.length ? this._data.length : nextStep;
    this._renderComment.data = this._valueToRender + ' из ';

    if (this._valueToRender >= this._data.length) {
      window.utils.hiddenElement(this._btnLoadMore);
      this._btnLoadMore.removeEventListener('click', this._onBtnClick);
    }
  };

  RenderComments.prototype._render = function (commetnsData) {
    commetnsData.forEach(function (commentData) {
      var comment = new Comment(commentData, this._commentTemplate).init();
      this._container.append(comment);
    }.bind(this));
  };

  window.RenderComments = {
    RenderComments: RenderComments
  };
})();
