import { atom } from 'recoil';
import { Picture2 } from '../types';

export const allPicturesState = atom<Picture2[]>({
  key: 'allPicturesState',
  default: [],
});