'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFields = noticeForm.querySelectorAll('input, select');

  var highlightInvalidField = function (field) {
    if (!field.checkValidity()) {
      field.style.boxShadow = '0 0 3px 1px red';
    }
  };
  noticeForm.addEventListener('invalid', function (evt) {
    evt.preventDefault();
    for (var i = 0; i < noticeFormFields.length; i++) {
      highlightInvalidField(noticeFormFields[i]);
    }
  });

  var price = document.querySelector('#price');
  var placeType = document.querySelector('#type');
  var setMinPrice = function () {
    var minPrice = 1000;
    switch (placeType.selectedIndex) {
      case 1:
        minPrice = 0;
        break;
      case 2:
        minPrice = 5000;
        break;
      case 3:
        minPrice = 10000;
        break;
      default:
        minPrice = 1000;
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

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), successHandler, errorHandler);
  });

  var successHandler = function (response) {
    noticeForm.reset();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: #fff; background-color: red; border-radius: 20px;padding: 30px;';
    node.style.position = 'absolute';
    node.style.left = '200px';
    node.style.top = '20px';
    node.style.width = '500px';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    noticeForm.insertAdjacentElement('afterbegin', node);
  };
})();
