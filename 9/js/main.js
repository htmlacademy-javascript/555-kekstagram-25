import './util.js';
import './photo-preview.js';
import './photo-full.js';
import './form.js';
import './scale.js';
import './slider.js';
import './upload-image.js';
import './debounce.js';
import './filters.js';
import { renderPhoto, onButtonClick, photos } from './photo-preview.js';
import { setUserFormSubmit, closeUserModal } from './form.js';
import { getData } from './api.js';

const getTask = async () => {
  const data = await getData();

  photos.setData(data);
  renderPhoto();
  onButtonClick();

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  setUserFormSubmit(closeUserModal);
};

getTask();
