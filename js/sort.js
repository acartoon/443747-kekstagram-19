'use strict';

(function () {

  function Sort(data) {
    this._data = data;
    this._CLASS_ACTIVE = 'img-filters__button--active';
    this._activeBtn = document.querySelector('.' + this._CLASS_ACTIVE);
    this._filterContainer = document.querySelector('.img-filters');
    this._buttons = document.querySelectorAll('.img-filters__form > button');
    this._onClick = this._onClick.bind(this);
    this._COUNT_PHOTO = 10;
  }

  Sort.prototype._showSortBtn = function () {
    this._filterContainer.classList.remove('img-filters--inactive');
  };

  Sort.prototype._getRandomPhoto = function (data, count) {
    var randomArray = window.utils.getRandomElements(count, 1, data.length - 1);

    return randomArray.reduce(function (array, item) {
      array.push(data[item]);
      return array;
    }, []);
  };

  Sort.prototype._getDiscussedPhoto = function (data) {
    return data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  Sort.prototype._getSortPhoto = function (filterType) {
    var setFilter = {
      'filter-default': this._data,
      'filter-random': this._getRandomPhoto(this._data, this._COUNT_PHOTO),
      'filter-discussed': this._getDiscussedPhoto(this._data)
    };
    return setFilter[filterType];
  };

  Sort.prototype._clearGallery = function () {
    var pictures = document.querySelectorAll('.pictures .picture');
    pictures.forEach(function (picture) {
      picture.remove();
    });
  };

  Sort.prototype.init = function () {
    this._showSortBtn();

    this._buttons.forEach(function (btn) {
      this._sort(btn);
    }.bind(this));
  };

  Sort.prototype._sort = function (button) {
    button.addEventListener('click', function (evt) {
      this._onClick(this, evt);
    }.bind(this));
  };

  Sort.prototype._onClick = window.debounce(function (context, evt) {
    context._applySort(evt);
  });

  Sort.prototype._changeActiveBtn = function (activeBtn) {
    this._activeBtn.classList.remove(this._CLASS_ACTIVE);
    this._activeBtn = activeBtn;
    this._activeBtn.classList.add(this._CLASS_ACTIVE);
  };

  Sort.prototype._renderPhoto = function (filterType) {
    this._clearGallery();
    var dataSort = this._getSortPhoto(filterType);
    window.renderGallery(dataSort);
  };

  Sort.prototype._applySort = function (evt) {
    evt.preventDefault();
    this._changeActiveBtn(evt.target);
    var filterType = this._activeBtn.getAttribute('id');
    this._renderPhoto(filterType);
  };

  window.Sort = Sort;

})();
