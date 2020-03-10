'use strict';

(function () {

  var keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc'
  };
  
  // Открывает попап
  var onOpenPopup = function (element) {
    element.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeModalOnKeydown(element);
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

    var onEscKeyDown = function (evt, element) {
      if (evt.key === keys.ESCAPE || evt.key === keys.ESC) {
        onClosePopup(element);
        // document.removeEventListener('keydown', f)
      }
    };

    // закрывает попап при нажатии на close
    var closeModalOnClick = function (modal) {
      var closeBtn = modal.querySelector('.cancel');
      closeBtn.addEventListener('click', function () {
        onClosePopup(modal);
      });
    };
    
    var closeModalOnKeydown = function (element) {
      document.addEventListener('keydown', function (evt) {
        onEscKeyDown(evt, element);
      }, true);
    };

    window.utils = {
      onEscKeyDown: onEscKeyDown,
      hiddenElement: hiddenElement,
      onClosePopup: onClosePopup,
      onOpenPopup: onOpenPopup,
      closeModalOnKeydown: closeModalOnKeydown,
    }

})()
