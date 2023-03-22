import { useToast } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/UserState';
import { allPicturesState } from '../../state/PicturesState';
import { useState } from 'react';
import { deletePicture } from '../../services/picService';
import PictureListPage from './PictureListPage';

const AdminPage = () => {
  const user = useRecoilValue(userState); // logged in user
  const toast = useToast();
  const allPictures = useRecoilValue(allPicturesState);
  const [isOpen, setIsOpen] = useState(false);

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
      });
    } catch (error) {
      console.log(error);
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
