// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
const path = require("path")

require("gatsby-image")

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    const result = await graphql(`
        query MyQuery {
            allProductsJson {
                nodes {
                    id
                    name
                    description
                    images
                }
            }
        }
    `)
    if(result.errors){
        reporter.panicOnBuild("AAAAAAAAA")
        return
    }
    const pageTemplate = path.resolve(`src/templates/product-page.js`)
    const ProductsData = result.data.allProductsJson.nodes;
    for (const product of ProductsData) {

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

        createPage({
            path: "/" + product.id,
            component: pageTemplate,
            context: {
                id: product.id,
                name: product.name,
                description: product.description,
                images: imageSharpResult
            }
        })
    }

}
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
        page.matchPath = "/app/*"
        // Update the page.
        createPage(page)
    }

}
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})