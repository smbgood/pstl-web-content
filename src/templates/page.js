// src/templates/Page.js
import React from "react"
import Layout from "../components/layout"
import {graphql} from 'gatsby'
const PageTemplate = ({ data }) => (
    <Layout>
        <h1>{data.allProductsJson.edges[0].node.name}</h1>
    </Layout>
)
export default PageTemplate
export const query = graphql`
    query($id: String!) {
        allProductsJson(filter: {id: {eq: $id}}) {
            edges {
                node {
                    id
                    name
                    description
                }
            }
        }
    }
`