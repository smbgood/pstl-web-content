import React, {Component} from "react"
import Img from "gatsby-image"
import {Link} from "gatsby"
import CartContext from "./widget/cart-context";
import {IconContext} from "react-icons";
import {FaArrowDown, FaArrowUp, FaRegWindowClose} from "react-icons/fa";
import Modal from "react-modal";
import Flickity from "react-flickity-component";
import "../../node_modules/flickity/css/flickity.css"
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {formatPrice, getCurrencyForStripeSku, getPriceForStripeSku} from "../utils/shared";

const Msg = ({ closeToast }) => (
    <div>
        Item(s) Added to Cart!
        <Link to={"/shope/cart"} className={"toast-view-cart"} state={{itemSelected:"cart"}}>View Cart</Link>
    </div>
)

class Category extends Component {


    //TODO add full cart display
    notify = () => toast(<Msg/> , {closeOnClick:false})

    state = {
        modalsOpen : [],
        bigModalRefs : {},
        smallModalRefs: {},
        firstTab: {},
        secondTab: {},
        thirdTab: {},
        tabActive: {},
        amountsToAdd: {},
    }

    componentDidMount() {
        this.setState({modalsOpen: [], bigModalRefs: {}, smallModalRefs: {}, firstTab:{}, secondTab:{}, thirdTab: {}, amountsToAdd: {}})
        let baths = this.props.baths;
        if(this.props.category && this.props.category.products) {
            this.props.category.products.map((productStripeSku) => {
                this.setTabs(productStripeSku, baths);
            })
        }
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
        this.increaseInputQuantity = this.increaseInputQuantity.bind(this)
        this.decreaseInputQuantity = this.decreaseInputQuantity.bind(this)
        this.handleInputIncrease = this.handleInputIncrease.bind(this)
        this.getBathName = this.getBathName.bind(this)
        this.getBathImage = this.getBathImage.bind(this)
        this.getBathById = this.getBathById.bind(this)
        this.displayImageForImageName = this.displayImageForImageName.bind(this)
        this.getBathDetailImages = this.getBathDetailImages.bind(this)
        this.doTabClick = this.doTabClick.bind(this)
        this.getTabsContent = this.getTabsContent.bind(this)
        this.getBathTabsDisplay = this.getBathTabsDisplay.bind(this)
        this.displayProductInfoModal = this.displayProductInfoModal.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleInputIncrease = this.handleInputIncrease.bind(this)
        this.handleInputDecrease = this.handleInputDecrease.bind(this)
    }

    setTabs(productStripeSku, baths){

        let bath = this.getBathById(productStripeSku, baths)
        let newFirst,newSecond,newThird
        let tabsActive = {}
        let amountsToAdd = {}
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

        tabsActive[productStripeSku] = "first"

        if(this.state && this.state.amountsToAdd){
            amountsToAdd = this.state.amountsToAdd
        }

        /*if(this.state.amountsToAdd.length > 0 && this.state.amountsToAdd[productStripeSku] > -1){

        }else{*/
            amountsToAdd[productStripeSku] = 1
        //}

        this.setState({tabActive: tabsActive, firstTab:newFirst,secondTab:newSecond, thirdTab:newThird, amountsToAdd: amountsToAdd})

    }

    increaseInputQuantity(productStripeSku){
        if(this.state && this.state.amountsToAdd){
            let newVals = this.state.amountsToAdd
            let amountsToAddElement = this.state.amountsToAdd[productStripeSku];
            newVals[productStripeSku] = amountsToAddElement + 1
            this.setState({amountsToAdd:newVals})
        }else{
            //do nothing
        }
    }

