import React, {useState, useEffect} from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo";
import { navigate, graphql } from "gatsby"

import {GatsbyImage} from "gatsby-plugin-image";

import Masonry from "react-masonry-component"

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const masonryOptions = {
  transitionDuration: 0,
  columnWidth: 200
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

var handleClick = function(){
  console.log(this);
}

const Gallery = ({data, location}) =>
{

  function xy() {
    console.log(this)
  }

  return (
    <Layout>
      <SEO title={"Dave's Truck Barrels"} history={location}/>
      <div className={"about-root"}>
        <Masonry
          className={'my-gallery-class'} // default ''
          elementType={'ul'} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          imagesLoadedOptions={imagesLoadedOptions} // default {}
          onClick={() => xy()}
        >
          {data.carouselImages.edges.map(({ node }, i) => (
            <li className="image-element-class">
              <GatsbyImage image={node.childImageSharp.gatsbyImageData} alt={"Carousel " + i} key={i}/>
            </li>
          ))}

        </Masonry>

      </div>
    </Layout>
  )
}
export const query = graphql`
    query GalleryQuery {
        carouselImages: allFile(filter: {relativePath: {glob: "caro-*"}}) {
          edges {
            node {
              childImageSharp{
                gatsbyImageData(
                  layout:FIXED
                  height:600
                  placeholder:DOMINANT_COLOR
                  formats: [AUTO,WEBP,AVIF]
                )
              }
            }
          }
        }             
    }
`
export default Gallery
