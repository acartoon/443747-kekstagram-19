'use strict';

var COUNT_PHOTO = 25;
var MAX_COUNT_LIKES = 200;
var MIN_COUNT_LIKES = 15;
var MAX_COUNT_AVATAR = 6;

var keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};


var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = ['Король Артур', 'Мышиный Король', 'Кот', 'Пендальф', 'Хан Соло', 'Фродо'];

var getRandomNumber = function (min, max) {
  min = (min !== undefined) ? min : 1;
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getCommentMock = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, MAX_COUNT_AVATAR) + '.svg',
    message: messages[getRandomNumber(0, messages.length - 1)],
    name: names[getRandomNumber(0, names.length - 1)],
  };
};

var getPhotoMock = function () {
  var comment = [];
  for (var i = 0; i < getRandomNumber(1, 4); i++) {
    comment.push(getCommentMock());
  }

  return {
    url: 'photos/' + getRandomNumber(1, COUNT_PHOTO) + '.jpg',
    description: messages[getRandomNumber(0, messages.length - 1)],
    likes: getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comment: comment
  };
};


var photosMock = new Array(COUNT_PHOTO)
  .fill('')
  .map(getPhotoMock);

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__info').inerHTML = photo.description;
  photoElement.querySelector('.picture__likes').inerHTML = photo.likes;

  photoElement.addEventListener('click', function () {
    renderPictureDetail(photo);
  });

  return photoElement;
};

photosMock.forEach(function (photo) {
  var photoBlock = renderPhoto(photo);
  picturesContainer.append(photoBlock);
});

// ----
var templateComment = document.querySelector('.social__comment');

// var toAddModalBody = function () {
//   document.body.classList.add('modal-open');
// };

// var toRemoveModalBody = function () {
//   document.body.classList.remove('modal-open');
// };

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

