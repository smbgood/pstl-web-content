import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import {FaCoffee, FaAndroid} from "react-icons/fa"
import hastToHyperscript from "hast-to-hyperscript"

class About extends Component {

    renderHtmlToReact = node => {
        return { __html : node }
    };

  render() {

    return (

        <StaticQuery
            query={graphql`
              query AboutPageQuery {
                siteInfo: allSiteadminJson(filter: {path: {eq: "banshee"}}) {
                  edges {
                    node {
                      blogpage {
                        aboutbar{
                            barBody
                        }
                      }
                    }
                  }
                }
              }
            `}
            render={({ siteInfo }) => (
                <div className="blended_grid">
                    <h3 className="about-title">About Banshee Babe</h3>
                    <FaCoffee/>
                    <p className="about-text" dangerouslySetInnerHTML={renderHtmlToReact(siteInfo.edges[0].node.blogpage.aboutbar.barBody)}/>
                </div>
            )}
        />
    )
  }
}

export default About