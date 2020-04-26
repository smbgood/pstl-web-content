import React, {Component} from "react"
import Img from "gatsby-image"
import CartContext from "./widget/cart-context";
import {IconContext} from "react-icons";
import {FaRegWindowClose} from "react-icons/fa";
import Modal from "react-modal";
import Flickity from "react-flickity-component";

class Category extends Component {

    state = {
        modalsOpen : []
    }

    componentDidMount() {
        this.setState({modalsOpen: []})
    }

    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
    }

    openModal(productStripeSku){
        if(this.state && this.state.modalsOpen){
            if(this.state.modalsOpen.indexOf(productStripeSku) === -1) {
                let newArray = this.state.modalsOpen
                newArray.push(productStripeSku)
                this.setState({modalsOpen: newArray})
            }
        }
    }

    getModalOpen(productStripeSku){
        if(this.state && this.state.modalsOpen && this.state.modalsOpen.length > 0){
            if(this.state.modalsOpen.indexOf(productStripeSku) > -1){
                return true
            }
        }
        return false
    }

    closeModal(productStripeSku){
        if(this.state.modalsOpen) {
            if (this.state.modalsOpen.indexOf(productStripeSku) > -1) {
                let newVals = this.state.modalsOpen;
                newVals.splice(newVals.indexOf(productStripeSku))
                this.setState({modalsOpen: newVals})
            }
        }

    }

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

        function displayImageForImageName(imageName, images){
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

        function getBathDetailImages(id, baths){
            if(baths && id){
                let bath = getBathById(id, baths)
                if(bath && bath.detail_images){
                    return bath.detail_images
                }
            }
        }

        function displayProductInfoModal(productStripeSku, baths, images, state, that){
            let bathDetailImages = getBathDetailImages(productStripeSku, baths)
            if(that.getModalOpen(productStripeSku, state)){
                return (<Modal
                    isOpen={that.getModalOpen(productStripeSku, state)}
                    onRequestClose={() => {that.closeModal(productStripeSku, state)}}
                    style={{
                        content : {
                            top                   : '50%',
                            left                  : '50%',
                            right                 : 'auto',
                            bottom                : 'auto',
                            marginRight           : '-50%',
                            transform             : 'translate(-50%, -50%)',
                            width                 : '500px'
                        }
                    }}
                    contentLabel="Example Modal"
                >
                    <IconContext.Provider value={{size: "1.25em"}}>
                        <button onClick={() => {that.closeModal(productStripeSku, state)}} className={"shipping-modal-close-button"}>
                            <FaRegWindowClose/>
                        </button>
                    </IconContext.Provider>
                    <Flickity className={'carousel'} // default ''
                              elementType={'div'}
                              options={{contain:true}}>
                    {bathDetailImages ? bathDetailImages.map((image) => (
                        displayImageForImageName(image, images)
                    )) : ""}
                    </Flickity>
                </Modal>)
            }
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
                                            <div className="category-header">
                                                <a href={"/" + productStripeSku}>{displayImageForImageName(getImage(productStripeSku, baths), images)}</a>
                                                <a href={"/" + productStripeSku}
                                                   id={category.id + "-" + productStripeSku + "-link"}>{getBathName(productStripeSku, baths)}</a>
                                                <p className={"bath-description"}>{getBathDescription(productStripeSku, baths)}</p>
                                                <button className={"add-to-cart"}>Add To Cart</button>
                                                <a className={"view-details"} onClick={() => {this.openModal(productStripeSku, this.state)}}>View Info</a>
                                            </div>
                                            {displayProductInfoModal(productStripeSku, baths, images, this.state, this)}
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