'use strict';

(function () {
  var CLASS_ACTIVE = 'img-filters__button--active';
  var activeBtn = document.querySelector('.' + CLASS_ACTIVE);
  var filterContainer = document.querySelector('.img-filters');

  var onFinterActive = function () {
    filterContainer.classList.remove('img-filters--inactive');
  };

  onFinterActive();

  window.filter = {
    onFinterActive: onFinterActive
  };

  // функция при нажатии на кнопки сортировки выполняет код
  var buttons = document.querySelectorAll('.img-filters__form > button');

  var getRandomPhoto = function (data, count) {

    var randomArray = window.utils.getRandomElements(count, 1, data.length - 1);

    var test = randomArray.reduce(function (array, item) {
      array.push(data[item]);
      return array;
    }, []);
    return test;
  };

  var getSortPhoto = function (data) {
    return data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };


  var getFilter = function (data, filterType) {
    var set = {
      'filter-default': data,
      'filter-random': getRandomPhoto(data, 10),
      'filter-discussed': getSortPhoto(data)
    };
    return set[filterType];
  };

  var removeGallery = function () {
    var pictures = document.querySelectorAll('.pictures .picture');
    pictures.forEach(function (picture) {
      picture.remove();
    });
  };

  var getSort = window.debounce(function (data) {
    buttons.forEach(function (button) {
      sort(data, button);
    });
  });

  var sort = function (data, button) {
    button.addEventListener('click', function () {
      activeBtn.classList.remove(CLASS_ACTIVE);
      activeBtn = button;
      button.classList.add(CLASS_ACTIVE);
      var filterType = button.getAttribute('id');
      removeGallery();
      window.gallery.renderPhoto(getFilter(data, filterType));
      console.log(getFilter(data, filterType))
    });
  };


  window.sort = {
    getSort: getSort,
  };

})();
