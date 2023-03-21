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
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { infoState } from '../../state/Infostate';
import { userState } from '../../state/UserState';
import { allPicturesState } from '../../state/PicturesState';
import {
  loginModalState,
  signUpModalState,
  userInfoModalState,
} from '../../state/ModalState';
import { Link as RouterLink } from 'react-router-dom';
import UserPage from '../UserPage';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const flexColor = useColorModeValue('antiquewhite', 'lightgray');
  const buttonColor = useColorModeValue('white', 'black');
  const [isOpen, setIsOpen] = useRecoilState(infoState);
  const user = useRecoilValue(userState);
  const [isLoginOpen, setIsLoginOpen] = useRecoilState(loginModalState);
  const [isSignUpOpen, setIsSignUpOpen] = useRecoilState(signUpModalState);
  const [isUserInfoOpen, setIsUserInfoOpen] =
    useRecoilState(userInfoModalState);
  const resetPictures = useResetRecoilState(allPicturesState);
  const resetUser = useResetRecoilState(userState);

  const toggleLoginModal = () => setIsLoginOpen(!isLoginOpen);
  const toggleSignUpModal = () => setIsSignUpOpen(!isSignUpOpen);
  const toggleUserInfoModal = () => setIsUserInfoOpen(!isUserInfoOpen);
  const toggleInfo = () => setIsOpen(!isOpen);
  const handleLogOut = () => {
    resetPictures();
    resetUser();
    window.localStorage.removeItem('loggedUser');
  };

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
        {user.id === 0 ? (
          <Breadcrumb
            fontSize={25}
            spacing={'8px'}
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
        ) : (
          <Breadcrumb
            fontSize={25}
            spacing={'8px'}
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
              <Link as={RouterLink} to="/">
                <Button
                  aria-label="LogoutButton"
                  onClick={handleLogOut}
                  variant={'icon'}
                >
                  Logout
                </Button>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link as={RouterLink} to="/gallery">
                <Button aria-label="GalleryButton" variant={'icon'}>
                  Gallery
                </Button>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button
                aria-label="openUserInfoModal"
                onClick={toggleUserInfoModal}
                variant={'icon'}
              >
                {user.username}
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
        )}
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

      <ModalElement
        onClose={toggleUserInfoModal}
        isOpen={isUserInfoOpen}
        title={'User Info'}
        component={<UserPage />}
      />
    </Flex>
  );
};

export default NavBar;
