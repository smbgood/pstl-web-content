import React from "react"
import { graphql, StaticQuery } from "gatsby"

class Footer extends React.Component{
    render(){
        return(
          <StaticQuery
            query={graphql`
              query CopyrightQuery {
                siteInfo: allSiteadminJson(filter: {path: {eq: "banshee"}}) {
                  edges {
                    node {
                      sitewide {
                        copyright
                      }
                    }
                  }
                }
              }
            `}
            render={({ siteInfo }) => (
              <div className="footer-root">
                  <span className="footer-copyright">{siteInfo.edges[0].node.sitewide.copyright}</span>
              </div>
            )}
          />

        )
    }
}
export default Footer