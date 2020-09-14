import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout/layout"

export default ({data}) => (
  <Layout navImage={data.navImage.edges[0].node}>
    <div className="page-not-found-image">
      <Img fluid={data.monsterImage.edges[0].node.fluid}/>
    </div>
    <h1 className="center-splash">😢 We're Sorry -- Monsters Ate Your Page 😢</h1>
  </Layout>
)
export const query=graphql`
    query OurNavQuery{
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
        },
        monsterImage: allImageSharp(filter: {fluid: {originalName: {eq: "404.png"}}}) {
            edges {
                node {
                    id
                    fluid(maxWidth: 2800, quality: 100) {
                        ...GatsbyImageSharpFluid
                        originalName
                    }
                }
            }
        }
    }
`