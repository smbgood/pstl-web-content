// src/templates/Page.js
import React from "react"
import Layout from "../components/page/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import findImageForSetBlogImage from "../services/utils"
import { graphql } from "gatsby"
import "../styles/blog-page.scss"
import {FaInfoCircle} from "react-icons/fa"

class BlogPageTemplate extends React.Component {

  componentDidMount(){
    //console.log(this);
  }

  render(){
    let styles = null;
    if(this.props.pageContext.blog.node.frontmatter.glowcolor){
      styles = {
        color: this.props.pageContext.blog.node.frontmatter.glowcolor
      }

    }else{
      styles = {
        color: "rgba(112, 205, 255, 1)"
      }
    }
    console.log(this)
    return(
      <Layout key={this.props.pageContext.id} navImage={this.props.data.navImage.edges[0].node}>
        <div className="blog-page-root">
          <div className="blog-page-image-container" style={styles}>
            {findImageForSetBlogImage(this.props.data.images, this.props.pageContext.blog, false) != null ? (<Img fluid={findImageForSetBlogImage(this.props.data.images, this.props.pageContext.blog, false)} />) : console.log("no image found for set blog")}
            <div className="blog-attrib-open"><FaInfoCircle /></div>
          </div>
          <div className="blog-page-header">
            <h1>{this.props.pageContext.blog.node.frontmatter.title}</h1>
          </div>
          <div className="blog-page-body">
            <MDXRenderer>{this.props.pageContext.blog.node.body}</MDXRenderer>
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
      },
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
export default BlogPageTemplate