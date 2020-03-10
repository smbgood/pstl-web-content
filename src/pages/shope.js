import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/page/layout"
import SEO from "../components/page/seo";
import Shop from "../components/page/shop";
import Blog from "../components/page/blog"
import About from "../components/page/about"
import Contact from "../components/page/contact"
import Cart from "../components/page/cart"
import { graphql } from "gatsby"

const Shope = ({data}) => (
    <Layout navImage={data.logoImage.edges[0].node}>
        <SEO title={"Banshee Babe Boutique | Trinkets, Odds & Ends"} />
        <Router>
            <Shop path="/shope/shop" />
            <Blog path="/shope" blogs={data}/>
            <About path="/shope/about"/>
            <Contact path="/shope/contact"/>
            <Cart path="/shope/cart"/>
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
                        ...GatsbyImageSharpFluid
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
export default Shope
