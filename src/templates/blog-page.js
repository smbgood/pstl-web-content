// src/templates/Page.js
import React from "react"
import Layout from "../components/page/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

class ProductPageTemplate extends React.Component {

  componentDidMount(){
    console.log(this);
  }

  render(){
    return(
      <Layout key={this.props.pageContext.id}>
        <div className="blog-page-root">
          <MDXRenderer>{this.props.pageContext.blog.body}</MDXRenderer>
        </div>
      </Layout>
    )
  }

}
export default ProductPageTemplate