/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Nav from "./nav"
import Footer from "./footer"
import { graphql, StaticQuery } from "gatsby"

class Layout extends React.Component{
    constructor(props) {
        super(props);
    }
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
                render={ siteInfo  => (
                    <>
                        <Nav navImage={this.props.navImage} item={this.props.item ? this.props.item : ""} location={this.props.location}/>
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
