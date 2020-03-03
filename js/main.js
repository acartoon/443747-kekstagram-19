'use strict';

var COUNT_PHOTO = 25;
var MAX_COUNT_LIKES = 200;
var MIN_COUNT_LIKES = 15;
var MAX_COUNT_AVATAR = 6;

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
  closeModalOnClick(element);
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
  console.log('sdfas')
  onOpenPopup(uploaImgBlock);
};
