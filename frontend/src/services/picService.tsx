import axios from 'axios';
import { FileWithPath } from 'react-dropzone';
import { PictureFromServer, PictureUpload } from '../types';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const bucketBaseUrl = import.meta.env.VITE_S3_BUCKET;

export const getAllPictures = async (token: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<PictureFromServer[]>(
      `${apiBaseUrl}/api/images`,
      config
    );
    response.data.forEach((picture) => {
      picture.link = `${bucketBaseUrl}/${picture.path}`;
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadPicture = async (
  token: string,
  file: FileWithPath,
  size: string,
  description: string,
  user_id: number,
  setUploadingSpinner: (value: boolean) => void
) => {
  try {
    setUploadingSpinner(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('size', size);
    formData.append('description', description);
    formData.append('created_by_id', user_id.toString());

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post<PictureUpload>(
      `${apiBaseUrl}/api/upload`,
      formData,
      config
    );
    setUploadingSpinner(false);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deletePicture = async (token: string, image_id: number) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.delete(`${apiBaseUrl}/api/images/${image_id}`, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
