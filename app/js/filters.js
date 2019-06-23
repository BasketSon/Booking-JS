'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var prices = {
    high: 50000,
    low: 10000
  };

  var filterType = function (ann) {
    return housingType.value === 'any' ?
      true : ann.offer.type === housingType.value;
  };

  var filterPrice = function (ann) {
    switch (housingPrice.value) {
      case 'low':
        return ann.offer.price < prices.low;
      case 'high':
        return ann.offer.price > prices.high;
      case 'middle':
        return ann.offer.price >= prices.low && ann.offer.price <= prices.high;
      default:
        return true;
    }
  };

  var filterRooms = function (ann) {
    return housingRooms.value === 'any' ?
      true : ann.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var filterGuests = function (ann) {
    return housingGuests.value === 'any' ?
      true : ann.offer.guests === parseInt(housingGuests.value, 10);
  };

  var filterFeatures = function (ann) {
    var features = housingFeatures.querySelectorAll('input[type=checkbox]:checked');
    if (features.length > 0) {
      var falseCount = 0;

      features.forEach(function (feat) {
        if (ann.offer.features.indexOf(feat.value) === -1) {
          falseCount += 1;
        }
      });
      return falseCount > 0 ? false : true;
    } else {
      return true;
    }
  };

  window.filterChain = function (array) {
    return array.filter(filterType)
        .filter(filterPrice)
        .filter(filterRooms)
        .filter(filterGuests)
        .filter(filterFeatures);
  };

})();
