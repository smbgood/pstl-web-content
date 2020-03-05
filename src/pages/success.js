import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/page/layout"
import SEO from "../components/page/seo"

const SuccessPage = ({data}) => (
  <Layout navImage={data.navImage.edges[0].node}>
    <SEO title="Contact Submit Success" />
    <h1>Thank you for your contact request!</h1>
    <p>We will get back to you as soon as (unearthly) possible!</p>
    <Link to="/shope">Go back to the homepage</Link>
  </Layout>
)
export const query=graphql`
    query OurSuccessQuery{
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
export default SuccessPage
