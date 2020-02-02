'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 25;
var TEXT_HEIGHT = 40;
var COLUMN_HEIGHT = 150;
var BAR_WIDTH = 40;
var COLUMN_SPACE = 50;

//  Функция отрисовки облака
var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

//  Параметры текста
var drawsText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

//  Отрисовка облака, тени, игроков, затраченного времени
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  ctx.fillStyle = '#000';
  var maxTime = getMaxElement(times);
  var scaleFactor = COLUMN_HEIGHT / maxTime;
  drawsText(ctx, 'Ура вы победили!', 230, 25);
  drawsText(ctx, 'Список результатов:', CLOUD_X + CLOUD_Y, GAP + TEXT_HEIGHT);
  for (var i = 0; i < players.length; i++) {
    var BAR_HEIGHT = scaleFactor * times[i];
    var x = CLOUD_X + GAP + COLUMN_SPACE + (BAR_WIDTH + COLUMN_SPACE) * i;
    var y = CLOUD_X + GAP + COLUMN_HEIGHT - BAR_HEIGHT;

    renderCloud(ctx, x, y - FONT_GAP, BAR_WIDTH, BAR_HEIGHT, players[i] === 'Вы' ? 'rgba(255, 0 ,0, 1)' : 'hsl(240,' + Math.random() * 100 + '%, 50%)');

    drawsText(ctx, players[i], x, CLOUD_HEIGHT - GAP, 'rgb(0, 0, 0)');
    drawsText(ctx, Math.round(times[i]), x, y - TEXT_HEIGHT);
  }

};
