import React, { Component, useState } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import "../styles/blog.scss"
import Img from "gatsby-image"

class Blog extends Component {
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys

  constructor(props) {
    super(props);
    //this.handleScroll = this.handleScroll.bind(this)
  }

  createFilterArrayForBlogImages(props) {
    let retString = "";
    let propArray = []
    if(props && props.blogs && props.blogs.blogResults && props.blogs.blogResults.edges){
      for(const result of props.blogs.blogResults.edges){
        if(result && result.node && result.node.frontmatter && result.node.frontmatter.image) {
          propArray.push(result.node.frontmatter.image)
        }
      }
    }
    let uniqueArray = Array.from(new Set(propArray))
    if(uniqueArray.length > 0) {
      let counter = 0
      let imageNamesToQuery = `["`
      for(const inValue of uniqueArray){

        //pull off the image name
        const value = inValue.substring(inValue.lastIndexOf("/")+1, inValue.length)
        counter++
        if(counter < uniqueArray.length) {
          imageNamesToQuery += value + `", "`
        }else{
          imageNamesToQuery += value
        }
      }
      imageNamesToQuery += `"]`
      retString = imageNamesToQuery
    }
    return retString
  }

  findImageForSetBlogImage(props, blogItem){
    let fluidReturn = null
    if(blogItem && blogItem.node && blogItem.node.frontmatter && blogItem.node.frontmatter.image && props && props.blogs && props.blogs.blogImages && props.blogs.blogImages.edges){
      const blogName = blogItem.node.frontmatter.image.substring(blogItem.node.frontmatter.image.lastIndexOf("/")+1,blogItem.node.frontmatter.image.length)
      for(const item of props.blogs.blogImages.edges){
        if(item && item.node && item.node.fluid) {
          const fluid = item.node.fluid
          if(fluid.originalName){
            if(fluid.originalName === blogName){
              fluidReturn = fluid
              break
            }
          }
        }
      }
    }
    return fluidReturn
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    //let scrollTop = event.srcElement.body.scrollTop;
    //console.log(scrollTop)
    //console.log(event.target.body.scrollTop)

    let body = this.document.body,
      html = this.document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );

    let valToBreak = window.pageYOffset + window.innerHeight;

    let valToExceed = height - 53.3;

    console.log(valToBreak + "  " + valToExceed)

    if (window.pageYOffset > 64 && valToBreak < valToExceed) {
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

    /*let scrollTop = event.srcElement.body.scrollTop,
      itemTranslate = Math.min(0, scrollTop/3 - 60);

    this.setState({

    this.setState({
      transform: itemTranslate
    });*/
    //console.log(event)
  }

  render() {

/*    const [listenerAdded, setListenerAdded] = useState(false);*/

    return (

          <div className="blog-home">
            {this.props.blogs.blogResults.edges.map( edge => (
              <div className="blog-root" key={edge.node.id}>
                <div className="blog-container">
                  <div className="blog-image-container">
                  {this.findImageForSetBlogImage(this.props, edge) != null ? (<Img fluid={this.findImageForSetBlogImage(this.props, edge)} />) : console.log("no")}
                  </div>
                  <div className="blog-detail-container">
                    <h1>{edge.node.frontmatter.title}</h1>
                    <p>{edge.node.excerpt}</p>
                    <a className="blog-page-link btn btn-small waves-purple" href={"/" + edge.node.frontmatter.path}>Go to Blog</a>
                  </div>
                </div>
              </div>
            ))}
            {/*this.props.scroll != null && this.props.scroll > 64 ? "sticky" : ""*/}
            <div className="blog-hover-bar">
              whooo
            </div>
          </div>
        )
  }
}

export default Blog