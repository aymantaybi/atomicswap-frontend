import { extendTheme } from '@chakra-ui/react';

const fonts = { mono: `'Menlo', monospace` };

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark"
};

const theme = extendTheme({ config, fonts });

export default theme
