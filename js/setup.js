'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var randomElement = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
