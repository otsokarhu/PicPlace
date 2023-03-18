import { atom } from 'recoil';
import { User } from '../types';

export const userState = atom<User>({
  key: 'userState',
  default: {
    username: '',
    admin: false,
    id: 0,
    token: '',
  },
});