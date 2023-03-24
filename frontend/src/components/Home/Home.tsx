import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../state/UserState';
import { Link as RouterLink } from 'react-router-dom';
import { loginModalState } from '../../state/ModalState';
import { signUpModalState } from '../../state/ModalState';

const Home = () => {
  const user = useRecoilValue(userState);
  const wd = useColorModeValue('whitesmoke', 'dimgray');
  const buttonBg = useColorModeValue('green.400', 'blue.900');
  const hoverBg = useColorModeValue('green.500', 'blue.800');
  const setLoginModal = useSetRecoilState(loginModalState);
  const setSignUpModal = useSetRecoilState(signUpModalState);

  const content = () => {
    if (user.id !== 0) {
      return {
        title: 'Go and view uploaded images or upload a new one',
        button: 'Gallery',
      };
    } else {
      return {
        title: 'Sign up or log in to upload and view images',
        button: 'Login',
      };
    }
  };
  return (
    <Flex justify={'center'} alignItems={'center'} h={'92vh'}>
      <Box
        role={'group'}
        p={6}
        maxW={'495px'}
        bg={wd}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        textAlign={'center'}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'345px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `frontpage.webp`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
        >
          <Image
            rounded={'lg'}
            height={345}
            width={423}
            objectFit={'cover'}
            src={'frontpage.webp'}
            boxShadow={'2xl'}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading fontSize={'2.5rem'} fontFamily={'body'} fontWeight={'bold'}>
            {content().title}
          </Heading>
          {user.id !== 0 ? (
            <Link as={RouterLink} to="teamPage" href="teamPage">
              <Button
                bg={buttonBg}
                color={'white'}
                _hover={{
                  bg: hoverBg,
                }}
                fontSize={'1.9rem'}
                size={'lg'}
              >
                {content().button}
              </Button>
            </Link>
          ) : (
            <Flex direction={'row'} align={'center'}>
              <Button
                marginRight={3}
                bg={buttonBg}
                color={'white'}
                _hover={{
                  bg: hoverBg,
                }}
                onClick={() => setLoginModal(true)}
                fontSize={'1.9rem'}
                size={'lg'}
              >
                {content().button}
              </Button>
              <Button
                bg={buttonBg}
                color={'white'}
                _hover={{
                  bg: hoverBg,
                }}
                onClick={() => setSignUpModal(true)}
                fontSize={'1.9rem'}
                size={'lg'}
              >
                Sign up
              </Button>
            </Flex>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Home;
