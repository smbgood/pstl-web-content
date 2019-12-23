// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    const result = await graphql(`
        query MyQuery {
            allProductsJson {
                nodes {
                    id
                    name
                    description
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
        createPage({
            path: "/" + product.id,
            component: pageTemplate,
            context: {
                id: product.id,
                name: product.name
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