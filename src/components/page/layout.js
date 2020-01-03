import React, { Component } from "react"
import NavBar from "./nav"
import Footer from "./footer"


class Layout extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
        <NavBar navImage={this.props.navImage} />
        <div className="page-root">
          {this.props.children}
        </div>
        <Footer />
      </>
    )
  }
}
export default Layout
