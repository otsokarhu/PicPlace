import { extendTheme } from '@chakra-ui/react';
import "@fontsource/sono";

const customTheme = extendTheme({
  fonts: {
    heading:
    '"Sono", sans-serif;',
    body: '"Sono", sans-serif;',
  },
});

export default customTheme;