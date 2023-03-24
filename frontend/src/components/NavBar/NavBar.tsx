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
  userModalState,
  adminModalState,
} from '../../state/ModalState';
import { Link as RouterLink } from 'react-router-dom';
import UserPage from '../PicturePages/UserPage';
import AdminPage from '../PicturePages/AdminPage';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const flexColor = useColorModeValue('antiquewhite', 'black');
  const buttonColor = useColorModeValue('white', 'black');
  const [isInfoOpen, setInfoIsOpen] = useRecoilState(infoState); // defines if info modal is open or closed
  const user = useRecoilValue(userState); // logged in user
  const [isLoginOpen, setIsLoginOpen] = useRecoilState(loginModalState); // defines if login modal is open or closed
  const [isSignUpOpen, setIsSignUpOpen] = useRecoilState(signUpModalState); // defines if signup modal is open or closed
  const [isUserModalOpen, setIsUserModalOpen] = useRecoilState(userModalState); // defines if user modal is open or closed
  const [isAdminModalOpen, setIsAdminModalOpen] =
    useRecoilState(adminModalState); // defines if admin modal is open or closed
  const resetPictures = useResetRecoilState(allPicturesState); // resets allpictures state
  const resetUser = useResetRecoilState(userState); // resets user state

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
            {/* Breadcrumbitems when user is not logged in */}
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
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                variant={'icon'}
              >
                Login
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button
                aria-label="openSignUpModal"
                onClick={() => setIsSignUpOpen(!isSignUpOpen)}
                variant={'icon'}
              >
                Sign Up
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button
                aria-label="InfoButton"
                onClick={() => setInfoIsOpen(!isInfoOpen)}
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
            {/* Breadcrumbitems when user is logged in */}
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
                onClick={() => setIsUserModalOpen(!isUserModalOpen)}
                variant={'icon'}
              >
                {user.username}
              </Button>
            </BreadcrumbItem>
            {user.admin && (
              <BreadcrumbItem>
                <Button
                  aria-label="openAdminInfoModal"
                  onClick={() => setIsAdminModalOpen(!isAdminModalOpen)}
                  variant={'icon'}
                >
                  Admin Page
                </Button>
              </BreadcrumbItem>
            )}

            <BreadcrumbItem>
              <Button
                aria-label="InfoButton"
                onClick={() => setInfoIsOpen(!isInfoOpen)}
                variant={'icon'}
              >
                <InfoIcon boxSize={7} />
              </Button>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Center>
      {/* button to toggle light/dark mode */}

      <Button
        onClick={toggleColorMode}
        right={2}
        top={2}
        bgColor={buttonColor}
        variant={'icon'}
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>

      {/* all the modal elements */}
      <ModalElement
        onClose={() => setIsLoginOpen(!isLoginOpen)}
        isOpen={isLoginOpen}
        title={'Login'}
        component={<LoginBox />}
      />

      <ModalElement
        onClose={() => setIsSignUpOpen(!isSignUpOpen)}
        isOpen={isSignUpOpen}
        title={'Sign Up'}
        component={<SignUpBox />}
      />

      <ModalElement
        onClose={() => setIsUserModalOpen(!isUserModalOpen)}
        isOpen={isUserModalOpen}
        title={'User Info'}
        component={<UserPage />}
      />

      <ModalElement
        onClose={() => setIsAdminModalOpen(!isAdminModalOpen)}
        isOpen={isAdminModalOpen}
        title={'Admin Page'}
        component={<AdminPage />}
      />
    </Flex>
  );
};

export default NavBar;
