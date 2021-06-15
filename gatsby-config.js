module.exports = {
    siteMetadata: {
        title: ` Dave's Famous Whiskey Barrel Truck Bed Covers `,
        description: `Welcome to the online store to buy our unique handcrafted truck beds`,
        author: `@davestruckbarrels`,
        siteUrl: "https://davesbarrels.com",
    },
    plugins: [
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: [".mdx", ".md"],
            }
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/static/images/uploads`,
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
/*        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-177640999-1",
            },
        },*/
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
                        /*if(path.indexOf("shope") > -1){
                            let pageNameArray = ['about', 'contact', 'cart', 'categories', 'checkout']
                            pageNameArray.forEach(function(value, index){
                                outArray.push({ url: `${siteInfo.siteMetadata.siteUrl}${path}${pageNameArray[index]}`, changefreq: `daily`, priority: 1});
                            });
                        }*/
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
