// Функция проверки длины строки
const getCheckCommentLength = (str, lengthLimit) => str.length <= lengthLimit;

//Функция получения массива из строки: строка, полученная из инпута, переводится в нижний регистр, затем через split с помощью пробела в аргументе создается массив из слов
const getArrayFromString = (str) => str.toLowerCase().split(' ');

//Функция поиска дубликатов в массиве
const findDuplicates = (array) => (new Set(array)).size === array.length;

// Функция получения случайного числа
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 'Invalid Data Input';
  }
};

//Функция-генератор для получения уникальных идентификаторов.

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateId = createIdGenerator();

//Функция-генератор для получения случайных идентификаторов из указанного диапазона, и так, чтобы они не повторялись, пока не будут перебраны все числа из этого промежутка.

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//проверка нажатой клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export { getCheckCommentLength, getRandomNumber, generateId, createRandomIdFromRangeGenerator, isEscapeKey, getArrayFromString, findDuplicates };
