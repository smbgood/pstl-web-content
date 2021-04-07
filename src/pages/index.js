import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo";
import { graphql } from "gatsby"
import Welcome from "../components/page/welcome"

function transformData(obj, image){
    return { title: obj.welcomeimagesection.welcomeTitle, image: image}
}

const Index = ({data, location}) => (
    <Layout navImage={data.logoImage.edges[0].node} location={location}>
        <SEO title={"Dave's Truck Barrels"} history={location}/>
        <Router>
            <Welcome path="/" welcomeInfo={transformData(data.welcomeInfo.nodes[0].welcomepage, data.plompous.edges[0].node)}/>
        </Router>
    </Layout>
)
export const query = graphql`
    query IndexeQuery {
        logoImage: allImageSharp(filter: {fluid: {originalName: {eq: "pstl-logo.png"}}}) {
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
export default Index
