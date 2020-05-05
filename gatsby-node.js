require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    const { createRedirect } = actions

    createRedirect({
        fromPath: `/`,
        toPath: `/shope`,
        redirectInBrowser: true,
        isPermanent: true,
    })

    const blogResult = await graphql(`
        query MyBlogMDXQuery {
          allMdx {
            edges {
              node {
                id
                body
                frontmatter {
                  path
                  title
                  date
                  fullimage
                  product
                  glowcolor
                  attribution{
                    attrTitle
                    attrAuthor
                    attrLink
                    attrLicense
                    attrMods                    
                  }
                }
                excerpt
              }
            }
          }
        }
    `)
    if(blogResult.errors){
        reporter.panicOnBuild("AAAAAAAAA")
        return
    }

    const blogTemplate = path.resolve(`src/templates/blog-page.js`)
    const BlogData = blogResult.data.allMdx.edges;
    for(const edge of BlogData){
        createPage({
            path: "/" + edge.node.frontmatter.path,
            component: blogTemplate,
            context: {
                id: edge.node.id,
                blog: edge
            }
        })
    }

}
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/shope/)) {
        page.matchPath = "/shope/*"
        // Update the page.
        createPage(page)
    }

}
/*
const webpack= require('webpack');
exports.onCreateWebpackConfig = ({
                                     stage,
                                     rules,
                                     loaders,
                                     plugins,
                                     actions,
                                 }) => {
    actions.setWebpackConfig({
        plugins: [
            new webpack.ProvidePlugin({
                window: {}
            }),
        ],
    })
}*/
