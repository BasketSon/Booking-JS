'use strict';

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var PIN_TAIL_HEIGHT = 22;

var mapField = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var filterFields = mapFilters.querySelectorAll('select, input');
var mapPin = document.querySelector('.map__pin--main');
var addressField = document.querySelector('#address');
var noticeForm = document.querySelector('.notice__form');

var mapPinDropHandler = function () {
  activateMap();
  enableNoticeForm();
  getPinAddress();
  displayCard();
  displayPins();
};
mapPin.addEventListener('dragend', mapPinDropHandler);
for (var i = 0; i < filterFields.length; i++) {
  filterFields[i].disabled = true;
}

var activateMap = function () {
  mapField.classList.remove('map--faded');
  mapPin.removeEventListener('dragend', mapPinDropHandler);
};

var enableNoticeForm = function () {
  noticeForm.classList.remove('notice__form--disabled');
};

var getPinAddress = function () {
  addressField.value = Math.round(mapPin.offsetLeft + mapPin.offsetWidth / 2)
  + ', ' + Math.round(mapPin.offsetTop + mapPin.offsetHeight + PIN_TAIL_HEIGHT);
};

getPinAddress();

var makeRandomFactor = function () {
  return Math.random() - 0.5;
};

var avatars = [];
var createAvatarArray = function (imageNumber) {
  for (var i = 0; i < imageNumber; i++) {
    avatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }
};

var getRandomArbitrary = function (min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
};

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var roomTypes = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var createRandomFeatures = function () {
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var randomFeatures = [];
  for (var i = 0; i < getRandomArbitrary(1, 6); i++) {
    features.sort(makeRandomFactor);
    randomFeatures.push(features.pop());
  }
  return randomFeatures;
};

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var locationCards = [];

var createLocationCard = function () {
  var locationX = getRandomArbitrary(0, 1200);
  var locationY = getRandomArbitrary(130, 630);
  avatars.sort(makeRandomFactor);
  offerTitles.sort(makeRandomFactor);
  var locationCard = {
    author: {
      avatar: avatars.pop()
    },
    offer: {
      title: offerTitles.pop(),
      address: locationX + ', ' + locationY,
      price: getRandomArbitrary(1000, 1000000),
      type: roomTypes[getRandomArbitrary(0, 3)],
      rooms: getRandomArbitrary(1, 5),
      guests: getRandomArbitrary(1, 6),
      checkin: checkTimes[getRandomArbitrary(0, 2)],
      checkout: checkTimes[getRandomArbitrary(0, 2)],
      features: createRandomFeatures(),
      description: '',
      photos: photos
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return locationCard;
}
var createCardsArray = function (cardsNumber) {
  createAvatarArray(cardsNumber);

  for (var i = 0; i < cardsNumber; i++) {
    locationCards.push(createLocationCard());
  }
};
createCardsArray(8);

var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
var pin = document.querySelector('template').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');

var renderPin = function (card) {
  var pinElement = pin.cloneNode(true);
  pinElement.style = 'left: ' + (card.location.x - PIN_WIDTH / 2) + 'px; top: ' + (card.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = card.author.avatar;
  pinElement.querySelector('img').alt = card.offer.title;
  return pinElement;
};

var renderCard = function (card) {
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
  card.offer.photos = card.offer.photos.sort(makeRandomFactor);
  pictureItem.querySelector('img').src = card.offer.photos[0];
  pictureItem.querySelector('img').width = 210;
  for (var k = 1; k < card.offer.photos.length; k++) {
    var newPictureItem = pictureItem.cloneNode(true);
    newPictureItem.querySelector('img').src = card.offer.photos[k];
    cardElement.querySelector('.popup__pictures').appendChild(newPictureItem);
  }
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  return cardElement;
};
var initialCard = renderCard(locationCards[0]).cloneNode(true);
var displayCard = function () {
  mapField.insertBefore(initialCard, filtersContainer);
};

var pinsFragment = document.createDocumentFragment();
var pinClickHandler = function (card) {
  var similarPin = renderPin(card);
  var similarCard = renderCard(card).cloneNode(true);
  similarPin.addEventListener('click', function () {
    mapField.replaceChild(similarCard, initialCard);
    initialCard = similarCard;
  });
  pinsFragment.appendChild(similarPin);
};
var displayPins = function () {
  for (var i = 0; i < locationCards.length; i++) {
    pinClickHandler(locationCards[i]);
  }
  pinsList.appendChild(pinsFragment);
};
