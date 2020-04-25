import React from "react"
import Img from "gatsby-image"
import CartContext from "./widget/cart-context";

const Category = class extends React.Component {

    render() {
        const category = this.props.category
        const baths = this.props.baths
        const images = this.props.images

        function getBathName(id, baths) {
            if(id && baths){
                let bath = getBathById(id, baths)
                if(bath && bath.name){
                    return bath.name
                }
            }
            return ""
        }

        function getBathDescription(id, baths) {
            if(id && baths){
                let bath = getBathById(id, baths)
                if(bath && bath.short_description){
                    return bath.short_description
                }
            }
            return ""
        }

        function getImage(id, baths){
            if(id && baths){
                let bath = getBathById(id, baths)
                if(bath && bath.image){
                    return bath.image
                }
            }
            return ""
        }

        function getBathById(id, baths) {
            if (baths && baths.nodes) {
                for (const bath of baths.nodes) {
                    if (bath && bath.stripeId) {
                        if (bath.stripeId === id) {
                            return bath
                        }
                    }
                }
            }
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
                    if(image && image.fluid.originalName === imageName){
                        return (<Img className={"category-product-img"} fluid={image.fluid}/>)
                    }
                }
            }
            return ""
        }
        return (
            <CartContext.Consumer>
                {cart => (
                    cart !== null && cart.cart != null ?
                        <div className="category-root" id={category.id + "-key"}>
                            <h4 className="category-title" id={category.id + "-title"}>{category.name}</h4>
                            <ul className="category-holder">
                                {category.products.map((productStripeSku) => (
                                    <React.Fragment key={category.id + "-" + productStripeSku}>
                                        <li>
                                            {/*static query for the bath image goes here*/}
                                            <div className="category-header">
                                                <a href={"/" + productStripeSku}>{displayImageForStripeSku(getImage(productStripeSku, baths), images)}</a>
                                                <a href={"/" + productStripeSku}
                                                   id={category.id + "-" + productStripeSku + "-link"}>{getBathName(productStripeSku, baths)}</a>
                                                <p>{getBathDescription(productStripeSku, baths)}</p>
                                                <button className={"add-to-cart"}>Add To Cart</button>
                                                <a className={"view-details"} href={"/" + productStripeSku}>View More Details</a>
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
                        : "")}
            </CartContext.Consumer>

        )
    }
}

export default Category