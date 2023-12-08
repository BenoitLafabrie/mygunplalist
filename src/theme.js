import { extendTheme } from "@chakra-ui/react";

//Add color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

//Extend the theme
const theme = extendTheme({
  config,
  fonts: { heading: `"Rubik", sans-serif`, body: `"Rubik", sans-serif` },
  styles: {
    global: {
      body: {
        overscrollBehavior: "none",
      },
    },
  },
});

export default theme;
