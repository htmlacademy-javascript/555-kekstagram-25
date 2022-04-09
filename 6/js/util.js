// Функция проверки длины строки
const getCheckCommentLength = function (str, lengthLimit) {
  return str.length <= lengthLimit;
};

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

const isEscapeKey = (evt) => evt.keyCode === 27;

export {getCheckCommentLength, getRandomNumber, generateId, createRandomIdFromRangeGenerator, isEscapeKey};