// закрывает попап при нажатии на close
var closeModalOnClick = function (modal) {
  var closeBtn = modal.querySelector('.cancel');
  closeBtn.addEventListener('click', function () {
    onClosePopup(modal);
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

  onOpenPopup(pictureDetail);
};


// Открывает попап
var onOpenPopup = function (element) {
  element.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeModalOnKeydown(element);
  closeModalOnClick(element);
};

var onEscKeyDown = function (evt, element) {
  if (evt.key === keys.ESCAPE || evt.key === keys.ESC) {
    onClosePopup(element);
    // document.removeEventListener('keydown', f)
  }
};


var closeModalOnKeydown = function (element) {
  document.addEventListener('keydown', function (evt) {
    onEscKeyDown(evt, element);
  }, true);
};

// Закрывает попап
var onClosePopup = function (element) {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// добавляет класс hidden
var hiddenElement = function (element) {
  element.classList.add('hidden');
};


var bigPictureCommentsCount = pictureDetail.querySelector('.social__comment-count');
var bigPictureCommentsLoader = pictureDetail.querySelector('.comments-loader');

hiddenElement(bigPictureCommentsCount);
hiddenElement(bigPictureCommentsLoader);

// -------

var uploadFile = document.querySelector('.img-upload__input');
var uploaImgBlock = document.querySelector('.img-upload__overlay');

uploadFile.addEventListener('change', function () {
  imgUploadBlock();
});

var imgUploadBlock = function () {
  onOpenPopup(uploaImgBlock);
};

// onOpenPopup(uploaImgBlock);
// слайдер

// 2.2. Наложение эффекта на изображение

var pictureEffects = {
  pin: document.querySelector('.effect-level__pin'),
  pinValue: document.querySelector('.effect-level__value'),
  sliderContainer: document.querySelector('.effect-level'),
  depth: document.querySelector('.effect-level__depth'),
  pinContainer: document.querySelector('.effect-level__line'),
  image: document.querySelector('.img-upload__preview > img'),
  pinContainerWidth: document.querySelector('.effect-level__line').getBoundingClientRect().width,
  value: 1,
  activeEffect: 'none',
  effects: {
    none: 'none',
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
  }
};

pictureEffects.mousedown = function (evt) {

  evt.preventDefault();
  var pinCoordX = this.pin.getBoundingClientRect().left;

  var pinContainerLeft = this.pinContainer.getBoundingClientRect().left;
  var shiftX = event.clientX - pinCoordX;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove() {
    var newLeft = event.clientX - shiftX - pinContainerLeft;
    if (newLeft < 0) {
      newLeft = 0;
    }

    var maxValue = pictureEffects.pinContainerWidth;
    if (newLeft > maxValue) {
      newLeft = maxValue;
    }

    pictureEffects.setSliderValue(newLeft);
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }
};

pictureEffects.setSliderValue = function (value) {
  pictureEffects.pin.style.left = value + 'px';
  pictureEffects.value = Math.floor(value / pictureEffects.pinContainerWidth * 100);
  pictureEffects.setValue(pictureEffects.value);
  pictureEffects.depth.style.width = pictureEffects.value + '%';
  pictureEffects.pinValue.setAttribute('value', pictureEffects.value);
};

pictureEffects.toAddClass = function () {
  document.addEventListener('click', function (evt) {
    if (evt.target.matches('input[type="radio"]')) {
      var value = evt.target.getAttribute('value');
      pictureEffects.activeEffect = value;
      var classAdd = (value !== pictureEffects.effects.none) ? 'effects__preview--' + value : '';
      pictureEffects.image.className = classAdd;
      pictureEffects.setValue(100);
      pictureEffects.setSliderValue(pictureEffects.pinContainerWidth);
    }
  });
};

pictureEffects.hiddenSlider = function () {
  pictureEffects.sliderContainer.classList.add('visually-hidden');
};

pictureEffects.visibleSlider = function () {
  pictureEffects.sliderContainer.classList.remove('visually-hidden');
};

pictureEffects.setValue = function (value) {
  var styleName = pictureEffects.activeEffect;
  var set = {
    none: 'none',
    chrome: value / 100,
    sepia: value / 100,
    marvin: value + '%',
    phobos: value / 100 * 3 + 'px',
    heat: 1 + 2 * value / 100
  };

  if (styleName === 'none') {
    pictureEffects.image.style.filter = null;
    pictureEffects.hiddenSlider();
  } else {
    pictureEffects.image.style.filter = pictureEffects.effects[styleName] + '(' + set[styleName] + ')';
    pictureEffects.visibleSlider();
  }
};


pictureEffects.init = function () {
  pictureEffects.hiddenSlider();
  this.toAddClass();
  pictureEffects.pin.addEventListener('mousedown', function (evt) {
    pictureEffects.mousedown(evt);
  });
};

pictureEffects.init();

// 2.1.уменьшение и увеличение размера изображения

var getChangePictureSize = {
  scaleСontrolValue: document.querySelector('.scale__control--value'),
  btnSmaller: document.querySelector('.scale__control--smaller'),
  btnBigger: document.querySelector('.scale__control--bigger'),
  image: document.querySelector('.img-upload__preview > img'),
  STEP_CHANGE: 25,
  MAX_STEP: 100,
  MIN_STEP: 25,
  initialValue: 100,
  STATES: {
    smaller: 'smaller',
    bigger: 'bigger'
  }
};

getChangePictureSize.onClick = function (btn, state) {
  btn.addEventListener('click', function () {
    getChangePictureSize.changeSizeImg(state);
  });
};

getChangePictureSize.changeSizeImg = function (state) {
  this.initialValue = (state === this.STATES.smaller) ? this.initialValue - this.STEP_CHANGE : this.initialValue + this.STEP_CHANGE;
  if (this.initialValue > this.MAX_STEP) {
    this.initialValue = this.MAX_STEP;
  }

  if (this.initialValue < this.MIN_STEP) {
    this.initialValue = this.MIN_STEP;
  }

  this.scaleСontrolValue.value = this.initialValue + '%';
  this.image.style.transform = 'scale(' + this.initialValue / 100 + ')';
};

getChangePictureSize.init = function () {
  this.scaleСontrolValue.value = this.initialValue + '%';
  this.onClick(this.btnSmaller, this.STATES.smaller);
  this.onClick(this.btnBigger, this.STATES.bigger);
};

getChangePictureSize.init();
