/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { Component } from "react"
import { Link, navigate } from "gatsby"
import {FaCrow, FaAlignJustify} from "react-icons/fa"
import Img from "gatsby-image"

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
          <div className="nav-root">
            <div className="nav-container nav-left">
              {` `}
              <Link sx={{
                fontFamily: "heading",
              }} className="nav-link" to="/shope/about">About</Link>
              {` `}
              <FaCrow sx={{color: "text"}} className="nav-separator"/>
              {` `}        
              <Link sx={{
                fontFamily: "heading",
              }} className="nav-link" to="/shope">Blog</Link>
              {` `}
              
            </div>
            <div className="nav-icon">
              <Link to="/shope"><Img fluid={this.props.navImage.fluid}/></Link>
            </div>
            <div className="nav-container nav-right">          
              {` `}
              <Link sx={{
                fontFamily: "heading",
              }} className="nav-link" to="/shope/contact">Contact Us</Link>
              {` `}              
              <FaCrow sx={{color: "text"}} className="nav-separator"/>
              {` `}              
              <Link sx={{
                fontFamily: "heading",
              }} className="nav-link" to="/shope/categories">Boutique</Link>
              {` `}
            </div>
            <div className="nav-mobile-btn">
              <a href="#">
                <FaAlignJustify/>
              </a>
            </div>
          </div>
        )
    }
}
export default Nav