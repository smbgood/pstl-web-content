import Typography from "typography";
import moragaTheme from 'typography-theme-moraga'
const typography = new Typography(
    /*baseFontSize: "18px",
    baseLineHeight: 1.45,
    headerFontFamily: ["Bad Script", "serif"],
    bodyFontFamily: ["Imprima", "sans-serif"]*/
    moragaTheme
);

// Insert styles directly into the <head>
typography.injectStyles();
export const { scale, rhythm, options } = typography

export default typography;