/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { Component } from "react"
import { Link, navigate } from "gatsby"
import Img from "gatsby-image"

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this)
        return (
          <div className="nav-root">
              <div className="nav-icon">
                <Img fluid={this.props.navImage.fluid}/>
              </div>
              <div className="nav-container">
                  <div className="nav-inner">
                  {` `}
                  <Link sx={{
                    fontFamily: "heading",
                  }} className="nav-link" to="/shope">Blog</Link>
                  {` `}
                  <Link sx={{
                    fontFamily: "heading",
                  }}  className="nav-link" to="/shope/categories">Boutique</Link>
                  {` `}
                  </div>
              </div>
          </div>
        )
    }
}
export default Nav