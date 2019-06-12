'use strict';

(function () {
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__price').textContent = card.offer.price + ' ₽/ночь';
    var getType = function () {
      if (card.offer.type === 'flat') {
        return 'Квартира';
      }
      if (card.offer.type === 'bungalo') {
        return 'Бунгало';
      }
      if (card.offer.type === 'house') {
        return 'Дом';
      }
      return 'Дворец';
    };
    cardElement.querySelector('.popup__type').textContent = getType();
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    var featuresList = cardElement.querySelector('.popup__features').children;
    for (var i = 0; i < featuresList.length; i++) {
      var checker = 0;
      for (var j = 0; j < card.offer.features.length; j++) {
        if (featuresList[i].classList.contains('feature--' + card.offer.features[j])) {
          checker++;
        }
      }
      if (!checker) {
        featuresList[i].style = 'display: none;';
      }
    }
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var picturesList = cardElement.querySelector('.popup__pictures').children;
    var pictureItem = picturesList[0];

    pictureItem.querySelector('img:first-child').src = card.offer.photos[0];
    pictureItem.querySelector('img').width = 210;
    for (var k = 1; k < card.offer.photos.length; k++) {
      var newPictureItem = pictureItem.cloneNode(true);
      newPictureItem.querySelector('img').src = card.offer.photos[k];
      cardElement.querySelector('.popup__pictures').appendChild(newPictureItem);
    }
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    return cardElement;
  };
})();
