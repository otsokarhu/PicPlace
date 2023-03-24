import { useToast } from '@chakra-ui/react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../../state/UserState';
import { allPicturesState } from '../../state/PicturesState';
import { useState, useEffect } from 'react';
import { PictureFromServer } from '../../types';
import { deletePicture } from '../../services/picService';
import PictureListPage from './PictureListPage';
import { getError } from '../../utils/utils';
import { loginModalState } from '../../state/ModalState';

// component for user modal
const UserPage = () => {
  const user = useRecoilValue(userState); // logged in user
  const toast = useToast();
  const allPictures = useRecoilValue(allPicturesState); // all pictures from server
  const [userPictures, setUserPictures] = useState([] as PictureFromServer[]); // pictures of logged in user
  const [isOpen, setIsOpen] = useState(false); // is the delete confirmation window open
  const resetUser = useResetRecoilState(userState); // resets user state
  const resetPictures = useResetRecoilState(allPicturesState); // resets pictures state
  const setLoginModal = useSetRecoilState(loginModalState); // sets login modal to true

  // filters logged in users pictures from all pictures
  useEffect(() => {
    if (user.id !== 0) {
      const userPics = allPictures.filter(
        (pic) => pic.created_by_id === user.id
      );
      setUserPictures(userPics);
    }
  }, [user, allPictures]);

  const toggleWindowConfirm = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePicture(user.token, id);
      const newPictures = userPictures.filter((pic) => pic.id !== id);
      setUserPictures(newPictures);
      toggleWindowConfirm();
      toast({
        title: 'Picture deleted',
        description: 'Your picture has been deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      const errorMessage = getError(error);
      if (errorMessage.includes('401')) {
        // jwt expired
        toast({
          title: 'Session expired',
          description: 'Please log in again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        resetUser();
        resetPictures();
        window.localStorage.removeItem('loggedUser');
        setLoginModal(true);
        return;
      }
      toast({
        // other error
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <PictureListPage
      pictures={userPictures}
      page={'user'}
      isOpen={isOpen}
      toggleWindowConfirm={toggleWindowConfirm}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleDelete={handleDelete}
      name={user.username}
    />
  );
};

export default UserPage;
