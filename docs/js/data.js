'use strict';

(function () {
  var makeRandomFactor = function () {
    return (Math.random() - 0.5);
  };

  var getRandomArbitrary = function (min, max) {
    var randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
  };

  var avatars = [];

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

  var sortPhotos = function () {
    var photos = [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];
    photos.sort(makeRandomFactor);
    return photos;
  };

  var createAvatarArray = function (imageNumber) {
    for (var i = 0; i < imageNumber; i++) {
      avatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
    }
  };

  var getUniqueArrayItem = function (array) {
    array.sort(makeRandomFactor);
    return array.pop();
  };

  window.data = {
    locationCards: [],
    Y_MIN_COORD: 130,
    Y_MAX_COORD: 630
  };

  var createLocationCard = function () {
    var locationX = getRandomArbitrary(0, 1200);
    var locationY = getRandomArbitrary(window.data.Y_MIN_COORD, window.data.Y_MAX_COORD);

    var locationCard = {
      author: {
        avatar: getUniqueArrayItem(avatars)
      },
      offer: {
        title: getUniqueArrayItem(offerTitles),
        address: locationX + ', ' + locationY,
        price: getRandomArbitrary(1000, 1000000),
        type: roomTypes[getRandomArbitrary(0, 3)],
        rooms: getRandomArbitrary(1, 5),
        guests: getRandomArbitrary(1, 6),
        checkin: checkTimes[getRandomArbitrary(0, 2)],
        checkout: checkTimes[getRandomArbitrary(0, 2)],
        features: createRandomFeatures(),
        description: '',
        photos: sortPhotos()
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return locationCard;
  };
  var createCardsArray = function (cardsNumber) {
    createAvatarArray(cardsNumber);

    for (var i = 0; i < cardsNumber; i++) {
      window.data.locationCards.push(createLocationCard());
    }
  };
  createCardsArray(8);

})();
