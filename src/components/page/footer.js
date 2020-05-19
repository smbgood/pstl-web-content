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
                        disclaimer
                      }
                    }
                  }
                }
              }
            `}
            render={({ siteInfo }) => (
              <div className="footer-root">
                  <div className="footer-copyright">{siteInfo.edges[0].node.sitewide.copyright}</div>
                  <div className="footer-disclaimer">{siteInfo.edges[0].node.sitewide.disclaimer}</div>

              </div>
            )}
          />

        )
    }
}
export default Footer