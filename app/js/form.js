'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFields = noticeForm.querySelectorAll('input, select');

  var highlightInvalidField = function (field) {
    if (!field.checkValidity()) {
      field.style.boxShadow = '0 0 3px 1px red';
    }
  };
  var noticeFormInvalidHandler = function (evt) {
    evt.preventDefault();
    for (var i = 0; i < noticeFormFields.length; i++) {
      highlightInvalidField(noticeFormFields[i]);
    }
  };

  noticeForm.addEventListener('invalid', noticeFormInvalidHandler);

  var price = document.querySelector('#price');
  var placeType = document.querySelector('#type');
  var setMinPrice = function () {
    var minPrice = 1000;
    if (placeType.selectedIndex === 0) {
      minPrice = 1000;
    }
    if (placeType.selectedIndex === 1) {
      minPrice = 0;
    }
    if (placeType.selectedIndex === 2) {
      minPrice = 5000;
    }
    if (placeType.selectedIndex === 3) {
      minPrice = 10000;
    }
    price.min = minPrice;
    price.placeholder = minPrice;
  };
  placeType.addEventListener('change', setMinPrice);

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var synchronizeTime = function (evt) {
    if (evt.target === timeIn) {
      timeOut.selectedIndex = timeIn.selectedIndex;
    }
    if (evt.target === timeOut) {
      timeIn.selectedIndex = timeOut.selectedIndex;
    }
  };
  noticeForm.addEventListener('change', synchronizeTime);

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var synchronizeCapacity = function (evt) {
    if ((evt.target === roomNumber) || (evt.target === capacity)) {
      capacity.setCustomValidity('');
      if ((roomNumber.selectedIndex === 0 && capacity.selectedIndex !== 2) ||
      (roomNumber.selectedIndex === 1 && (capacity.selectedIndex < 1 || capacity.selectedIndex > 2))) {
        capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
        capacity.reportValidity();
      }
      if ((capacity.selectedIndex !== 3) && (roomNumber.selectedIndex === 3)) {
        capacity.setCustomValidity('Для такого количества комнат выберите значение "не для гостей"');
        capacity.reportValidity();
      }
      if ((capacity.selectedIndex === 3) && (roomNumber.selectedIndex !== 3)) {
        capacity.setCustomValidity('Укажите количество гостей');
        capacity.reportValidity();
      }
    }
  };

  noticeForm.addEventListener('change', synchronizeCapacity);
})();
