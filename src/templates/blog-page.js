// src/templates/Page.js
import React from "react"
import Layout from "../components/page/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import findImageForSetBlogImage from "../services/utils"
import { graphql } from "gatsby"

class BlogPageTemplate extends React.Component {

  componentDidMount(){
    console.log(this);
  }

  render(){
    return(
      <Layout key={this.props.pageContext.id}>
        <div className="blog-page-root">
          <div className="blog-page-image-container">
            {findImageForSetBlogImage(this.props.data.images, this.props.pageContext.blog, false) != null ? (<Img fluid={findImageForSetBlogImage(this.props.data.images, this.props.pageContext.blog, false)} />) : console.log("no image found for set blog")}
          </div>
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
export const query=graphql`
  query OurQuery{
      images: allImageSharp {
          edges {
              node {
                  fluid(maxWidth: 2000, quality: 100) {
                      ...GatsbyImageSharpFluid
                      originalName
                  }
              }
          }
      }
  }
`
export default BlogPageTemplate