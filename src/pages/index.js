import React from "react"
import { graphql} from "gatsby"

import Layout from "../components/page/layout"

export default ({data}) => (
    <Layout navImage={data.navImage.edges[0].node}>
        <h1 className="center-splash">Welcome to Banshee Babe Boutique!</h1>
    </Layout>
)
export const query=graphql`
    query OurIndexQuery{
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