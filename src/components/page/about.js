import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import {FaCoffee} from "react-icons/fa"
import "../../styles/about.scss"

class About extends Component {

    renderHtmlToReact(node){
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
                <div className="about-root">
                    <h3 className="about-title">About Banshee Babe</h3>
                    <div className="about-icon"><FaCoffee/></div>
                    <p className="about-text" dangerouslySetInnerHTML={this.renderHtmlToReact(siteInfo.edges[0].node.blogpage.aboutbar.barBody)}/>
                </div>
            )}
        />
    )
  }
}

export default About