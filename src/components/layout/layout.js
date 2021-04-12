import React from "react"
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
                    <div className="container-root-outer">
                        <div className="page-root" >
                        {this.props.children}
                        </div>
                        <Footer />
                    </div>
                )}
            />
        )
    }
}

export default Layout
