export default {
    colors: {
        secondary: "rgba(112, 205, 255, 1)",
        primary: "rgba(66, 0, 57, 1)",
        background: "rgba(139, 249, 124, 1)",
        text: "rgba(240, 140, 174, 1)",
    },
    fonts: {
        body: "Imprima, system-ui, sans-serif",
        heading: "Arima Madurai, system-ui, sans-serif",
        subheading: "Bad Script, cursive",
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
            backgroundColor: 'primary',
        }
        // more styles can be added as needed
    },
}