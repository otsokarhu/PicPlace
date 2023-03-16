import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  Link,
  useColorMode,
  Button,
  Center,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaHome } from 'react-icons/fa';
import ModalElement from '../Modal';
import LoginBox from '../Login';
import SignUpBox from '../SignUp';
import '@fontsource/sono';
import { useState } from 'react';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const flexColor = useColorModeValue('antiquewhite', 'lightgray');
  const buttonColor = useColorModeValue('white', 'black');

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const toggleLoginModal = () => setIsLoginOpen(!isLoginOpen);
  const toggleSignUpModal = () => setIsSignUpOpen(!isSignUpOpen);

  return (
    <Flex
      pos="sticky"
      top={0}
      w={'100%'}
      h={'8vh'}
      bgColor={flexColor}
      opacity={0.8}
      zIndex={1}
    >
      <Center w={'100%'} h={'100%'}>
        <Breadcrumb
          fontSize={25}
          spacing={'8px'}
          fontFamily={'"Sono", sans-serif;'}
          separator={<ChevronRightIcon color={'gray.500'} />}
        >
          <BreadcrumbItem>
            <Link href="/">
              <Button aria-label="HomeButton" variant={'icon'}>
                <Icon as={FaHome} boxSize={8} />
              </Button>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Button
              aria-label="openLoginModal"
              onClick={toggleLoginModal}
              variant={'icon'}
            >
              Login
            </Button>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Button
              aria-label="openSignUpModal"
              onClick={toggleSignUpModal}
              variant={'icon'}
            >
              Sign Up
            </Button>
          </BreadcrumbItem>
        </Breadcrumb>
      </Center>

      <Button
        onClick={toggleColorMode}
        right={2}
        top={2}
        bgColor={buttonColor}
        variant={'icon'}
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>

      <ModalElement
        onClose={toggleLoginModal}
        isOpen={isLoginOpen}
        title={'Login'}
        component={<LoginBox />}
      />

      <ModalElement
        onClose={toggleSignUpModal}
        isOpen={isSignUpOpen}
        title={'Sign Up'}
        component={<SignUpBox />}
      />
    </Flex>
  );
};

export default NavBar;
