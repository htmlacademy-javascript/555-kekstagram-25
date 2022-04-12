import {isEscapeKey} from './util.js';
import {getCheckCommentLength} from './util.js';
import {getArrayFromString} from './util.js';
import { findDuplicates } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file'); //изначальное поле для загрузки изображения
const imgUploadOverlay = document.querySelector('.img-upload__overlay'); //форма редактирования изображения
const uploadCancel = document.querySelector('#upload-cancel'); //кнопка для закрытия формы редактирования изображения
const textHashtags = document.querySelector('.text__hashtags'); //поле для добавления хэш-тегов
const textDescription = document.querySelector('.text__description'); //поле для добавления комментария к изображению
//const imgUploadSubmit = document.querySelector('.img-upload__submit'); //кнопка для отправки данных на сервер
const regularValue = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$|(^$)/; //регулярное выражение для хэш-тегов
const imgUploadForm = document.querySelector('.img-upload__form');

//валидация полей формы

const pristine = window.Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

//валидация хэш-тегов

//проверка длины массива, что она меньше или равна 5, тогда возвращает true, иначе false
function validateArrayLength() {
  return getArrayFromString(textHashtags).length <= MAX_HASHTAG_COUNT;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateArrayLength,
  'Нельзя указать больше пяти хэш-тегов.'
);

//проверка соответствия каждого элемента массива регулярному выражению, если хотя бы один элемент не соответствует — возвращает false

function validateRegularValue () {
  const testHashtagArray = (hashtag) => regularValue.test(hashtag);
  return getArrayFromString(textHashtags).every(testHashtagArray);
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateRegularValue,
  'Хэш-тег начинается с символа # и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д. Минимальная длина хэш-тега 1 символ, максимальная – 20 символов.'
);

//- 3-я проверяет на уникальность (тут я думаю, что проще все методом .size — он вернет количество уникальных элементов массива, сравнить с длинной массива), возвращает true или false.
function validateDuplicates () {
  return findDuplicates(getArrayFromString(textHashtags));
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateDuplicates,
  'Один и тот же хэш-тег не может быть использован дважды.'
);

//валидация комментария
function validateTextDescription() {
  return getCheckCommentLength(textDescription.value, MAX_COMMENT_LENGTH);
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  validateTextDescription,
  'Длина комментария не может составлять больше 140 символов.'
);

//закрытие окна загрузки при нажатии клавиши esc
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

//запрет на закрытие окна при фокусе, если нажать клавишу esc
const stopEvent = (evt) => {
  evt.stopPropagation();
};

//сбрасывание значения поля выбора файла
const resetForm = () => {
  uploadFile.value = '';
  document.querySelector('.img-upload__form').reset();
};

//функция открытия окна добавления изображения
function openUserModal() {
  uploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden'); //показывается форма редактирования изображения ТЗ 1.2
    body.classList.add('modal-open'); //показывается форма редактирования изображения ТЗ 1.2
    document.addEventListener('keydown', onEscKeydown); //добавление обработчика для закрытия окна клавишей esc
    textHashtags.addEventListener('keydown', stopEvent); //если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
    textDescription.addEventListener('keydown', stopEvent); //если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
  });
}

//функция закрытия окна добавления изображения
function closeUserModal() {
  imgUploadOverlay.classList.add('hidden'); //закрытие формы редактирования изображения ТЗ 1.3
  body.classList.remove('modal-open'); //закрытие формы редактирования изображения ТЗ 1.3
  resetForm(); //сбрасывание значения поля выбора файла

  document.removeEventListener('keydown', onEscKeydown); //удаление обработчика для закрытия окна клавишей esc
  textHashtags.removeEventListener('keydown', stopEvent); // удаление обработчика на запрет закрытия окна при фокусе
  textDescription.removeEventListener('keydown', stopEvent); // удаление обработчика на запрет закрытия окна при фокусе
}

uploadFile.addEventListener('click', openUserModal);//открытие окна при клике кнопки 'загрузить'

uploadCancel.addEventListener('click', closeUserModal); //закрытие окна при клике на кнопку для закрытия формы редактирования изображения
