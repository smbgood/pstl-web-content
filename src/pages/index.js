import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/page/layout"
import SEO from "../components/page/seo";
import { graphql } from "gatsby"
import Welcome from "../components/page/welcome"

const Index = ({data, location}) => (
    <Layout navImage={data.logoImage.edges[0].node} location={location}>
        <SEO title={"Banshee Babe Boutique | Trinkets, Odds & Ends"} history={location}/>
        <Router>
            <Welcome path="/"/>
        </Router>
    </Layout>
)
export const query = graphql`
    query IndexeQuery {
        blogResults: allMdx(sort: {fields: frontmatter___date}) {
            edges {
                node {
                    id
                    frontmatter {
                        path
                        title
                        date
                        coverimage
                        fullimage
                    }
                    excerpt
                }
            }
        },
        blogImages: allImageSharp {
            edges {
                node {
                    fluid(maxWidth: 500, quality: 100) {
                        ...GatsbyImageSharpFluid_noBase64
                        originalName
                    }
                }
            }
        },
        logoImage: allImageSharp(filter: {fluid: {originalName: {eq: "banshee-logo-full.png"}}}) {
            edges {
                node {
                    fluid(maxWidth: 500, quality: 100) {
                        ...GatsbyImageSharpFluid
                        originalName
                    }
                }
            }
        }
    }
`
export default Index
