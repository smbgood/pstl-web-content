/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { Component } from "react"
import { Link } from "gatsby"
import {FaCrow, FaAlignJustify, FaPencilAlt, FaSpa, FaStoreAlt, FaTelegram} from "react-icons/fa"
import Img from "gatsby-image"

class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {isMobileMenuOpen : false, animationEnd: false};
        this.handleClick = this.handleClick.bind(this);
        this.doTimeout();
    }

    doTimeout(){
      setTimeout(
        function(){
          this.setState({animationEnd: !this.state.animationEnd});
          this.doTimeout();
        }.bind(this),5000
      )
    }

    handleClick(){
      this.setState(state => ({
        isMobileMenuOpen: !state.isMobileMenuOpen
      }))
    }

    render() {
        return (
            <div className="nav-outer">
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
            <div className={("nav-icon " + (this.state.animationEnd ? "wavy-start" : "wavy-finish"))}>
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
              <a href="#" onClick={this.handleClick}>
                <FaAlignJustify/>
              </a>
            </div>
          </div>
                <div className={("nav-mobile-menu " + (this.state.isMobileMenuOpen ? "opened" : "closed"))} >
                    {` `}
                    <div className={("nav-mobile-menu-item" + (this.state.itemSelected === "contact" ? "active" : ""))}>
                        <FaTelegram/><Link sx={{
                            fontFamily: "heading",
                        }} className="nav-link" to="/shope/contact">Contact Us</Link>
                    </div>
                    {` `}
                    <div className={("nav-mobile-menu-item" + (this.state.itemSelected === "store" ? "active" : ""))}>
                        <FaStoreAlt/><Link sx={{
                            fontFamily: "heading",
                        }} className="nav-link" to="/shope/categories">Boutique</Link>
                    </div>
                    {` `}
                    <div className={("nav-mobile-menu-item" + (this.state.itemSelected === "about" ? "active" : ""))}>
                        <FaSpa/><Link sx={{
                            fontFamily: "heading",
                        }} className="nav-link" to="/shope/about">About</Link>
                    </div>
                    {` `}
                    <div className={("nav-mobile-menu-item" + (this.state.itemSelected === "blog" ? "active" : ""))}>
                        <FaPencilAlt/>
                        <Link sx={{
                            fontFamily: "heading",
                        }} className="nav-link" to="/shope">Blog</Link>
                    </div>
                    {` `}
                </div>
            </div>
        )
    }
}
export default Nav