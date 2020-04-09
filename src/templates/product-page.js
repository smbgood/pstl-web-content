// src/templates/Page.js
import React from "react"
import Layout from "../components/page/layout"
import Carousel from "../components/widget/carousel"
import "../styles/product.scss"
import ShopItem from "../components/shop-item"
import { graphql } from "gatsby"
import SEO from "../components/page/seo";

class ProductPageTemplate extends React.Component {

  render(){
    return(
        <Layout key={this.props.pageContext.id} navImage={this.props.data.navImage.edges[0].node} item={"categories"}>
          <SEO title={this.props.pageContext.name + " | Banshee Babe Boutique | Trinkets, Odds & Ends"} />
          <Carousel key={this.props.pageContext.id+"-carousel"} images={this.props.pageContext.images.data.allImageSharp.edges}/>
          <div className="product-info-root">
            <h1>{this.props.pageContext.name}</h1>
            <p>{this.props.pageContext.description}</p>
          </div>
          <ShopItem key={this.props.pageContext.id+"-item"} sku={this.props.pageContext.stripeData} />
        </Layout>
    )
  }

}
export const query=graphql`
    query OurNavImageProductPageQuery{
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
export default ProductPageTemplate