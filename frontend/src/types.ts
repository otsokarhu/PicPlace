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

export type SignUpValues = {
  username: string;
  password: string;
  confirmPassword?: string;
  adminPassword?: string ;
  admin?: boolean;
};

export type SignUpResponse = {
  username: string;
  admin: boolean;
  status: string;
};

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Please fill in your password')
});


export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long'),
  password: Yup.string()
    .required('Please fill in your password')
    .min(4, 'Password must be at least 4 characters long'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  adminPassword: Yup.string()
    .nullable()
    .oneOf([adminCode], 'Incorrect admin code')
});

export const CaptionValidation = Yup.object().shape({
  caption: Yup.string()
    .required('Please fill in a caption')
    .min(3, 'Caption must be at least 3 characters long')
});


export interface User {
  id: number;
  username: string;
  admin?: boolean;
  token: string;
}

// interface for pictures from server
export interface PictureFromServer {
  id: number;
  path: string;
  description: string;
  size: string;
  created_by_id: number;
  link?: string;
}

// interface for pictures to server
export interface PictureUpload {
  file: File;
  description: string;
  size: string;
  uploaded_by_id: number;
}

export type PictureUploadProps = {
  picture: PictureUpload;
  token: string;
};

export type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  body: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
};

export type SinglePictureProps = {
  pic: PictureFromServer;
  toggleWindowConfirm: () => void;
  isOpen: boolean;
  handleDelete: (id: number) => void;
};




