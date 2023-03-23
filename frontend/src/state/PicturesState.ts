import { FileWithPath } from 'react-dropzone';
import { atom } from 'recoil';
import { PictureFromServer } from '../types';


export const allPicturesState = atom<PictureFromServer[]>({
  key: 'allPicturesState',
  default: [],
});

export const uploadingPictureState = atom({
  key: 'uploadingPictureState',
  default: [] as FileWithPath[],
});

export const bingAllPictures = atom({
  key: 'bingAllPictures',
  default: ''
});

