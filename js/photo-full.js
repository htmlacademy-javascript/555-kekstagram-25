import './data.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');

const fullPhoto = document.querySelector('.big-picture'); //окно полноразмерного показа изображения, которое каждый раз нужно заполнять данными о конкретной фотографии
const fullPhotoImg = document.querySelector('.big-picture__img'); //просмотр полноразмерного изображения
const img = fullPhotoImg.querySelector('img'); //адрес полноразмерного изображения
const socialCaption = document.querySelector('.social__caption'); //подпись фотографии
const likesСount = document.querySelector('.likes-count'); //количество лайков
const commentsCount = document.querySelector('.comments-count'); //количество комментариев
const socialComments = document.querySelector('.social__comments'); //список комментариев
const socialComment = document.querySelector('.social__comment'); //комментарий
const commentsLoader = document.querySelector('.comments-loader'); //кнопка загрузки комментариев
const socialCommentCount = document.querySelector('.social__comment-count'); //счетчик комментариев
const fullPhotoClose = document.querySelector('.big-picture__cancel'); //кнопка для выхода из полноэкранного просмотра изображения

const socialCommentFragment = document.createDocumentFragment(); //DOM-объект для вставки сгенерированных DOM-элементов с комментариями

//заполнение разметки комментария
const fillComments = (items) => {
  items.forEach(({avatar, name, message}) => { //превращение параметров объектов комментариев в переменные
    const commentElement = socialComment; //поиск нужного блока отдельного комментария для заполнения
    commentElement.querySelector('.social__picture').src = avatar; //адрес аватарки комментатора
    commentElement.querySelector('.social__picture').alt = name; //имя комментатора в качестве альта для аватарки
    commentElement.querySelector('.social__text').textContent = message; //текст комментария
    socialCommentFragment.appendChild(commentElement); //создание комментария с данными
  });

  socialComments.appendChild(socialCommentFragment); //вставка готовых комментариев в список комментариев
  return socialComments; //возврат из функции блока с заполненными комментариями
};

//отрисовка окна просмотра полноразмерного изображения
const fillFullPhoto = (({url, likes, comments, description}) => { //превращение параметров объектов описания фото в переменные
  img.src = url; //адрес изображения
  likesСount.textContent = likes; //количество лайков
  commentsCount.textContent = comments.length; //количество комментариев
  socialCaption.textContent = description; //описание фото
  fillComments(comments); //комментариии
  openFullPhoto();
});

//удаление комментариев из массива, когда окно закрывают
const removeComments = () => {
  socialComments.removeChild(socialComments.lastChild);
};

//закрытие окна при нажатии клавиши esc
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

//функция показа окна просмотра
function openFullPhoto() {
  fullPhoto.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('.modal-open');

  document.addEventListener('keydown', onEscKeydown);
}

//функция скрытия окна просмотра
function closeFullPhoto() {
  fullPhoto.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('.modal-open');
  removeComments();

  document.removeEventListener('keydown', onEscKeydown);
}

//закрытие окна при нажатии на кнопку «крестик»
fullPhotoClose.addEventListener('click', () => {
  closeFullPhoto();
});

export {fillFullPhoto};
