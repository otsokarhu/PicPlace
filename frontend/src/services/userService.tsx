import axios from 'axios';
import { SignUpResponse, SignUpValues } from '../types';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const signUp = async (values: SignUpValues) => {
  try {
    const response = await axios.post<SignUpResponse>(
      `${apiBaseUrl}/api/register`,
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
