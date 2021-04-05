module.exports = {
    siteMetadata: {
        title: ` Home of the World Famous Whiskey Barrel Truck Cover`,
        description: `Welcome to the online store to buy our unique crafts`,
        author: `@davestruckbarrels`,
        siteUrl: "https://davesbarrels.com",
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
                name: `Dave's Truck Barrels`,
                short_name: `Dave's Barrels`,
                start_url: `/`,
                background_color: `#323b59`,
                theme_color: `#323b59`,
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
        `gatsby-transformer-json`,
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
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./content/categories/`,
                name: "categories"
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./content/siteadmin/`,
                name: "cms"
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: './content/baths/',
                name: "baths"
            }
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
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-177640999-1",
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                output: `/sitemap.xml`,
                // Exclude specific pages or groups of pages using glob parameters
                // See: https://github.com/isaacs/minimatch
                // The example below will exclude the single `path/to/page` and all routes beginning with `category`
                exclude: [`/category/*`, `/path/to/page`],
                query: `
                {
                  siteInfo: site {
                        siteMetadata {
                            siteUrl
                        }
                  }
        
                  allSitePage {
                    nodes {
                      path
                    }
                  }
                }`,
                resolveSiteUrl: ({siteInfo, allSitePage}) => {
                    //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
                    return siteInfo.siteMetadata.siteUrl
                },
                serialize: ({ siteInfo, allSitePage }) => {
                    let outArray = [];
                    allSitePage.nodes.forEach(function(value, index){
                        let path = value.path;
                        if(path.indexOf("shope") > -1){
                            let pageNameArray = ['about', 'contact', 'cart', 'categories', 'checkout']
                            pageNameArray.forEach(function(value, index){
                                outArray.push({ url: `${siteInfo.siteMetadata.siteUrl}${path}${pageNameArray[index]}`, changefreq: `daily`, priority: 1});
                            });
                        }
                        outArray.push({
                            url: `${siteInfo.siteMetadata.siteUrl}${path}`,
                            changefreq: `daily`,
                            priority: 0.7,
                        });
                    })
                    return outArray;
                }
            }
        }
    ],
}
