import { Grid, GridItem, Image, Flex, Heading, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { allPicturesState } from '../../state/PicturesState';
import { userState } from '../../state/UserState';
import { useColorModeValue } from '@chakra-ui/color-mode';

const AllPictures = () => {
  const allPictures = useRecoilValue(allPicturesState);
  const user = useRecoilValue(userState);
  const boxBg = useColorModeValue('whitesmoke', 'dimgray');

  return (
    <Flex
      justify={'start'}
      align={'center'}
      h={'92vh'}
      direction={'column'}
      marginTop={2}
    >
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
