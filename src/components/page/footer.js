import React from "react"
import { graphql, StaticQuery } from "gatsby"

class Footer extends React.Component{
    render(){
        return(
          <StaticQuery
            query={graphql`
          query SiteInfo2 {
            siteInfo: site {
                siteMetadata {
                    title
                }
            }
          }
        `}
            render={({ siteInfo }) => (
              <div className="footer-root">
                  <span className="footer-copyright">Banshee Babe Boutique © 2020</span>
              </div>
            )}
          />

        )
    }
}
export default Footer