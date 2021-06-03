import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import SEO from "../components/layout/seo"

export default ({data, location}) => (
  <Layout>
    <SEO title={"Dave's Truck Barrels"} history={location}/>
    <div className="page-not-found-image">
      <GatsbyImage image={data.monsterImage.childImageSharp.gatsbyImageData}  alt={"Page not found"}/>
    </div>
    <h1 className="center-splash">😢 We're Sorry -- Monsters Ate Your Page 😢</h1>
  </Layout>
)
export const query=graphql`
    query OurNavQuery{       
        monsterImage: file(relativePath: { eq :"404.png"}) {
            childImageSharp {
              gatsbyImageData(
                 layout:FULL_WIDTH
                 width:2800
                 placeholder:TRACED_SVG
                 formats: [AUTO,WEBP,AVIF]
              )
            }
        }
    }
`