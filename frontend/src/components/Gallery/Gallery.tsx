import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import SearchBar from './Search';
import { userState } from '../../state/UserState';
import {
  uploadingPictureState,
  allPicturesState,
} from '../../state/PicturesState';
import { uploadModalState } from '../../state/ModalState';
import { useResetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import ImageDropzone from '../Upload';
import ModalElement from '../Modal';
import Carousel from './Carousel';

const GalleryPage = () => {
  const resetUploadablePicture = useResetRecoilState(uploadingPictureState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(uploadModalState);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    resetUploadablePicture();
  };
  const user = useRecoilValue(userState);
  const pictures = useRecoilValue(allPicturesState);

  const handleSearch = () => {
    console.log('search');
  };

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
