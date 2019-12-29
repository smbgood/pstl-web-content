import Typography from "typography";
import funstonTheme from 'typography-theme-moraga'
const typography = new Typography({
    /*baseFontSize: "18px",
    baseLineHeight: 1.45,
    headerFontFamily: ["Bad Script", "serif"],
    bodyFontFamily: ["Imprima", "sans-serif"]*/
    funstonTheme
});

// Insert styles directly into the <head>
typography.injectStyles();

export default typography;