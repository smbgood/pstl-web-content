// src/templates/Page.js
import React from "react"
import Layout from "../components/layout"
import Carousel from "../components/widgets/carousel"
class ProductPageTemplate extends React.Component {

  componentDidMount(){
    console.log(this);
  }

  render(){
    return(
        <Layout key={this.props.pageContext.id}>
          <Carousel images={this.props.pageContext.images.data.allImageSharp.edges}/>
          <h1>{this.props.pageContext.name}</h1>
          <p>{this.props.pageContext.description}</p>
        </Layout>
    )
  }

}
export default ProductPageTemplate