import React from "react"

import Layout from "../components/page/layout"
import SEO from "../components/page/seo"

import Shop from "../components/shop";
import { graphql } from "gatsby"

const AdvancedExamplePage = ({data}) => (
    <Layout navImage={data.navImage.edges[0].node}>
        <SEO title="Shop Page" />
        <Shop />
    </Layout>
)
export const query=graphql`
    query OurAdvancedQuery{
        navImage: allImageSharp(filter: {fluid: {originalName: {eq: "banshee-logo-full.png"}}}) {
            edges {
                node {
                    id
                    fluid(maxWidth: 500, quality: 100) {
                        ...GatsbyImageSharpFluid
                        originalName
                    }
                }
            }
        }
    }
`
export default AdvancedExamplePage