// src/templates/Page.js
import React from "react"
import Layout from "../components/page/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

class BlogPageTemplate extends React.Component {

  componentDidMount(){
    console.log(this);
  }

  render(){
    return(
      <Layout key={this.props.pageContext.id}>
        <div className="blog-page-root">
          <div className="blog-page-header">
            <h1>{this.props.pageContext.blog.frontmatter.title}</h1>
          </div>
          <div className="blog-page-body">
            <MDXRenderer>{this.props.pageContext.blog.body}</MDXRenderer>
          </div>
          <div className="blog-page-footer">
            <span>See more</span>
          </div>
        </div>
      </Layout>
    )
  }

}
export default BlogPageTemplate