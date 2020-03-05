import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/page/layout"
import SEO from "../components/page/seo"
import Contact from "../components/page/contact";

const ContactPage = ({data}) => (
  <Layout navImage={data.navImage.edges[0].node}>
    <Contact/>
  </Layout>
)
export const query=graphql`
    query OurContactPageQuery{
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
export default ContactPage
