'use strict';

(function () {
  var IMAGE_TYPES = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
  var avatarInput = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview img');
  var avatarDefault = avatarPreview.src;

  avatarInput.addEventListener('change', function () {
    var avatar = avatarInput.files[0];
    renderPreview(avatar, avatarPreview);
  });

  var renderPreview = function (file, imageNode) {
    var fileName = file.name.toLowerCase();
    var checkFileType = IMAGE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (checkFileType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imageNode.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var createThumbnail = function (image) {
    var newImg = document.createElement('img');
    renderPreview(image, newImg);
    newImg.style = 'height: 70px; border-radius: 10px; margin-right: 10px; margin-bottom: 10px';
    newImg.classList.add('upload__image');
    return newImg;
  };

  var imageInput = document.querySelector('#images');
  var imagePreview = document.querySelector('.form__photo-container .upload');

  imageInput.addEventListener('change', function () {
    clearUploadImages();
    var images = imageInput.files;

    if (images.length <= 5) {
      for (var i = 0; i < images.length; i++) {
        var thumbNail = createThumbnail(images[i]);
        thumbNail.style.order = i;
        imagePreview.appendChild(thumbNail);
      }
    } else {
      imageInput.setCustomValidity('Слишком много файлов');
      imageInput.reportValidity();
      window.debounce(function () {
        imageInput.setCustomValidity('');
      });
    }
  });

  var clearUploadImages = function () {
    var thumbnails = imagePreview.getElementsByClassName('upload__image');
    while (thumbnails[0]) {
      thumbnails[0].parentNode.removeChild(thumbnails[0]);
    }
  }
  window.clearFormImages = function () {
    clearUploadImages();
    avatarPreview.src = avatarDefault;
  }

  var dropBoxes = document.querySelectorAll('.drop-zone');

  dropBoxes.forEach(function (it) {
    var dragover = function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.target.classList.add('dragover');
    };

    var dragleave = function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.target.classList.remove('dragover');
    };
    var drop = function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.target.classList.remove('dragover');

      var files = evt.dataTransfer.files;
      var input = document.querySelector('#' + evt.target.htmlFor);
      if (input === avatarInput && files.length === 1 ||
      input === imageInput && files.length <= 5) {
        input.files = files;
        var event = new Event('change');
        input.dispatchEvent(event);
      } else {
        input.setCustomValidity('Слишком много файлов');
        input.reportValidity();
        window.debounce(function () {
          input.setCustomValidity('');
        });
      }
    };
    it.addEventListener('dragover', dragover);
    it.addEventListener('dragleave', dragleave);
    it.addEventListener('drop', drop);
  });
})();
