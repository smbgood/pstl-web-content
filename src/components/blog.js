import React, { Component } from 'react'
import "../styles/blog.scss"
import Img from "gatsby-image"
import findImageForSetBlogImage from "../services/utils"

class Blog extends Component {
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys

  constructor(props) {
    super(props);
    //this.handleScroll = this.handleScroll.bind(this)
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
  }

  render() {

/*    const [listenerAdded, setListenerAdded] = useState(false);*/

    return (

          <div className="blog-home">
            {this.props.blogs.blogResults.edges.map( edge => (
              <div className="blog-root" key={edge.node.id}>
                <div className="blog-container">
                  <div className="blog-image-container">
                  {findImageForSetBlogImage(this.props.blogs.blogImages, edge, true) != null ? (<Img fluid={findImageForSetBlogImage(this.props.blogs.blogImages, edge, true)} />) : console.log("no image found for set blog")}
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
              <div className="about-us-root">
                <h2 className="about-title">About Banshee Babe</h2>
                <p className="about-text">Founded in 2019, we are home to many traditional recipes updated for the modern age. Let us demystify the world of plants and herbs for you, so you can better work with what Mother Nature has provided all around us!  </p>
              </div>
            </div>
          </div>
        )
  }
}

export default Blog