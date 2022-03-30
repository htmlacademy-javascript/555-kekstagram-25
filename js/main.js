//Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна. Функцию взяла из документации https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length

const commentChecked = 'Проверка длины строки';
const maxLength = 140;

function getCheckCommentLength(str, lengthLimit) {
  return str.length <= lengthLimit;
}

getCheckCommentLength(commentChecked, maxLength);

/*
Объект описания фотографии состоит из 5 ключей:

id, число — число от 1 до 25. Идентификаторы не должны повторяться.

url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

description — строка, описание фотографии.

likes, число — случайное число лайков от 15 до 200.

comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.

Объект с комментарием состоит из 4 ключей:

id — случайное число. Идентификаторы не должны повторяться.

avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

message — одно или два случайных предложения из представленных ниже:

Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

name — случайные имена авторов. Набор имён для комментаторов составьте сами.

*/

const NAMES = [
  'Воланд',
  'Азазелло',
  'Бегемот',
  'Фагот',
  'Гелла',
  'Маргарита',
  'Мастер',
  'Иван Бездомный',
  'Михаил Берлиоз',
  'Афраний',
  'Понтий Пилат',
  'Иешуа Га-Ноцри',
  'Левий Матвей'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPSIONS = [
  'Семиразовое питание. Нет, не лопну.',
  'Учу йоге. Дорого.',
  'А ты — завел себе своего человека?',
  'Вон кресло свободное, там и спи!',
  'Мышка. И....кошка.',
  'Лучший в мире примус!',
  'Качественное подсолнечное масло'
];

const MIN_PHOTO_COUNT = 1;
const MAX_PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 'Invalid Data Input';
  }
};

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)];

//Забежала вперед и взяла из 5 раздела функции из демонстрации 5.17 Практическая польза замыканий

//Функция-генератор для получения уникальных идентификаторов.

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateCommentId = createIdGenerator();

//Функция-генератор для получения случайных идентификаторов из указанного диапазона, и так, чтобы они не повторялись, пока не будут перебраны все числа из этого промежутка.

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandom(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT);

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPSIONS),
  likes: getRandom(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandom(1,2)}, photoComments)
});

const photoComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandom(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.png`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const photoDescription = Array.from({length: MAX_PHOTO_COUNT}, createPhoto);
