import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo";
import Blog from "../components/page/blog"
import About from "../components/page/about"
import Contact from "../components/page/contact"
import Cart from "../components/page/cart"
import Checkout from "../components/page/checkout"
import { graphql } from "gatsby"
import Categories from "../components/page/categories";

const Shope = ({data, location}) => (
    <Layout navImage={data.logoImage.edges[0].node} location={location}>
        <SEO title={"Dav"} history={location}/>
        <Router>
            <Blog path="/shope" blogs={data}/>
            <About path="/shope/about"/>
            <Contact path="/shope/contact"/>
            <Cart path="/shope/cart"/>
            <Checkout path="/shope/checkout"/>
            <Categories path="/shope/categories"/>
        </Router>
    </Layout>
)
export const query = graphql`
    query ShopeQuery {
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
        },
        welcomeInfo: allSiteadminJson {
            nodes {
              welcomepage {
                welcomeimagesection {
                  welcomeImage
                  welcomeTitle
                  }
                }
              }
            }       
    }
`
export default Shope
