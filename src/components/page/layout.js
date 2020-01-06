/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { Component } from "react"
import NavBar from "./nav"
import Footer from "./footer"
import { graphql, StaticQuery } from "gatsby"

class Layout extends React.Component{
  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteInfo {
            siteInfo: site {
                siteMetadata {
                    title
                }
            }
          }
        `}
        render={({ siteInfo }) => (
          <>
            <NavBar navImage={this.props.navImage} />
            <div className="page-root" >
              {this.props.children}
            </div>
            <Footer />
          </>
        )}
      />
    )
  }
}
export default Layout
