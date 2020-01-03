import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/page/layout"
/*import PrivateRoute from "../components/old/privateRoute"
import Profile from "../components/old/profile"
import Login from "../components/old/login"*/
import Collage from "../components/old/collage"
import SEO from "../components/page/seo";
import Shop from "../components/shop";
import Categories from "../components/categories";
import Blog from "../components/blog"
import Home from "../components/page/home"
import {graphql} from 'gatsby'
import Img from "gatsby-image"

const Shope = ({data}) => (
    <Layout navImage={data.logoImage.edges[0].node}>
        <SEO title="Banshee Babe Boutique | Trinkets, Odds & Ends" />
        <Router>
{/*            <PrivateRoute path="/shope/profile" component={Profile} />
            <Login path="/shope/login" />*/}
            <Collage path="/shope/collage" />
            <Shop path="/shope/shop" />
            <Categories path="/shope/categories"/>
            <Blog path="/shope" blogs={data}/>
            <Home path="/shope/home"/>
        </Router>
    </Layout>
)
export const query = graphql`
    query MyQuery {
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