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

    const result = await graphql(`
        query MyQuery {
            allProductsJson {
                edges{
                    node {
                        id
                        name
                        description
                        images
                    }
                }
            }
        }
    `)
    if(result.errors){
        reporter.panicOnBuild("AAAAAAAAA")
        return
    }
    const pageTemplate = path.resolve(`src/templates/product-page.js`)
    const ProductsData = result.data.allProductsJson.edges;
    for (let product of ProductsData) {
        product = product.node;

        const imageRegex = product.images
        const imageResult = await graphql(`
        query FileNamesQuery {
            allFile(filter: {relativePath: {regex: "/${imageRegex}//"}}) {
                edges {
                    node {
                        id
                        relativePath
                    }
                }
            }
        }
        `)
        /*if(imageResult.errors){
            reporter.panicOnBuild("BBBBBBB")
            return
        }*/
        let querySet = []
        if(imageResult && imageResult.data && imageResult.data.allFile && imageResult.data.allFile.edges){
            for(const edge of imageResult.data.allFile.edges){
                if(edge.node) {
                    const node = edge.node;
                    if(node && node.relativePath){
                        let path = node.relativePath;
                        const pathToQuery = path.substring(path.lastIndexOf("/")+1)
                        querySet.push(pathToQuery)
                    }
                }
            }
        }
        let counter = 0
        let imageNamesToQuery = `["`
        for(const value of querySet){
            counter++
            if(counter < querySet.length) {
                imageNamesToQuery += value + `", "`
            }else{
                imageNamesToQuery += value
            }
        }
        imageNamesToQuery += `"]`

        const imageSharpResult = await graphql(`
        query SharpQuery {
            allImageSharp(filter: {fluid: {originalName: {in: ${imageNamesToQuery} }}}) {
            edges {
              node {
                fixed{
                    originalName
                    src
                    srcSet
                }
              }
            }
          }
        }
        `)

        const stripeResult = await graphql(`
        query StripeQuery {
            allStripeSku(filter: {product: {id: {eq: "${product.id}"}}}) {
                edges {
                  node {
                    id
                    currency
                    price                  
                    product {
                      name
                      id                      
                    }                    
                  }
                }
            }
        }       
        `)

        createPage({
            path: "/" + product.id,
            component: pageTemplate,
            context: {
                id: product.id,
                name: product.name,
                description: product.description,
                images: imageSharpResult,
                stripeData: stripeResult.data.allStripeSku.edges[0].node,
            }
        })
    }

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
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})*/
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
