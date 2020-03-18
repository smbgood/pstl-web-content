import React, { Component } from 'react'
import "../../styles/blog.scss"
import Img from "gatsby-image"
import findImageForSetBlogImage from "../../services/utils"
import {Link} from "gatsby"

class Blog extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

          <div className="blog-home">
            {this.props.blogs.blogResults.edges.map( edge => (
              <div className="blog-root" key={edge.node.id}>
                <div className="blog-container">
                  <div className="blog-image-container">
                    <Link to={"/" + edge.node.frontmatter.path}>
                      {findImageForSetBlogImage(this.props.blogs.blogImages, edge, true) != null ? (<Img fluid={findImageForSetBlogImage(this.props.blogs.blogImages, edge, true)} />) : console.log("no image found for set blog")}
                    </Link>
                  </div>
                  <div className="blog-detail-container">
                    <Link to={"/" + edge.node.frontmatter.path}><h2>{edge.node.frontmatter.title}</h2></Link>
                    <p>{edge.node.excerpt}</p>
                    <Link className={"blog-page-link"} to={"/" + edge.node.frontmatter.path}>Go to Blog</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
  }
}

export default Blog