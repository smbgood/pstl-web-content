import React, {Component} from "react"
import Img from "gatsby-image"
import CartContext from "./widget/cart-context";
import {IconContext} from "react-icons";
import {FaRegWindowClose} from "react-icons/fa";
import Modal from "react-modal";
import Flickity from "react-flickity-component";
import "../../node_modules/flickity/css/flickity.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {formatPrice, getCurrencyForStripeSku, getPriceForStripeSku} from "../utils/shared";

class Category extends Component {

    //TODO add full cart display
    notify = () => toast("Added to Cart!")

    state = {
        modalsOpen : [],
        bigModalRefs : {},
        smallModalRefs: {},
        firstTab: {},
        secondTab: {},
        thirdTab: {},
        tabActive: {},
    }

    componentDidMount() {
        this.setState({modalsOpen: [], bigModalRefs: {}, smallModalRefs: {}, firstTab:{}, secondTab:{}, thirdTab: {}})
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
        this.setTabs = this.setTabs.bind(this)
    }

    setTabs(productStripeSku, baths){
        if(this.state && this.state.tabActive && this.state.tabActive[productStripeSku]){
            //do nothing
        }else{
            let bath = this.getBathById(productStripeSku, baths)
            let newFirst,newSecond,newThird
            let tabsActive = []
            if(bath.full_description){
                //add new value
                newFirst = this.state.firstTab
                newFirst[productStripeSku] = bath.full_description
            }
            if(bath.ingredients){
                //add new value
                newSecond = this.state.secondTab
                newSecond[productStripeSku] = bath.ingredients
            }
            if(bath.important){
                //add new value
                newThird = this.state.thirdTab
                newThird[productStripeSku] = bath.important
            }
            if(this.state && this.state.tabActive){
                tabsActive = this.state.tabActive
            }
            if(this.state && this.state.tabActive && this.state.tabActive.length > 0 && this.state.tabActive[productStripeSku]){
                //do not overwrite
            }else{
                tabsActive[productStripeSku] = "first"
            }
            this.setState({tabActive: tabsActive, firstTab:newFirst,secondTab:newSecond, thirdTab:newThird})
        }
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

    getBathName(id, baths, that) {
        if(id && baths){
            let bath = that.getBathById(id, baths)
            if(bath && bath.name){
                return bath.name
            }
        }
        return ""
    }

    getBathDescription(id, baths, that) {
        if(id && baths){
            let bath = that.getBathById(id, baths)
            if(bath && bath.short_description){
                return bath.short_description
            }
        }
        return ""
    }

    getBathLongDescription(id, baths, that) {
        if(id && baths){
            let bath = that.getBathById(id, baths)
            if(bath && bath.full_description){
                return bath.full_description
            }
        }
        return ""
    }

    getImage(id, baths, that){
        if(id && baths){
            let bath = that.getBathById(id, baths)
            if(bath && bath.image){
                return bath.image
            }
        }
        return ""
    }

    getBathById(id, baths) {
        if (baths && baths.nodes) {
            for (const bath of baths.nodes) {
                if (bath && bath.stripeId) {
                    if (bath.stripeId === id) {
                        return bath
                    }
                }
            }
        }
        return null
    }

    render() {

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

        function getBathDetailImages(id, baths, that){
            if(baths && id){
                let bath = that.getBathById(id, baths)
                if(bath && bath.detail_images){
                    return bath.detail_images
                }
            }
        }

        function doTabClick(tab, productStripeSku, state, that) {
            let tabsActive = {}
            if(that.state && that.state.tabActive && that.state.tabActive.length > 0){
                tabsActive = that.state.tabActive
            }
            tabsActive[productStripeSku] = tab
            that.setState({tabActive: tabsActive})
        }

        function getTabsContent(productStripeSku, baths, state, that) {
            if(state && state.tabActive && state.tabActive[productStripeSku]){
                let activeTab = state.tabActive[productStripeSku]
                switch(activeTab){
                    case "first":
                        if(state.firstTab && state.firstTab[productStripeSku])
                            return state.firstTab[productStripeSku]
                        break
                    case "second":
                        if(state.secondTab && state.secondTab[productStripeSku])
                            return state.secondTab[productStripeSku]
                        break                     
                    case "third":
                        if(state.thirdTab && state.thirdTab[productStripeSku])
                            return state.thirdTab[productStripeSku]
                        break
                }
            }else{
                //set tabs
                that.setTabs(productStripeSku, baths);
            }
            return ""
        }

        function getBathTabsDisplay(productStripeSku, baths, bath, state, that) {
            return (
                <div className={"tabs-container"}>
                    <div className={"tabs-top-holder"}>
                        <input type={"checkbox"} id={"tabs-top-first"} checked={state.tabActive && state.tabActive[productStripeSku] && state.tabActive[productStripeSku] === "first"}/>
                        <label for={"tabs-top-first"}>
                            <div className={"tabs-top-first banshee-tab"} onClick={() => {doTabClick("first", productStripeSku, that.state, that)}}>
                                <span className={"banshee-tab-info"}>Description</span></div>
                        </label>
                        <input type={"checkbox"} id={"tabs-top-second"} checked={state.tabActive && state.tabActive[productStripeSku] && state.tabActive[productStripeSku] === "second"}/>
                        <label for={"tabs-top-second"}>
                            <div className={"tabs-top-second banshee-tab"} onClick={() => {doTabClick("second", productStripeSku, that.state, that)}}>
                                <span className={"banshee-tab-info"}>Ingredients</span>
                            </div>
                        </label>
                        <input type={"checkbox"} id={"tabs-top-third"} checked={state.tabActive && state.tabActive[productStripeSku] && state.tabActive[productStripeSku] === "third"}/>
                        <label for={"tabs-top-third"}>
                            <div className={"tabs-top-third banshee-tab"} onClick={() => {doTabClick("third", productStripeSku, that.state, that)}}>
                                <span className={"banshee-tab-info"}>Important</span>
                            </div>
                        </label>
                    </div>
                    <div className={"tabs-content"} dangerouslySetInnerHTML={{__html: getTabsContent(productStripeSku, baths, state, that)}}>
                    </div>
                </div>


            );
        }

        function displayProductInfoModal(productStripeSku, baths, images, state, that, products, cart){
            let bathDetailImages = getBathDetailImages(productStripeSku, baths, that)
            let bath = that.getBathById(productStripeSku, baths)
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
                        <button onClick={() => {that.closeModal(productStripeSku, state)}} className={"product-modal-close-button"}>
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
                            <div className={"modal-description-left"}>
                                <div
                                    className={"modal-product-name"}>{that.getBathName(productStripeSku, baths, that)}</div>
                                <div className={"modal-product-price"}>{formatPrice(getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products))}</div>
                            </div>
                            <div className={"modal-description-right"}>
                                <button key={"add-to-cart"} className={"add-to-cart"}
                                        onClick={() => {handleClick(cart, productStripeSku, that, products, baths)}}>
                                    Add To Cart
                                </button>
                            </div>
                            {bath ? getBathTabsDisplay(productStripeSku, baths, bath, state, that): "" }
                        </div>
                    </div>
                </Modal>)
            }
        }

        function handleClick(cart, productStripeSku, that, products, baths){
            cart.addToCart(productStripeSku, 1, getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products), that.getBathName(productStripeSku, baths, that))
            that.notify();
        }

        const category = this.props.category
        const baths = this.props.baths
        const images = this.props.images
        const products = this.props.products

        return (
            <CartContext.Consumer>
                {cart => (
                    cart !== null && cart.cart != null ?
                        <div className="category-root" id={category.id + "-key"}>
                            {/*<h4 className="category-title" id={category.id + "-title"}>{category.name}</h4>*/}
                            <ul className="category-holder">
                                {category.products.map((productStripeSku) => (
                                    <React.Fragment key={category.id + "-" + productStripeSku}>
                                        <li>
                                            <div className="category-header">
                                                    <div className={"product-image-bg"} onClick={() => {this.openModal(productStripeSku, this.state)}}>
                                                        {displayImageForImageName(this.getImage(productStripeSku, baths, this), images, "category-product-img")}
                                                    </div>
                                                    <div className={"product-subtitle"}>
                                                        <div
                                                        className={"category-product-name"} onClick={() => {this.openModal(productStripeSku, this.state)}}>
                                                            <span className={"category-product-name-text"}>{this.getBathName(productStripeSku, baths, this)}</span>
                                                        </div>
                                                        <div className={"category-price"}>{formatPrice(getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products))}</div>
                                                        <div className={"category-add-to-cart"}>
                                                            <button key={"add-to-cart"} className={"add-to-cart"}
                                                                    onClick={() => {handleClick(cart, productStripeSku, this, products, baths)}}>
                                                                Add To Cart
                                                            </button>
                                                        </div>
                                                    </div>

                                            </div>
                                            {displayProductInfoModal(productStripeSku, baths, images, this.state, this, products, cart)}
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