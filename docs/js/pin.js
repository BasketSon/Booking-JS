'use strict';

(function () {
  var pin = document.querySelector('template').content.querySelector('.map__pin');
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  window.renderPin = function (card) {
    var pinElement = pin.cloneNode(true);
    pinElement.style = 'left: ' + (card.location.x - PIN_WIDTH / 2) + 'px; top: ' + (card.location.y - PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = card.author.avatar;
    pinElement.querySelector('img').alt = card.offer.title;
    return pinElement;
  };
})();
