//import {dark} from '@theme-ui/presets'

export default {
/*    ...dark,
    styles:{
        ...dark.styles
    },*/
    colors: {
        secondary: "#1c638ae6",
        primary: "#7f160038",
        background: "rgba(10, 14, 124, 1)",
        text: "rgb(252,251,251)",
    },
    fonts: {
        body: '"Arima Madurai" system-ui, sans-serif',
        heading: '"Bad Script", system-ui, sans-serif',
        subheading: '"Avenir Next", cursive',
        monospace: "Menlo, monospace",
    },
    fontWeights: {
        body: 400,
        subheading: 550,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125,
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    styles: {
        // the keys used here reference elements in MDX
        h1: {
            // the style object for each element
            // can reference other values in the theme
            fontFamily: "heading",
            fontWeight: "heading",
            lineHeight: "heading",
            marginTop: 0,
            marginBottom: 3,
        },
        h2: {
            fontFamily: "subheading",
            fontWeight: "subheading",
            lineHeight: "body",
            marginTop: 1,
            marginBottom: 1,
        },
        a: {
            fontFamily: "subheading",
            color: "primary",
            ":hover, :focus": {
                color: "secondary",
            },
        },
        p:{
            color: "secondary",
        }
        // more styles can be added as needed
    },
}