/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

if(!process.env.STRIPE_SECRET_KEY) {
    require('dotenv').config({
        path: `.env.${process.env.NODE_ENV}`,
    })
}

module.exports = {
    siteMetadata: {
        title: `Banshee Babe Boutique`,
        description: `Welcome to the online gift shop of Banshee Babe Boutique`,
        author: `@colourmeoutrageous`,
    },
    plugins: [
        "gatsby-plugin-theme-ui",
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: [".mdx", ".md"],
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Banshee Babe Boutique`,
                short_name: `Banshee Babe`,
                start_url: `/`,
                background_color: `#6b37bf`,
                theme_color: `#6b37bf`,
                // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
                // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
                display: `standalone`,
                icon: `src/utils/icon.png`, // This path is relative to the root of the site.
            }
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/static/images/uploads`,
            },
        },
        /*{
            resolve: "gatsby-plugin-typography",
            options: {
                pathToConfigModule: "src/utils/typography.js"
            }
        },*/
        "gatsby-plugin-stripe",
        {
            resolve: `gatsby-source-stripe`,
            options: {
                objects: ["Sku"],
                secretKey: process.env.STRIPE_SECRET_KEY,
                downloadFiles: true,
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./content/products/`,
                name: "products"
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./content/categories/`,
                name: "categories"
            },
        },
        {
            resolve: `gatsby-plugin-netlify-cms`,
            options: {
                /**
                 * One convention is to place your Netlify CMS customization code in a
                 * `src/cms` directory.
                 */
                modulePath: `${__dirname}/src/components/cms.js`,
            },
        },
    ],
}
