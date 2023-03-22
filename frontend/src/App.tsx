import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, useColorModeValue, useToast } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Info from './components/Info';
import GalleryPage from './components/Gallery';
import { useEffect } from 'react';
import {
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
  useRecoilValue,
} from 'recoil';
import { userState } from './state/UserState';
import { loginModalState } from './state/ModalState';
import { allPicturesState, uploadingPictureState } from './state/PicturesState';
import { getAllPictures } from './services/picService';
import { LoginResponse } from './types';
import { getError } from './utils/utils';

const App = () => {
  const bgColor = useColorModeValue(
    'linear-gradient(111deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    'linear-gradient(111deg, rgba(7, 50, 52, 1) 0%, rgba(75, 39, 0, 1) 100%)'
  );
  const resetUser = useResetRecoilState(userState);
  const resetPictures = useResetRecoilState(allPicturesState);
  const toast = useToast();
  const [user, setUser] = useRecoilState(userState);
  const uploadingPicture = useRecoilValue(uploadingPictureState);
  const setAllPictures = useSetRecoilState(allPicturesState);
  const setLoginModal = useSetRecoilState(loginModalState);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) as LoginResponse;
      setUser((prev) => ({
        ...prev,
        id: user.id,
        username: user.username,
        token: user.access_token,
        admin: user.admin,
      }));
    }
  }, []);

  useEffect(() => {
    if (user.token === '') {
      return;
    }
    void (async () => {
      try {
        const pictures = await getAllPictures(user.token);
        setAllPictures(pictures);
        return;
      } catch (error) {
        const errorMessage = getError(error);
        if (errorMessage.includes('401')) {
          toast({
            title: 'Session expired',
            description: 'Please log in again',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          resetUser();
          resetPictures();
          window.localStorage.removeItem('loggedUser');
          setLoginModal(true);
          return;
        }
      }
    })();
  }, [user.token, uploadingPicture]);

  return (
    <Router>
      <Box
        bgGradient={bgColor}
        minH="100vh"
        minW="100vw"
        position="relative"
        bgSize={'cover'}
      >
        <NavBar />
        <Box zIndex={10} top={'50px'} position={'sticky'}>
          <Box right={5} position={'absolute'}>
            <Info />
          </Box>
        </Box>

        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
