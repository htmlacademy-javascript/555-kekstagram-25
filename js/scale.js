const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;

const buttonControlSmaller = document.querySelector('.scale__control--smaller'); //кнопка уменьшения масштаба
const buttonControlBigger = document.querySelector('.scale__control--bigger'); //кнопка увеличения масштаба
const inputControlValue = document.querySelector('.scale__control--value'); //поле со значением масштаба
const imageUploadPreview = document.querySelector('div.img-upload__preview img'); //редактируемое изображение

let currentValue = 100; //числовое выражение масштаба

inputControlValue.value = `${currentValue}%`; //значение масштаба в процентах

//увеличение изображения по «клику» на кнопку «+»
buttonControlBigger.addEventListener('click', () => {
  if (currentValue !== MAX_VALUE) {
    currentValue += STEP;
    imageUploadPreview.style.transform = `scale(${currentValue / 100})`;
    inputControlValue.value = `${currentValue}%`;
  }
});

//уменьшение изображения по «клику» на кнопку «-»
buttonControlSmaller.addEventListener('click', () => {
  if (currentValue !== MIN_VALUE) {
    currentValue -= STEP;
    imageUploadPreview.style.transform = `scale(${currentValue / 100})`;
    inputControlValue.value = `${currentValue}%`;
  }
});

export { imageUploadPreview };
