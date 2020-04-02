/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import NavBar from "./nav"
import Footer from "./footer"
import CartPreview from "../widget/cart-preview"
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
                        <CartPreview/>
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