    decreaseInputQuantity(productStripeSku){
        if(this.state && this.state.amountsToAdd){
            let newVals = this.state.amountsToAdd
            let amountsToAddElement = this.state.amountsToAdd[productStripeSku];
            if(amountsToAddElement === 0){
                return
            }
            amountsToAddElement = amountsToAddElement - 1;
            newVals[productStripeSku] = amountsToAddElement
            this.setState({amountsToAdd:newVals})

        }else{
            //do nothing
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

    getBathName(id, baths) {
        if(id && baths){
            let bath = this.getBathById(id, baths)
            if(bath && bath.name){
                return bath.name
            }
        }
        return ""
    }

    getBathImage(id, baths){
        if(id && baths){
            let bath = this.getBathById(id, baths)
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

    displayImageForImageName(imageName, images, imageClass){
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

    getBathDetailImages(id, baths){
        if(baths && id){
            let bath = this.getBathById(id, baths)
            if(bath && bath.detail_images){
                return bath.detail_images
            }
        }
    }

    doTabClick(tab, productStripeSku) {
        let tabsActive = {}
        if(this.state && this.state.tabActive){
            tabsActive = this.state.tabActive
        }
        tabsActive[productStripeSku] = tab
        this.setState({tabActive: tabsActive})
    }

    getTabsContent(productStripeSku) {
        if(this.state && this.state.tabActive && this.state.tabActive[productStripeSku]){
            let activeTab = this.state.tabActive[productStripeSku]
            switch(activeTab){
                case "first":
                    if(this.state.firstTab && this.state.firstTab[productStripeSku])
                        return this.state.firstTab[productStripeSku]
                    break
                case "second":
                    if(this.state.secondTab && this.state.secondTab[productStripeSku])
                        return this.state.secondTab[productStripeSku]
                    break
                case "third":
                    if(this.state.thirdTab && this.state.thirdTab[productStripeSku])
                        return this.state.thirdTab[productStripeSku]
                    break
            }
        }else{
            //no data

        }
        return ""
    }

    getBathTabsDisplay(productStripeSku, baths) {
        return (
            <div className={"tabs-container"}>
                <div className={"tabs-top-holder"}>
                    <input type={"checkbox"} id={"tabs-top-first"} checked={this.state.tabActive && this.state.tabActive[productStripeSku] && this.state.tabActive[productStripeSku] === "first"} readOnly={true}/>
                    <label htmlFor={"tabs-top-first"}>
                        <div className={"tabs-top-first banshee-tab"} onClick={() => this.doTabClick("first", productStripeSku)}>
                            <span className={"banshee-tab-info"}>Description</span></div>
                    </label>
                    <input type={"checkbox"} id={"tabs-top-second"} checked={this.state.tabActive && this.state.tabActive[productStripeSku] && this.state.tabActive[productStripeSku] === "second"} readOnly={true}/>
                    <label htmlFor={"tabs-top-second"}>
                        <div className={"tabs-top-second banshee-tab"} onClick={() => this.doTabClick("second", productStripeSku)}>
                            <span className={"banshee-tab-info"}>Ingredients</span>
                        </div>
                    </label>
                    <input type={"checkbox"} id={"tabs-top-third"} checked={this.state.tabActive && this.state.tabActive[productStripeSku] && this.state.tabActive[productStripeSku] === "third"} readOnly={true}/>
                    <label htmlFor={"tabs-top-third"}>
                        <div className={"tabs-top-third banshee-tab"} onClick={() => this.doTabClick("third", productStripeSku)}>
                            <span className={"banshee-tab-info"}>Important</span>
                        </div>
                    </label>
                </div>
                <div className={"tabs-content"} dangerouslySetInnerHTML={{__html: this.getTabsContent(productStripeSku, baths)}}>
                </div>
            </div>


        );
    }

    displayProductInfoModal(productStripeSku, baths, images, products, cart){
        let bathDetailImages = this.getBathDetailImages(productStripeSku, baths)
        let bath = this.getBathById(productStripeSku, baths)
        if(this.getModalOpen(productStripeSku)){
            return (<Modal
                isOpen={this.getModalOpen(productStripeSku)}
                onRequestClose={() => this.closeModal(productStripeSku)}
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
                    <button onClick={() => this.closeModal(productStripeSku)} className={"product-modal-close-button"}>
                        <FaRegWindowClose/>
                    </button>
                </IconContext.Provider>
                <div className={"modal-product-contents"}>
                    <div className={"modal-product-images"}>
                        <Flickity className={'modal-carousel'} // default ''
                                  elementType={'div'}
                                  flickityRef={c=> this.setBigCarousel(c, productStripeSku)}
                                  options={{contain:true, freeScroll: true, prevNextButtons:true, pageDots:false}}>
                            {bathDetailImages ? bathDetailImages.map((image) => (
                                this.displayImageForImageName(image, images, "modal-product-img")
                            )) : ""}
                        </Flickity>
                        <Flickity className={"modal-carousel-nav"}
                                  elementType={"div"}
                                  flickityRef={c=> this.setLittleCarousel(c, productStripeSku)}
                                  options={{contain:false, freeScroll:true, pageDots:false}}>
                            {bathDetailImages ? bathDetailImages.map((image) => (
                                this.displayImageForImageName(image, images, "modal-small-nav-img")
                            )) : ""}
                        </Flickity>
                    </div>
                    <div className={"modal-product-long-description"}>
                        <div className={"modal-description-left"}>
                            <div
                                className={"modal-product-name"}>{this.getBathName(productStripeSku, baths)}</div>
                            <div className={"modal-product-price"}>{formatPrice(getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products))}</div>
                        </div>
                        <div className={"modal-description-right"}>
                            <div className={"modal-cart-buttons"}>
                                <IconContext.Provider value={{size:"2em"}}>
                                    <button key={"add-to-cart-down"} className={"add-to-cart-down"} onClick={() => this.handleInputDecrease(productStripeSku)}>
                                        <FaArrowDown/>
                                    </button>
                                </IconContext.Provider>
                                <button key={"add-to-cart"} className={"add-to-cart"}
                                        onClick={() => this.handleClick(cart, this.state.amountsToAdd[productStripeSku], productStripeSku, products, baths)}>
                                    Add {this.state.amountsToAdd[productStripeSku]} to Cart
                                </button>
                                <IconContext.Provider value={{size:"2em"}}>
                                    <button key={"add-to-cart-up"} className={"add-to-cart-up"} onClick={() => this.handleInputIncrease(productStripeSku)}>
                                        <FaArrowUp/>
                                    </button>
                                </IconContext.Provider>
                            </div>
                        </div>
                        {bath ? this.getBathTabsDisplay(productStripeSku, baths, bath): "" }
                    </div>
                </div>
            </Modal>)
        }
    }

    handleClick(cart, qty, productStripeSku, products, baths){
        cart.addToCart(productStripeSku, qty, getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products), this.getBathName(productStripeSku, baths))
        this.notify();
    }

    handleInputIncrease(productStripeSku){
        this.increaseInputQuantity(productStripeSku)
    }

    handleInputDecrease(productStripeSku){
        this.decreaseInputQuantity(productStripeSku)
    }

    render() {

        const category = this.props.category
        const baths = this.props.baths
        const images = this.props.images
        const products = this.props.products

        return (
            <CartContext.Consumer>
                {cart => (
                    cart !== null && cart.cart != null ?
                        <div className="category-root" id={category.id + "-key"}>
                            <ul className="category-holder">
                                {category.products.map((productStripeSku) => (
                                    <React.Fragment key={category.id + "-" + productStripeSku}>
                                        <li>
                                            <div className="category-header">
                                                    <div className={"product-image-bg"} onClick={() => this.openModal(productStripeSku)}>
                                                        {this.displayImageForImageName(this.getBathImage(productStripeSku, baths), images, "category-product-img")}
                                                    </div>
                                                    <div className={"product-subtitle"}>
                                                        <div
                                                        className={"category-product-name"} onClick={() => this.openModal(productStripeSku)}>
                                                            <span className={"category-product-name-text"}>{this.getBathName(productStripeSku, baths)}</span>
                                                        </div>
                                                        <div className={"category-price"}>{formatPrice(getPriceForStripeSku(productStripeSku, products), getCurrencyForStripeSku(productStripeSku, products))}</div>
                                                        <div className={"category-add-to-cart"}>
                                                            <button key={"add-to-cart"} className={"add-to-cart"}
                                                                    onClick={() => this.handleClick(cart, 1, productStripeSku, products, baths)}>
                                                                Add to Cart
                                                            </button>
                                                        </div>
                                                    </div>

                                            </div>
                                            {this.displayProductInfoModal(productStripeSku, baths, images, products, cart)}
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