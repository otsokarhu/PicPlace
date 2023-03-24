import { useToast } from '@chakra-ui/react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../../state/UserState';
import { allPicturesState } from '../../state/PicturesState';
import { bingAllPictures } from '../../state/MiscellaneousStates';
import { useState } from 'react';
import { deletePicture } from '../../services/picService';
import PictureListPage from './PictureListPage';
import { getError } from '../../utils/utils';
import { loginModalState } from '../../state/ModalState';

// component for admin modal
const AdminPage = () => {
  const user = useRecoilValue(userState); // logged in user
  const bing = useSetRecoilState(bingAllPictures); // used to fetch all pictures after deleting one
  const toast = useToast();
  const allPictures = useRecoilValue(allPicturesState);
  const [isOpen, setIsOpen] = useState(false);
  const resetUser = useResetRecoilState(userState);
  const resetPictures = useResetRecoilState(allPicturesState);
  const setLoginModal = useSetRecoilState(loginModalState);

  const toggleWindowConfirm = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePicture(user.token, id);
      toggleWindowConfirm();
      toast({
        title: 'Picture deleted',
        description: 'The picture has been deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      bing('binged');
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
      pictures={allPictures}
      page={'admin'}
      isOpen={isOpen}
      toggleWindowConfirm={toggleWindowConfirm}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleDelete={handleDelete}
      name={'admin'}
    />
  );
};

export default AdminPage;
