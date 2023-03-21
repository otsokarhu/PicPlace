import { atom } from 'recoil';

export const loginModalState = atom({
  key: 'loginModalState',
  default: false,
});

export const signUpModalState = atom({
  key: 'signUpModalState',
  default: false,
});

export const userModalState = atom({
  key: 'userInfoModalState',
  default: false,
});

export const uploadModalState = atom({
  key: 'uploadModalState',
  default: false,
});

export const adminModalState = atom({
  key: 'adminModalState',
  default: false,
});