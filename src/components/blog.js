import React, { Component } from 'react'
import "../styles/blog.scss"
import Img from "gatsby-image"
import findImageForSetBlogImage from "../services/utils"
import {Link} from "gatsby"

class Blog extends Component {
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {

    let body = this.document.body,
      html = this.document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );

    let valToBreak = window.pageYOffset + window.innerHeight;

    let valToExceed = height - 53.3;

    if (window.pageYOffset > 196.86 && valToBreak < valToExceed) {
      let item = event.target.querySelector(".blog-hover-bar")
      if(item) {
        item.className = "blog-hover-bar-sticky"
      }else{
        let item = event.target.querySelector(".blog-hover-bar-sticky-btm")
        if(item) {
          item.className = "blog-hover-bar-sticky"
        }
      }
    }else if (valToBreak > valToExceed) {
      let item = event.target.querySelector(".blog-hover-bar")
      if(item) {
        item.className = "blog-hover-bar-sticky-btm"
      }else{
        let item = event.target.querySelector(".blog-hover-bar-sticky")
        if(item) {
          item.className = "blog-hover-bar-sticky-btm"
        }
      }
    }else{
      let item = event.target.querySelector(".blog-hover-bar-sticky")
      if(item) {
        item.className = "blog-hover-bar"
      }else{
        let item = event.target.querySelector(".blog-hover-bar-sticky-btm")
        if(item) {
          item.className = "blog-hover-bar"
        }
      }
    }
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