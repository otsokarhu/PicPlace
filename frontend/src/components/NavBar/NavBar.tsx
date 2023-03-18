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
import {
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import { FaHome } from 'react-icons/fa';
import ModalElement from '../Modal';
import LoginBox from '../Login';
import SignUpBox from '../SignUp';
import '@fontsource/sono';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { infoState } from '../../state/Infostate';
import { userState } from '../../state/UserState';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const flexColor = useColorModeValue('antiquewhite', 'lightgray');
  const buttonColor = useColorModeValue('white', 'black');
  const [isOpen, setIsOpen] = useRecoilState(infoState);
  const [user, setUser] = useRecoilState(userState);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const toggleLoginModal = () => setIsLoginOpen(!isLoginOpen);
  const toggleSignUpModal = () => setIsSignUpOpen(!isSignUpOpen);
  const toggleInfo = () => setIsOpen(!isOpen);
  const handleLogOut = () => {
    setUser((prev) => ({
      ...prev,
      id: 0,
      username: '',
      token: '',
      admin: false,
    }));
  };

  console.log(user);

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
            {!user.token ? (
              <Button
                aria-label="openLoginModal"
                onClick={toggleLoginModal}
                variant={'icon'}
              >
                Login
              </Button>
            ) : (
              <Button
                aria-label="LogoutButton"
                onClick={handleLogOut}
                variant={'icon'}
              >
                Logout
              </Button>
            )}
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

          <BreadcrumbItem>
            <Button
              aria-label="InfoButton"
              onClick={toggleInfo}
              variant={'icon'}
            >
              <InfoIcon boxSize={7} />
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
