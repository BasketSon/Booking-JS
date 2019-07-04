'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var noticeForm = document.querySelector('.notice__form');
  var pinField = document.querySelector('.map__pinsoverlay');

  noticeForm.querySelectorAll('input, select').forEach(function (it) {
    it.setAttribute('disabled', 'disabled');
  });

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mapPinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      if (mapPin.offsetLeft < 0) {
        mapPin.style.left = 0;
      }
      if (mapPin.offsetLeft > pinField.offsetWidth) {
        mapPin.style.left = pinField.offsetWidth + 'px';
      }
      if (mapPin.offsetTop < window.data.Y_MIN_COORD) {
        mapPin.style.top = window.data.Y_MIN_COORD + 'px';
      }
      if (mapPin.offsetTop > window.data.Y_MAX_COORD) {
        mapPin.style.top = window.data.Y_MAX_COORD + 'px';
      }
      getPinAddress();

    };

    var mapPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();
      getPinAddress();
      document.removeEventListener('mousemove', mapPinMousemoveHandler);
      document.removeEventListener('mouseup', mapPinMouseupHandler);
    };

    document.addEventListener('mousemove', mapPinMousemoveHandler);
    document.addEventListener('mouseup', mapPinMouseupHandler);
  });

  var mapPinFirstDropHandler = function () {
    activateMap();
    enableNoticeForm();
    getPinAddress();
    window.backend.load(loadPins, errorHandler);
  };
  mapPin.addEventListener('mouseup', mapPinFirstDropHandler);

  var activateMap = function () {
    window.map.mapField.classList.remove('map--faded');
    window.enableFilters();
    // mapPin.removeEventListener('mouseup', mapPinFirstDropHandler);
    noticeForm.querySelectorAll('input, select').forEach(function (it) {
      it.removeAttribute('disabled');
    });
    document.querySelectorAll('.loaded-pin').forEach(function (it) {
      it.classList.remove('visuallyhidden');
    });
  };

  var enableNoticeForm = function () {
    noticeForm.classList.remove('notice__form--disabled');
  };

  var PIN_TAIL_HEIGHT = 18;
  var getPinAddress = function () {
    addressField.value = Math.round(mapPin.offsetLeft)
    + ', ' + Math.round(mapPin.offsetTop + (mapPin.offsetHeight / 2) + PIN_TAIL_HEIGHT);
  };

  // var initialCard = window.renderCard(window.data.locationCards[0]).cloneNode(true);
  // var displayCard = function () {
  //   window.map.mapField.insertBefore(initialCard, filtersContainer);
  // };

  // var displayPins = function () {
  //   for (var i = 0; i < window.data.locationCards.length; i++) {
  //     pinClickHandler(window.data.locationCards[i]);
  //   }
  //   pinsList.appendChild(pinsFragment);
  // };
  var announcements = [];

  var updatePins = function () {
    window.drawPins(window.filterChain(announcements.slice()));
  };

  var mapFilters = document.querySelector('.map__filters');
  var filterFields = mapFilters.querySelectorAll('select, input');

  for (var i = 0; i < filterFields.length; i++) {
    filterFields[i].disabled = true;
  }
  window.enableFilters = function () {
    for (i = 0; i < filterFields.length; i++) {
      filterFields[i].disabled = false;
    }
    mapFilters.addEventListener('change', filtersChangeHandler);
  };

  var filtersChangeHandler = function () {
    window.debounce(updatePins);
  };

  var loadPins = function (response) {
    announcements = response;
    updatePins();
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: #fff; background-color: red; border-radius: 20px;padding: 30px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '300px';
    node.style.width = '500px';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.map = {
    mapField: document.querySelector('.map'),
    mapPin: {
      left: mapPin.style.left,
      top: mapPin.style.top,
      getPinAddress: getPinAddress
    },
    resetPin: function () {
      mapPin.style.left = this.mapPin.left;
      mapPin.style.top = this.mapPin.top;
    }
  };
})();
