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
        return (
          <div className="nav-root">
              <div className="nav-icon">
                <Link to="/shope"><Img fluid={this.props.navImage.fluid}/></Link>
              </div>
              <div className="nav-container">
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
        )
    }
}
export default Nav