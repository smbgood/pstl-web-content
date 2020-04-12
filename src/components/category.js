import React from "react"
import Img from "gatsby-image"

const Category = class extends React.Component {

    render() {
        const category = this.props.category
        const baths = this.props.baths
        const images = this.props.images

        function getProductById(id, products) {
            if (products && products.nodes) {
                for (const node of products.nodes) {
                    if (node.id === id) {
                        return node
                    }
                }
            }
            return null
        }

        function getName(result) {
            if (result && result.product.name) {
                return result.product.name
            }
            return ""
        }

        function getDescription(result) {
            if (result && result.product.description) {
                return result.product.description
            }
            return ""
        }

        function getImage(id, baths){
            if(baths && baths.nodes){
                for(const bath of baths.nodes){
                    if(bath && bath.stripeId) {
                        if (bath.stripeId === id) {
                            return bath.image
                        }
                    }
                }
            }
            return ""
        }
        function displayImageForStripeSku(imageName, images){
            /*if(imageName){
                while(imageName.indexOf("/") > -1){
                    imageName = imageName.substring(imageName.indexOf("/"), imageName.length)
                }
            }*/
            if(imageName && imageName.indexOf("/") > -1){
                imageName = imageName.substring(imageName.lastIndexOf("/") + 1, imageName.length )
            }
            if(images && images.nodes){
                for(const image of images.nodes){
                    if(image && image.originalName === imageName){
                        return (<Img fluid={image.fluid}/>)
                    }
                }
            }
            return ""
        }
        return (
          <div className="category-root" id={category.id + "-key"}>
              <h4 className="category-title" id={category.id + "-title"}>{category.name}</h4>
              <ul className="category-holder">
                  {category.products.map((productStripeSku) => (
                    <React.Fragment key={category.id + "-" + productStripeSku}>
                        <li>
                            {/*static query for the bath image goes here*/}
                            {displayImageForStripeSku(getImage(productStripeSku, baths), images)}
                            <div className="category-header">
                                <a href={"/" + productStripeSku}
                                   id={category.id + "-" + productStripeSku + "-link"}>{getName(getProductById(productStripeSku, this.props.products))}</a>
                            </div>
                            {/*<div className="category-body">
                                <div id={"dropdown" + category.id + "-" + product}>
                                    <p
                                      id={category.id + "-" + product + "-desc"}>{getDescription(getProductById(product, this.props.product))}</p>
                                </div>
                            </div>*/}
                        </li>
                    </React.Fragment>
                  ))}
              </ul>
          </div>
        )
    }
}

export default Category