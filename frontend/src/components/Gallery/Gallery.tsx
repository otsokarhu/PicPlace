import { Button, Flex, Heading, Text, Link } from '@chakra-ui/react';
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
import { Link as RouterLink } from 'react-router-dom';

const GalleryPage = () => {
  const resetUploadablePicture = useResetRecoilState(uploadingPictureState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(uploadModalState);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    resetUploadablePicture();
  };
  const user = useRecoilValue(userState); // logged in user
  const pictures = useRecoilValue(allPicturesState); // all pictures

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
          <SearchBar />
          <Flex justify={'center'} align={'center'} direction={'row'}>
            <Button marginRight={3} onClick={toggleModal}>
              Upload a picture
            </Button>
            <Link as={RouterLink} to={'/gallery/all-pictures'}>
              <Button>See all pictures</Button>
            </Link>
          </Flex>
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
