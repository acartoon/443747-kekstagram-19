'use strict';

(function () {
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

  window.data = {
    photosMock: photosMock
  };

})();
