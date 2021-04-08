// src/templates/Page.js
import React from "react"
import Layout from "../components/layout/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import findImageForSetBlogImage from "../services/utils"
import { graphql, Link } from "gatsby"
import "../styles/blog-page.scss"
import {FaInfoCircle} from "react-icons/fa"
import SEO from "../components/layout/seo";

class BlogPageTemplate extends React.Component {

  generateCorrectAttribution(node) {

    let fullAttribution = ""

    if (node.frontmatter.attribution != null){
      if (node.frontmatter.attribution.attrTitle != null) {
        fullAttribution += node.frontmatter.attribution.attrTitle
      } else {
        fullAttribution += "Image"
      }
      if(node.frontmatter.attribution.attrAuthor != null) {
        fullAttribution += " by "
        fullAttribution += node.frontmatter.attribution.attrAuthor
      }

      if(node.frontmatter.attribution.attrLink != null){
        fullAttribution = ("<a href='" + node.frontmatter.attribution.attrLink + "'>" + fullAttribution + "</a>")
      }
    }
    return fullAttribution
  }

  render(){
    let styles = null;
    if(this.props.pageContext.blog.node.frontmatter.glowcolor){
      styles = {
        color: this.props.pageContext.blog.node.frontmatter.glowcolor
      }

    }else{
      styles = {
        color: "rgb(3,76,119)"
      }
    }
    return(
      <Layout key={this.props.pageContext.id} navImage={this.props.data.navImage.edges[0].node}>
        <SEO title={"" + this.props.pageContext.blog.node.frontmatter.title} />
        <div className="blog-page-root">
          <div className="blog-page-image-container" style={styles}>
            {findImageForSetBlogImage(this.props.data.images, this.props.pageContext.blog, false) != null ? (<Img fluid={findImageForSetBlogImage(this.props.data.images, this.props.pageContext.blog, false)} />) : console.log("no image found for set blog")}
            <div className="blog-attrib-open"><FaInfoCircle className="blog-attrib-icon" /><span className="blog-image-attribution" dangerouslySetInnerHTML={{__html: this.generateCorrectAttribution(this.props.pageContext.blog.node)}}>
            </span></div>
          </div>
          <div className="blog-page-header">
            <h1>{this.props.pageContext.blog.node.frontmatter.title}</h1>
          </div>
          <div className="blog-page-body">
            <MDXRenderer>{this.props.pageContext.blog.node.body}</MDXRenderer>
          </div>
          <div className="blog-page-footer">
            <Link to={"/shope"}>Go back</Link>
          </div>
        </div>
      </Layout>
    )
  }

    doLinkOutput(product) {
        return product != null ?
            <div className="blog-page-link">
                <Link to={"/" + product}>View product</Link>
            </div> : ""
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
      navImage: allImageSharp(filter: {fluid: {originalName: {eq: "pstl-logo.png"}}}) {
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