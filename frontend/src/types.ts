import * as Yup from 'yup';

const adminCode = import.meta.env.VITE_ADMIN_PASSWORD;


export type ModalElementProps = {
  component: JSX.Element;
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

export type LoginValues = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  username: string;
  admin: boolean;
  id: number;
};

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Please fill in your password')
});


export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Please fill in your password'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  adminPassword: Yup.string()
    .nullable()
    .oneOf([adminCode], 'Incorrect admin code')
});

export interface Picture {
  id: number;
  url: string;
  caption: string;
}

export interface User {
  id: number;
  username: string;
  admin?: boolean;
  pictures?: Picture[];
  token?: string;
}
