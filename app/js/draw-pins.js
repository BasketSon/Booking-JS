'use strict';

(function () {
  var pinsList = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');
  var initialCard = 0;
  var pinsFragment = document.createDocumentFragment();

  var pinClickHandler = function (card) {
    var similarPin = window.renderPin(card);
    var similarCard = window.renderCard(card).cloneNode(true);
    similarCard.querySelector('.popup__close').addEventListener('click', function () {
      similarCard.classList.add('hidden');
    });
    similarPin.classList.add('loaded-pin');
    similarPin.addEventListener('click', function () {
      similarCard.classList.remove('hidden');
      if (!initialCard) {
        initialCard = similarCard;
        window.map.mapField.insertBefore(initialCard, filtersContainer);
      } else {
        window.map.mapField.replaceChild(similarCard, initialCard);
        initialCard = similarCard;
      }
    });
    pinsFragment.appendChild(similarPin);
  };

  window.drawPins = function (arr) {
    removePins();
    var numberOfShownPins = arr.length > 5 ? 5 : arr.length;
    for (var i = 0; i < numberOfShownPins; i++) {
      pinClickHandler(arr[i]);
    }
    pinsList.appendChild(pinsFragment);
  };

  var removePins = function () {
    var drawnPins = pinsList.querySelectorAll('.loaded-pin');
    for (var i = 0; i < drawnPins.length; i++) {
      pinsList.removeChild(drawnPins[i]);
    }
  };
})();
