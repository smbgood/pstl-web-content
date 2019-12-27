import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import "../../styles/home.scss"

class Home extends Component {

  render() {
    return (
      <div className="blended_grid">
        <div className="middleBanner">
        </div>
        <div className="topBanner">
        </div>
        <div className="middleBanner">
        </div>
        <div className="cols-container">
          <div className="leftBanner">
          </div>
          <div className="centerBanner">
          </div>
          <div className="rightBanner">
          </div>
        </div>
        <div className="bottomBanner">
        </div>
      </div>
    )
  }
}

export default Home