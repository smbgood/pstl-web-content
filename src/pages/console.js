import React from "react"
import { Router } from "@reach/router"
import SEO from "../components/page/seo";
import { graphql } from "gatsby"
import Welcome from "../components/page/welcome"
import Console from "../components/page/console";

function transformData(obj, image){
    return { title: obj.welcomeimagesection.welcomeTitle, image: image}
}

const ConsolePage = ({data, location}) => (
    <Console navImage={data.logoImage.edges[0].node} location={location}>
        <SEO title={"Banshee Babe Boutique | Trinkets, Odds & Ends"} history={location}/>
        <Router>
            <Welcome path="/" welcomeInfo={transformData(data.welcomeInfo.nodes[0].welcomepage, data.plompous.edges[0].node)}/>
        </Router>
    </Console>
)
export const query = graphql`
    query ConsoleQuery {
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
            
        },
        plompous: allImageSharp(filter: {fluid: {originalName: {eq: "photo-of-constellation-2832084.jpg"}}}) {
            edges {
              node {
                fluid(maxWidth: 2500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
        }          
    }
`
export default ConsolePage
