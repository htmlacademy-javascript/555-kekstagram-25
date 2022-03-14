//Функция, возвращающая случайное целое число из переданного диапазона включительно. Диапазон может быть только положительный, включая ноль. А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.

const minNumber = 0;
const maxNumber = 50;

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 'Invalid Data Input';
  }
}

getRandom(minNumber, maxNumber);

//Функцию взяла из документации https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

//Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна.

const commentChecked = 'Проверка длины строки';
const maxLength = 140;

function getCheckCommentLength(str, lengthLimit) {
  return str.length <= lengthLimit;
}

getCheckCommentLength(commentChecked, maxLength);

//Функцию взяла из документации https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length
