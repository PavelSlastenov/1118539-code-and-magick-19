'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireBallColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var blockSetup = document.querySelector('.setup');
var blockSimilar = document.querySelector('.setup-similar');

var randomElement = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (array) {
  var randomArray = array[Math.floor(Math.random() * array.length)];
  return randomArray;
};

var similarListElement = document.querySelector('.setup-similar-list');
document.querySelector('.setup').classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards.push({
    name: names[randomElement(0, 7)] + ' ' + lastName[randomElement(0, 7)],
    coatColor: coatColors[randomElement(0, 5)],
    eyesColor: eyesColors[randomElement(0, 4)],
  });
}

var renderWizards = function (namber) {
  var randomWizards = similarWizardTemplate.cloneNode(true);
  randomWizards.querySelector('.setup-similar-label').textContent = wizards[namber].name;
  randomWizards.querySelector('.wizard-coat').style.fill = wizards[namber].coatColor;
  randomWizards.querySelector('.wizard-eyes').style.fill = wizards[namber].eyesColor;
  return randomWizards;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < 4; j++) {
  fragment.appendChild(renderWizards(j));
}

similarListElement.appendChild(fragment);

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

//  8. Учебный проект: одеть Надежду

var setup = document.querySelector('.setup');
var buttonOpen = document.querySelector('.setup-open-icon');
var buttonClose = document.querySelector('.setup-close');
var inputUserName = document.querySelector('.setup-user-name');

var onPopupEscHandler = function (evt) {
  if (inputUserName === document.activeElement) {
    return;
  } else if (evt.key === 'Escape') {
    closePopup();
  }
};

var openPopup = function () {
  blockSetup.classList.remove('hidden');
  blockSimilar.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscHandler);
};

var closePopup = function () {
  blockSetup.classList.add('hidden');
  blockSimilar.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscHandler);
};

buttonOpen.addEventListener('click', function () {
  openPopup();
});

buttonOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

buttonClose.addEventListener('click', function () {
  closePopup();
});

buttonClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

//  Расшифровывает ошибку валидации
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов и не превышать 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var wizard = document.querySelector('.setup-wizard-appearance');
var fireBall = document.querySelector('.setup-fireball-wrap');

var changeColor = function (evt) {
  var target = evt.target;
  var inputCoat = document.querySelector('input[name=coat-color]');
  var inputEyes = document.querySelector('input[name=eyes-color]');
  var inputFireball = document.querySelector('input[name=fireball-color]');

  if (target.parentElement.className === 'setup-fireball-wrap') {
    randomElement = getRandomArray(fireBallColors);
    target.parentElement.style.background = randomElement;
    inputFireball.value = randomElement;
  } else if (target.className.baseVal === 'wizard-eyes') {
    randomElement = getRandomArray(eyesColors);
    target.style.fill = randomElement;
    inputEyes.value = randomElement;
  } else if (target.className.baseVal === 'wizard-coat') {
    randomElement = getRandomArray(coatColors);
    target.style.fill = randomElement;
    inputCoat.value = randomElement;
  }
};

wizard.addEventListener('click', changeColor);
fireBall.addEventListener('click', changeColor);
