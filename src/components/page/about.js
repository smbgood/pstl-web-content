import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import {FaCoffee, FaAndroid} from "react-icons/fa"
import hastToHyperscript from "hast-to-hyperscript"

class About extends Component {

    renderHtmlToReact = node => {
        return hastToHyperscript(React.createElement, node);
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
                    <FaAndroid/>
                    <p className="about-text">{this.renderHtmlToReact(siteInfo.edges[0].node.blogpage.aboutbar.barBody)}</p>
                </div>
            )}
        />
    )
  }
}

export default About