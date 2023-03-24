import { Grid, GridItem, Image, Flex, Heading, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { allPicturesState } from '../../state/PicturesState';
import { userState } from '../../state/UserState';
import { useColorModeValue } from '@chakra-ui/color-mode';
import ModalElement from '../Modal';
import { useState } from 'react';
import { PictureFromServer } from '../../types';

// This component is used to display all the uploaded pictures
const AllPictures = () => {
  const allPictures = useRecoilValue(allPicturesState);
  const user = useRecoilValue(userState);
  const boxBg = useColorModeValue('whitesmoke', 'dimgray');
  const [isOpen, setIsOpen] = useState(false);
  const [picture, setPicture] = useState<PictureFromServer>(allPictures[0]);

  const handleOpen = (id: number) => {
    setIsOpen(true);
    setPicture(allPictures.find((pic) => pic.id === id) as PictureFromServer);
  };

  return (
    <Flex
      justify={'start'}
      align={'center'}
      h={'92vh'}
      direction={'column'}
      marginTop={2}
    >
      <ModalElement
        isOpen={isOpen}
        title={picture.description}
        onClose={() => setIsOpen(false)}
        component={<Image src={picture.link} alt={picture.description} m={2} />}
      />
      <Heading>All pictures uploaded to PicPlace:</Heading>
      {user.id !== 0 ? (
        <>
          {allPictures.length !== 0 ? (
            <Grid
              alignItems={'center'}
              templateColumns="repeat(4, 1fr)"
              gap={6}
              p={4}
              borderRadius="lg"
            >
              {allPictures.map((pic) => (
                <GridItem key={pic.id}>
                  <Flex
                    justify={'center'}
                    alignItems={'center'}
                    h={'20vh'}
                    w={'20vw'}
                    bg={boxBg}
                    borderRadius="lg"
                    boxShadow="md"
                    direction={'column'}
                  >
                    <Image
                      src={pic.link}
                      alt={pic.description}
                      onClick={() => handleOpen(pic.id)}
                      h={'15vh'}
                      w={'15vw'}
                      borderRadius="lg"
                      boxShadow="md"
                      _hover={{ boxShadow: 'lg' }}
                    />
                    <Text>{pic.description}</Text>
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Heading>No pictures uploaded yet</Heading>
          )}
        </>
      ) : (
        <Heading>Log in to see all pictures</Heading>
      )}
    </Flex>
  );
};

export default AllPictures;
