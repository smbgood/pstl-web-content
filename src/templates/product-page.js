// src/templates/Page.js
import React from "react"
import Layout from "../components/page/layout"
import Carousel from "../components/widget/carousel"
import "../styles/product.scss"
import ShopItem from "../components/shop-item"
class ProductPageTemplate extends React.Component {

  state = {
    stripe: null,
  }
  componentDidMount() {
    const stripe = window.Stripe("pk_live_VJQj7RY3rBubLWBVzmHF2PXM00WQixkUZ0")
    this.setState({ stripe })
    console.log(this);
  }

  render(){
    return(
        <Layout key={this.props.pageContext.id}>
          <Carousel key={this.props.pageContext.id+"-carousel"} images={this.props.pageContext.images.data.allImageSharp.edges}/>
          <div className="product-info-root">
            <h1>{this.props.pageContext.name}</h1>
            <p>{this.props.pageContext.description}</p>
          </div>
          <ShopItem key={this.props.pageContext.id+"-item"} sku={this.props.pageContext.stripeData} stripe={this.state.stripe}/>
        </Layout>
    )
  }

}
export default ProductPageTemplate