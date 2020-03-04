import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import {FaCoffee, FaAndroid} from "react-icons/fa"

class About extends Component {

  render() {
    return (
      <div className="blended_grid">
        <h3 className="about-title">About Banshee Babe</h3>
        <FaCoffee/>
        <FaAndroid/>
        <p className="about-text">Founded in 2019, we are home to many traditional recipes updated for the modern age. Let us demystify the world of plants and herbs for you, so you can better work with what Mother Nature has provided all around us!  </p>
      </div>
    )
  }
}

export default About