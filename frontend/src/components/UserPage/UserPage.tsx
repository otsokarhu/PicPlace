import { Flex, Heading, Text, Image } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/UserState';
import { allPicturesState } from '../../state/PicturesState';
import { useState, useEffect } from 'react';
import { PictureFromServer } from '../../types';

const UserPage = () => {
  const user = useRecoilValue(userState);
  const allPictures = useRecoilValue(allPicturesState);
  const [userPictures, setUserPictures] = useState([] as PictureFromServer[]);

  useEffect(() => {
    if (user.id !== 0) {
      const userPics = allPictures.filter(
        (pic) => pic.created_by_id === user.id
      );
      setUserPictures(userPics);
    }
  }, [user]);

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
              <Image
                key={pic.id}
                src={pic.link}
                alt={pic.description}
                w="300px"
                h="300px"
                m={2}
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
