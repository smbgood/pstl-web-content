/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    plugins: [
        "gatsby-plugin-theme-ui",
        "gatsby-plugin-mdx",{
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
                icon: `src/images/icon.png`, // This path is relative to the root of the site.
            }
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: "gatsby-source-graphql",
            options: {
                typeName: "RMAPI",
                fieldName: "rickAndMorty",
                url: "https://rickandmortyapi-gql.now.sh/",
            },
        },
    ],
}
