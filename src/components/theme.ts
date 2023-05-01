import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 시스템을 따라 갈것인가 내가 할 것인가
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
