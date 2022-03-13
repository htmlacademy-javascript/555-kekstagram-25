//Функция, возвращающая случайное целое число из переданного диапазона включительно. Диапазон может быть только положительный, включая ноль. А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.

function getRandom(minNumber, maxNumber) {
  minNumber = Math.ceil(minNumber);
  maxNumber = Math.floor(maxNumber);
  if (minNumber >= 0 && maxNumber > minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  } else {
    return 'Invalid Data Input';
  }
}

getRandom(0, 50);

//Функцию взяла из документации https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

//Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна.

function getCheckCommentLength(commentChecked, maxLength) {
  if (commentChecked.length < maxLength) {
    return true;
  } else {
    return false;
  }
}

getCheckCommentLength('Проверка длины строки', 140);

//Функцию взяла из документации https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length
