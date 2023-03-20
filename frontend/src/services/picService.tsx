import axios from 'axios';
import { Picture2 } from '../types';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllPictures = async (token: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<Picture2[]>(
      `${apiBaseUrl}/api/images`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
