/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { Component } from "react"
import { Link, navigate} from "gatsby"
import {FaCrow, FaAlignJustify, FaPencilAlt, FaSpa, FaStoreAlt, FaTelegram} from "react-icons/fa"
import Img from "gatsby-image"

class Nav extends Component {

    constructor(props) {
        super(props)
        let itemToSelect = props && props.item ? props.item : "blog"
        this.state = {isMobileMenuOpen : false, animationEnd: false, itemSelected: itemToSelect};
        this.handleClick = this.handleClick.bind(this);
        this.doTimeout();
    }

    /*componentDidMount() {
        //if we entered the cart page from a toast, need to update
        if(this.props && this.props.location){
            if(this.props.location.pathname && this.props.location.pathname === "/shope/cart"){
                this.setState({itemSelected: "cart"})
            }
        }
    }*/

    componentDidUpdate(prevProps, prevState, snapshot) {
        //set the correct nav link if they clicked on the header
        if(this.props && this.props.location){
            if(this.props.location.pathname){
                switch(this.props.location.pathname){
                    case "/shope/categories":
                        if(this.state.itemSelected !== "categories")
                            this.setState({itemSelected: "categories"})
                        break;
                    case "/shope/contact":
                        if(this.state.itemSelected !== "contact")
                            this.setState({itemSelected: "contact"})
                        break;
                    case "/shope/about":
                        if(this.state.itemSelected !== "about")
                            this.setState({itemSelected: "about"})
                        break;
                    case "/shope/cart":
                        if(this.state.itemSelected !== "cart")
                            this.setState({itemSelected: "cart"})
                        break;
                    case "/shope":
                        if(this.state.itemSelected !== "blog")
                            this.setState({itemSelected: "blog"})
                        break;
                }
            }
        }
    }

    doTimeout(){
      setTimeout(
        function(){
          this.setState({animationEnd: !this.state.animationEnd});
          this.doTimeout();
        }.bind(this),5000
      )
    }

    handleClick(link, openClose, state, setNavItem){
        openClose(state)
        setNavItem(link, state)
        navigate((link === "" ? "/shope" : ("/shope/" + link)))
    }

    setCurrentNavItem(link, stateIn){
        stateIn.setState( {itemSelected: (link === "" ? "blog" : link)})
    }

    openCloseMenu(stateIn) {
        stateIn.setState(state => ({
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
                <FaCrow sx={{color: "text"}} className="nav-separator"/>
                {` `}
                <Link sx={{
                    fontFamily: "heading",
                }} className="nav-link" to="/shope/cart">Cart</Link>
                {` `}
            </div>
            <div className={("nav-icon " + (this.state.animationEnd ? "wavy-start" : "wavy-finish"))}>
              <Link to="/shope" onClick={() => {this.handleClick("", this.fakeOpen, this, this.setCurrentNavItem)}}><Img fluid={this.props.navImage.fluid}/></Link>
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
              <a href="#" onClick={() => {this.openCloseMenu(this)}}>
                <FaAlignJustify/>
              </a>
            </div>
          </div>
                <div className={("nav-mobile-menu " + (this.state.isMobileMenuOpen ? "opened" : "closed"))} >
                    {` `}
                    <div className={("nav-mobile-menu-item " + (this.state.itemSelected === "contact" ? "active" : ""))}>
                        <FaTelegram/><a sx={{
                            fontFamily: "heading",
                        }} className="nav-link" onClick={(e) => {this.handleClick("contact", this.openCloseMenu, this, this.setCurrentNavItem)}}>Contact Us</a>
                    </div>
                    {` `}
                    <div className={("nav-mobile-menu-item " + (this.state.itemSelected === "categories" ? "active" : ""))}>
                        <FaStoreAlt/><a sx={{
                            fontFamily: "heading",
                        }} className="nav-link" onClick={(e) => {this.handleClick("categories", this.openCloseMenu, this, this.setCurrentNavItem)}}>Boutique</a>
                    </div>
                    {` `}
                    <div className={("nav-mobile-menu-item " + (this.state.itemSelected === "cart" ? "active" : ""))}>
                        <FaStoreAlt/><a sx={{
                        fontFamily: "heading",
                    }} className="nav-link" onClick={(e) => {this.handleClick("cart", this.openCloseMenu, this, this.setCurrentNavItem)}}>Cart</a>
                    </div>
                    {` `}
                    <div className={("nav-mobile-menu-item " + (this.state.itemSelected === "about" ? "active" : ""))}>
                        <FaSpa/><a sx={{
                            fontFamily: "heading",
                        }} className="nav-link" onClick={(e) => {this.handleClick("about", this.openCloseMenu, this, this.setCurrentNavItem)}}>About</a>
                    </div>
                    {` `}
                    <div className={("nav-mobile-menu-item " + (this.state.itemSelected === "blog" ? "active" : ""))}>
                        <FaPencilAlt/>
                        <a sx={{
                            fontFamily: "heading",
                        }} className="nav-link" onClick={(e) => {this.handleClick("", this.openCloseMenu, this, this.setCurrentNavItem)}}>Blog</a>
                    </div>
                    {` `}
                </div>
            </div>
        )
    }

    fakeOpen() {
        //do nothing
    }
}
export default Nav