import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Picture } from '../../types';
import SearchBar from './Search';
import { userState } from '../../state/UserState';
import { uploadingPictureState } from '../../state/PicturesState';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import ImageDropzone from '../PicUpload';
import ModalElement from '../Modal';
import Carousel from './Carousel';

const GalleryPage = () => {
  const uploadablePicture = useRecoilValue(uploadingPictureState);
  const resetUploadablePicture = useResetRecoilState(uploadingPictureState);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    resetUploadablePicture();
  };
  const user = useRecoilValue(userState);
  console.log(uploadablePicture);
  const handleSearch = () => {
    console.log('search');
  };

  useEffect(() => {
    // Fetch pictures from your API or database
    const fetchedPictures: Picture[] = [
      {
        id: 1,
        caption: 'Description 1',
        url: 'https://picsum.photos/200/300',
      },
      {
        id: 2,
        caption: 'Description 2',
        url: 'https://picsum.photos/200/300',
      },
    ];
    setPictures(fetchedPictures);
  }, []);

  return (
    <Flex
      justify={'space-evenly'}
      align={'center'}
      h={'92vh'}
      direction={'column'}
    >
      <Heading>Welcome to PicPlace-Gallery</Heading>
      {user.id !== 0 ? (
        <>
          <Carousel pictures={pictures} />
          <Heading>Search for pictures</Heading>
          <SearchBar onSearch={handleSearch} />
          <Button onClick={toggleModal}>Upload a picture</Button>
          <ModalElement
            onClose={toggleModal}
            isOpen={isModalOpen}
            title={'Upload a picture'}
            component={<ImageDropzone />}
          />
        </>
      ) : (
        <Text fontSize={'xl'}>Login to view uploaded pictures</Text>
      )}
    </Flex>
  );
};

export default GalleryPage;
