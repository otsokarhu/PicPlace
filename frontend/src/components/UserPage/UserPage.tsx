import { Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/UserState';
import { allPicturesState } from '../../state/PicturesState';
import { useState, useEffect } from 'react';
import { PictureFromServer } from '../../types';
import { deletePicture } from '../../services/picService';
import SinglePicture from './SinglePicture';

const UserPage = () => {
  const user = useRecoilValue(userState);
  const toast = useToast();
  const allPictures = useRecoilValue(allPicturesState);
  const [userPictures, setUserPictures] = useState([] as PictureFromServer[]);
  const [isOpen, setIsOpen] = useState(false);

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
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      h="100%"
      p={4}
    >
      <Heading size="2xl" mb={4}>
        Hi, {user.username}!
      </Heading>
      {userPictures.length > 0 ? (
        <>
          {userPictures.length === 1 ? (
            <>
              <Text>You have uploaded 1 picture</Text>
              <Text>Here is your picture:</Text>
            </>
          ) : (
            <>
              <Text>You have uploaded {userPictures.length} pictures</Text>
              <Text>Here are your pictures:</Text>
            </>
          )}
          <Flex direction="row" wrap="wrap" justify="center" mt={4}>
            {userPictures.map((pic) => (
              <SinglePicture
                key={pic.id}
                pic={pic}
                toggleWindowConfirm={toggleWindowConfirm}
                isOpen={isOpen}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                handleDelete={handleDelete}
              />
            ))}
          </Flex>
        </>
      ) : (
        <Text>You have not uploaded any pictures yet</Text>
      )}
    </Flex>
  );
};

export default UserPage;
