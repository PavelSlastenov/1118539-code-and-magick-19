'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;                        //По оси влево
var CLOUD_Y = 10;                        //По оси вверх
var GAP = 10;                           //Отступ
var FONT_GAP = 25;                     //Отступ у текста
var TEXT_HEIGHT = 40;                 //Высота текста
var COLUMN_HEIGHT = 150;             //Высота гистограммы
var BAR_WIDTH = 40;                  //Ширина колонки
var BAR_HEIGHT = 20;               //Высота колонки
var COLUMN_SPACE = 50;            //Расстояние между колонками

//Функция отрисовки облака
var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;                                           //Цвет перенес в параметры
  ctx.fillRect(x, y, width, height);
};

//Параметры текста
var drawsText = function (ctx, text, x, y, color, font) {
  ctx.fillStyle = color;                                       //Цвет перенес в параметры
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

//Функция находит максимальное время в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];                                //Отмечает первый элемент как максимальный

  for (var i = 0; i < arr.length; i++) {                //Переберает элементы в массиве и сравнивает с максимальным
    if (arr[i] > maxElement) {                         //Находит элемент больше максимального
      maxElement = arr[i];                            //Записывает найденный элемент как максимальный
    }
  }

  return maxElement;                               //Возвращает максимальный элемент
};

//Отрисовка облака, тени, игроков, затраченного времени
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');   //Тень от облака и цвет
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');                            //Облако и цвет

  ctx.fillStyle = '#000';                                                                         //Цвет текста сверху

  var maxTime = getMaxElement(times);                                                  //Алгоритм поиска максимального элемента в массиве times
  var scaleFactor = COLUMN_HEIGHT / maxTime;                                          //Определяет масштаб: высоту гистограммы делим на максимальное время

  drawsText(ctx, 'Ура вы победили!', 230, 25);                                      //Указал координаты числами, что бы надпись "Ура" не скрывалась за уже нарисованным облаком в игре
  drawsText(ctx, 'Список результатов:', CLOUD_X + CLOUD_Y, GAP + TEXT_HEIGHT);

  for (var i = 0; i < players.length; i++) {                                      //Цикл который изменяет значение переменной i(index) в которой будет храниться порядковый номер текущего элемента массива от 0 до длины массива
    var BAR_HEIGHT = scaleFactor * times[i];
    var x = CLOUD_X + GAP + COLUMN_SPACE + (BAR_WIDTH + COLUMN_SPACE) * i;       //Формула отрисовки столбца
    var y = CLOUD_X + GAP + COLUMN_HEIGHT - BAR_HEIGHT;


    renderCloud(ctx, x, y - FONT_GAP, BAR_WIDTH, BAR_HEIGHT, players[i] === 'Вы' ? 'rgba(255, 0 ,0, 1)' : 'hsl(240,' + Math.random() * 100 + '%, 50%)');   //Задает отдельно цвет игроку "Вы"
                                                                                                                                                        //остальные игроки синие, с случайно задающейся насыщенностью через "hsl"
    drawsText(ctx, players[i], x, CLOUD_HEIGHT - GAP);
    drawsText(ctx, Math.round(times[i]), x, y - TEXT_HEIGHT);
  }

};
