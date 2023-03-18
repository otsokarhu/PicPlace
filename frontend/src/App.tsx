import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Info from './components/Info';
import GalleryPage from './components/PicPage/PicPage';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from './state/UserState';

const App = () => {
  const bgColor = useColorModeValue(
    'linear-gradient(111deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    'linear-gradient(111deg, rgba(7, 50, 52, 1) 0%, rgba(75, 39, 0, 1) 100%)'
  );
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser((prev) => ({
        ...prev,
        id: user.id,
        username: user.username,
        token: user.access_token,
        admin: user.admin,
      }));
    }
  }, []);

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
