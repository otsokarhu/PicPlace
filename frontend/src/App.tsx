import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import NavBar from './components/NavBar';

const App = () => {
  const bgColor = useColorModeValue(
    'linear-gradient(111deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    'linear-gradient(111deg, rgba(7, 50, 52, 1) 0%, rgba(75, 39, 0, 1) 100%)'
  );

  return (
    <Router>
      <Box
        bgGradient={bgColor}
        w="100%"
        h="100%"
        minH="100vh"
        minW="100vw"
        position="absolute"
        top="0"
        left="0"
      >
        <NavBar />

        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
