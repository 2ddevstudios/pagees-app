import { getDynamicFontSize } from "@/utils/clampcode";
import { createTheme } from "@shopify/restyle";

const PRIMARY_DARK = '#0032BB';
const PRIMARY_COLOR2 = '#1E35E0';
const PRIMARY = '#3843FF';

const COLOR_PALLET = {
  primaryColor: PRIMARY,
  primaryColor2: PRIMARY_COLOR2,
  darkPrimaryrimaryBlue: PRIMARY_DARK,
  fadedPrimary: "#F5F8FF",
  mainBackgroundColor: "white",
  secondaryBackgroundColor: "whitesmoke",
  headerTextColor: "#101828",
  disabledTextColor: "#92969D",
  bodyTextColor: "#667085",
  whiteBodyText: "#F2F4F7",
  whiteHeaderText: "#FFFFFF",
  error: "#F04438",
  btnBgColor: "#FFFFFF",
  black: "black",
  white: "white",
  borderColor: "#D0D5DD",
  buttonBg: '#0085FF',
  primaryGreen:'#3BA935',
};

const theme = createTheme({
  colors: {
    ...COLOR_PALLET,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    "2xl": 48,
    "3xl": 56,
    "4xl": 64,
    "5xl": "",
  },
  textVariants: {
    header2: {
      fontSize: getDynamicFontSize("xl"),
      color: "headerTextColor",
      fontFamily: "AirbnbCereal_W_Blk",
    },
    header2_italic: {
      fontSize: getDynamicFontSize("xl"),
      color: "headerTextColor",
      fontFamily: "AirbnbCereal_W_XtraBold",
    },
    header: {
      fontSize: getDynamicFontSize("xl"),
      color: "headerTextColor",
      fontFamily: "AirbnbCereal_W_XtraBold",
    },
    subheader: {
      fontSize: getDynamicFontSize("lg"),
      color: "headerTextColor",
      fontFamily: "AirbnbCereal_W_Bold",
    },
    medium: {
      fontSize: getDynamicFontSize("md"),
      color: "headerTextColor",
      fontFamily: "AirbnbCereal_W_Medium",
    },
    body: {
      fontSize: getDynamicFontSize("sm"),
      color: "bodyTextColor",
      fontFamily: "AirbnbCereal_W_Light",
      letterSpacing: -1,
      lineHeight: 22.4
    },
    light: {
      fontSize: getDynamicFontSize("xs"),
      color: "bodyTextColor",
      fontFamily: "AirbnbCereal_W_Light",
    },
    xs: {
      fontSize: getDynamicFontSize("xs"),
      color: "bodyTextColor",
      fontFamily: "AirbnbCereal_W_Light",
    },
    defaults: {
      fontSize: getDynamicFontSize("xs"),
      color: "bodyTextColor",
      fontFamily: "AirbnbCereal_W_Light",
    },
  },
});

export type Theme = typeof theme;
export default theme;
