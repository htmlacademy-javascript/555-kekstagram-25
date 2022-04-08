import {photoDescription} from './data.js';

const photoPreviewBlock = document.querySelector('.pictures');//блок для вставки созданных элементов
const photoPreviewTemplate = document.querySelector('#picture').content;//поиск нужного шаблона для создания элементов

const usersPhoto = photoDescription(); //результат функции по созданию массива объектов
const photoPreviewFragment = document.createDocumentFragment(); //DOM-объект для вставки сгенерированных DOM-элементов

usersPhoto.forEach(({url, likes, comments}) => { //превращение параметров объектов в переменные
  const photoPreviewElement = photoPreviewTemplate.cloneNode(true);//клонирование шаблона для создания элементов
  photoPreviewElement.querySelector('picture__img').src = url; //адрес изображения url подставляется как атрибут src изображения
  photoPreviewElement.querySelector('.picture__likes').textContent = likes; //количество лайков likes выводится в блок .picture__likes
  photoPreviewElement.querySelector('picture__comments').textContent = comments; //количество комментариев comments выводится в блок .picture__comments
  photoPreviewFragment.appendChild(photoPreviewElement); //создание элементов с данными
});

photoPreviewBlock.appendChild(photoPreviewFragment);//вставка готовых элементов с данными в нужный блок
