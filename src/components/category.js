import React, {Component} from "react"
import Img from "gatsby-image"
import CartContext from "./widget/cart-context";
import {IconContext} from "react-icons";
import {FaRegWindowClose} from "react-icons/fa";
import Modal from "react-modal";
import Flickity from "react-flickity-component";
import 'flickity-as-nav-for';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {formatPrice, getCurrencyForStripeSku, getPriceForStripeSku} from "../utils/shared";
import {navigate} from "@reach/router";

class Category extends Component {

    notify = () => toast("Added to Cart!")

    state = {
        modalsOpen : [],
        bigModalRefs : {},
        smallModalRefs: {}
    }

    componentDidMount() {
        this.setState({modalsOpen: [], bigModalRefs: {}, smallModalRefs: {}})
        /*this.flkty.on('settle', () => {
            console.log(`current index is ${this.flkty.selectedIndex}`)
        })*/
    }

    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.notify = this.notify.bind(this)
        this.setBigCarousel = this.setBigCarousel.bind(this)
        this.setLittleCarousel = this.setLittleCarousel.bind(this)
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

    setBigCarousel(carousel, id){
        if(this.state && this.state.bigModalRefs){
            if(this.state.bigModalRefs[id]){

            }else{
                carousel.on("change", ()=> {
                    console.log(carousel)
                })
                let newVals = this.state.bigModalRefs;
                newVals[id] = carousel
                this.setState({bigModalRefs:newVals})
            }
        }
    }

    setLittleCarousel(carousel, id){
        if(this.state && this.state.smallModalRefs){
            if(this.state.smallModalRefs[id]){

            }else{
                //setup scrolling
                let bigCarousel = this.state.bigModalRefs[id]
                if(bigCarousel){
                    bigCarousel.on("change", (index)=> {
                        carousel.select(index, true, false)
                    })
                    carousel.on("change", (index)=> {
                        bigCarousel.select(index, true, false)
                    })
                    carousel.on("staticClick", (event, pointer, cellElement, cellIndex) => {
                        bigCarousel.select(cellIndex, true, false)
                    })
                }
                let newVals = this.state.smallModalRefs;
                newVals[id] = carousel
                this.setState({smallModalRefs:newVals})
            }
        }
    }

    render() {
        const category = this.props.category
        const baths = this.props.baths
        const images = this.props.images
        const products = this.props.products

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

        function getBathLongDescription(id, baths) {
            if(id && baths){
                let bath = getBathById(id, baths)
                if(bath && bath.full_description){
                    return bath.full_description
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

        function displayImageForImageName(imageName, images, imageClass){
            if(imageName && imageName.indexOf("/") > -1){
                imageName = imageName.substring(imageName.lastIndexOf("/") + 1, imageName.length )
            }
            if(images && images.nodes){
                for(const image of images.nodes){
                    if(image && image.fluid.originalName === imageName){
                        return (<Img key={"img-" + image.fluid.originalName} className={imageClass} fluid={image.fluid}/>)
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
            let bath = getBathById(productStripeSku, baths)
            if(that.getModalOpen(productStripeSku, state)){
                return (<Modal
                    isOpen={that.getModalOpen(productStripeSku, state)}
                    onRequestClose={() => {that.closeModal(productStripeSku, state)}}
                    appElement={document.querySelector("#___gatsby")}
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
                >
                    <IconContext.Provider value={{size: "1.25em"}}>
                        <button onClick={() => {that.closeModal(productStripeSku, state)}} className={"shipping-modal-close-button"}>
                            <FaRegWindowClose/>
                        </button>
                    </IconContext.Provider>
                    <div className={"modal-product-contents"}>
                        <div className={"modal-product-images"}>
                            <Flickity className={'modal-carousel'} // default ''
                                      elementType={'div'}
                                      flickityRef={c=> that.setBigCarousel(c, productStripeSku)}
                                      options={{contain:true, freeScroll: true, prevNextButtons:false, pageDots:false}}>
                            {bathDetailImages ? bathDetailImages.map((image) => (
                                displayImageForImageName(image, images, "modal-product-img")
                            )) : ""}
                            </Flickity>
                            <Flickity className={"modal-carousel-nav"}
                                      elementType={"div"}
                                      flickityRef={c=> that.setLittleCarousel(c, productStripeSku)}
                                      options={{contain:false, freeScroll:true, pageDots:false}}>
                                {bathDetailImages ? bathDetailImages.map((image) => (
                                    displayImageForImageName(image, images, "modal-small-nav-img")
                                )) : ""}
                            </Flickity>
                        </div>
                        <div className={"modal-product-long-description"}>
                            <span
                                className={"modal-product-name"}>{getBathName(productStripeSku, baths)}</span>
                            <span className={"modal-product-price"}>{formatPrice(getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products))}</span>
                            <span className={"modal-product-description"}>{bath ? getBathLongDescription(productStripeSku, baths) : ""}</span>
                        </div>
                    </div>
                </Modal>)
            }
        }

        function handleClick(cart, productStripeSku, that, products, baths){
            that.notify();
            cart.addToCart(productStripeSku, 1, getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products), getBathName(productStripeSku, baths))
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
                                                <a onClick={() => {this.openModal(productStripeSku, this.state)}} className={"product-image-subtitle-link"}
                                                   id={category.id + "-" + productStripeSku + "-link"}>
                                                    <div className={"product-image-bg"}>
                                                        {displayImageForImageName(getImage(productStripeSku, baths), images, "category-product-img")}
                                                    </div>
                                                    <div className={"product-subtitle"}>
                                                        <span
                                                        className={"category-product-name"}>{getBathName(productStripeSku, baths)}</span>
                                                        <span className={"category-price"}>{formatPrice(getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products))}</span>
                                                    </div>
                                                </a>
                                                {/*<button className={"add-to-cart"}>Add To Cart</button>*/}
                                                <button key={"add-to-cart"} className={"add-to-cart"}
                                                        onClick={() => {handleClick(cart, productStripeSku, this, products, baths)}}>
                                                    Add To Cart
                                                </button>
                                                <a className={"view-details"} onClick={() => {this.openModal(productStripeSku, this.state)}}>More Info</a>
                                            </div>
                                            {displayProductInfoModal(productStripeSku, baths, images, this.state, this)}
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                            <ToastContainer/>
                        </div>
                        : "")}
            </CartContext.Consumer>

        )
    }
}

export default Category