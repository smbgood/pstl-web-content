import React from "react"
import { getUser } from "../../services/login"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Collage = () => {

  /*const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "alternative-background-color-cooking-105028.jpg" }) {
        childImageSharp {
          # Specify a fixed image and fragment.
          # The default width is 400 pixels
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)*/

  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            fluid{
            ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)

  const doColumn = function(images, columnIndex) {

    return (
      <div className="collage-root" key={"parent-" + columnIndex}>
        {images.map((value, index) =>
          {
            return doChild(value, index, columnIndex)
          }
        )
        }
      </div>
    )
  }

  const doChild = function(value, index, columnIndex) {
    return (
      <div className="collage-child" key={columnIndex + "-" + index}>
        <Img
          fluid={value.node.fluid}
          alt="Gatsby Docs are awesome"
          key={value.node.fluid.originalName}
        />
      </div>
    )
  }

  const columnArray = [0, 1, 2];
  let columnContents = [];
  for(let i=0; i<columnArray.length; i++){
    columnContents[i] = [];
  }

  const images = data.allImageSharp.edges;
  let columnCount = 0;
  for(var j=0; j<images.length;j++){
      columnContents[columnCount].push(images[j]);
      columnCount++;
      if(columnCount > 2){
        columnCount = 0;
      }
  }

  return (
    <div className="collage-container">
      {columnContents.map((value, index) =>
          {
            return doColumn(value, index)
          }
        )
      }
    </div>
  )
}

export default Collage