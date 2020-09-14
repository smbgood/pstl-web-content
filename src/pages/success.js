import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"

const SuccessPage = ({data}) => (
  <Layout navImage={data.navImage.edges[0].node}>
    <SEO title="Contact Submit Success" />
    <div className={"ultimate-center"}>
        <h1>Thank you for your contact request!</h1>
        <p className={"back-to-you-text"}>We will get back to you as soon as (unearthly) possible!</p>
        <Link to="/shope">Go back to the homepage</Link>
    </div>
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
