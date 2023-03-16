import * as Yup from 'yup';

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
});
