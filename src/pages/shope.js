import {React, Component} from "react"
import { Router } from "@reach/router"
import Layout from "../components/page/layout"
import Collage from "../components/old/collage"
import SEO from "../components/page/seo";
import Shop from "../components/shop";
import Categories from "../components/categories";
import Blog from "../components/blog"
import Home from "../components/page/home"
import About from "../components/page/about"
import Contact from "../components/page/contact"
import { graphql, useStaticQuery } from "gatsby"

import {createBrowserHistory} from "history";

class Shope extends Component{

    componentDidMount(){
        /*let history = createBrowserHistory()

        history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            console.log(`The last navigation action was ${action}`)
        })*/
    }

    render({data}){
        return( <Layout navImage={data.logoImage.edges[0].node}>
            <SEO title={"Banshee Babe Boutique | Trinkets, Odds & Ends"} />
            <Router>
                <Collage path="/shope/collage" />
                <Shop path="/shope/shop" />
                <Categories path="/shope/categories"/>
                <Blog path="/shope" blogs={data}/>
                <Home path="/shope/home"/>
                <About path="/shope/about"/>
                <Contact path="/shope/contact"/>
            </Router>
        </Layout>)
    }

}
export default Shope
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
