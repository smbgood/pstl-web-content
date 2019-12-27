// src/templates/Page.js
import React from "react"
import Layout from "../components/page/layout"
import Carousel from "../components/widget/carousel"
import "../styles/product.scss"
class ProductPageTemplate extends React.Component {

  componentDidMount(){
    console.log(this);
  }

  render(){
    return(
        <Layout key={this.props.pageContext.id}>
          <Carousel images={this.props.pageContext.images.data.allImageSharp.edges}/>
          <div className="product-info-root">
            <h1>{this.props.pageContext.name}</h1>
            <p>{this.props.pageContext.description}</p>
          </div>
        </Layout>
    )
  }

}
export default ProductPageTemplate