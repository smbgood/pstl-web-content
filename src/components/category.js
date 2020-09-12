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
import {
    formatPrice,
    getProductCurrency,
    getProductPrice,
    getProductImage,
    getProductName, getProductById, getProductDetailImages
} from "../utils/shared";

const Msg = ({ closeToast }) => (
    <div>
        Item(s) Added to Cart!
        <Link to={"/shope/cart"} className={"toast-view-cart"} state={{itemSelected:"cart"}}>View Cart</Link>
    </div>
)

class Category extends Component {


    //TODO add full cart display
    notify = () => toast(<Msg/> , {closeOnClick:false, pauseOnHover:true})

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
            this.props.category.products.map((productId) => {
                this.setTabs(productId, baths);
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
        this.displayImageForImageName = this.displayImageForImageName.bind(this)
        this.doTabClick = this.doTabClick.bind(this)
        this.getTabsContent = this.getTabsContent.bind(this)
        this.getBathTabsDisplay = this.getBathTabsDisplay.bind(this)
        this.displayProductInfoModal = this.displayProductInfoModal.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleInputIncrease = this.handleInputIncrease.bind(this)
        this.handleInputDecrease = this.handleInputDecrease.bind(this)
    }

    setTabs(productId, baths){

        let bath = getProductById(productId, baths)
        let newFirst,newSecond,newThird
        let tabsActive = {}
        let amountsToAdd = {}
        if(bath.full_description){
            //add new value
            newFirst = this.state.firstTab
            newFirst[productId] = bath.full_description
        }
        if(bath.ingredients){
            //add new value
            newSecond = this.state.secondTab
            newSecond[productId] = bath.ingredients
        }
        if(bath.important){
            //add new value
            newThird = this.state.thirdTab
            newThird[productId] = bath.important
        }
        if(this.state && this.state.tabActive){
            tabsActive = this.state.tabActive
        }

        tabsActive[productId] = "first"

        if(this.state && this.state.amountsToAdd){
            amountsToAdd = this.state.amountsToAdd
        }

        //initialize each tab to 1 product to add to cart by default
        amountsToAdd[productId] = 1

        this.setState({tabActive: tabsActive, firstTab:newFirst,secondTab:newSecond, thirdTab:newThird, amountsToAdd: amountsToAdd})
    }

    increaseInputQuantity(productId){
        if(this.state && this.state.amountsToAdd){
            let newVals = this.state.amountsToAdd
            let amountsToAddElement = this.state.amountsToAdd[productId];
            newVals[productId] = amountsToAddElement + 1
            this.setState({amountsToAdd:newVals})
        }else{
            //do nothing
        }
    }

    decreaseInputQuantity(productId){
        if(this.state && this.state.amountsToAdd){
            let newVals = this.state.amountsToAdd
            let amountsToAddElement = this.state.amountsToAdd[productId];
            if(amountsToAddElement === 0){
                return
            }
            amountsToAddElement = amountsToAddElement - 1;
            if(amountsToAddElement === 0){
                return
            }
            newVals[productId] = amountsToAddElement
            this.setState({amountsToAdd:newVals})

        }else{
            //do nothing
        }
    }

    openModal(productId){
        if(this.state && this.state.modalsOpen){
            if(this.state.modalsOpen.indexOf(productId) === -1) {
                let newArray = this.state.modalsOpen
                newArray.push(productId)
                this.setState({modalsOpen: newArray})
            }
        }
    }

    getModalOpen(productId){
        if(this.state && this.state.modalsOpen && this.state.modalsOpen.length > 0){
            if(this.state.modalsOpen.indexOf(productId) > -1){
                return true
            }
        }
        return false
    }

    closeModal(productId){
        if(this.state.modalsOpen) {
            if (this.state.modalsOpen.indexOf(productId) > -1) {
                let newVals = this.state.modalsOpen;
                newVals.splice(newVals.indexOf(productId))
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

    doTabClick(tab, productId) {
        let tabsActive = {}
        if(this.state && this.state.tabActive){
            tabsActive = this.state.tabActive
        }
        tabsActive[productId] = tab
        this.setState({tabActive: tabsActive})
    }

    getTabsContent(productId) {
        if(this.state && this.state.tabActive && this.state.tabActive[productId]){
            let activeTab = this.state.tabActive[productId]
            switch(activeTab){
                case "first":
                    if(this.state.firstTab && this.state.firstTab[productId])
                        return this.state.firstTab[productId]
                    break
                case "second":
                    if(this.state.secondTab && this.state.secondTab[productId])
                        return this.state.secondTab[productId]
                    break
                case "third":
                    if(this.state.thirdTab && this.state.thirdTab[productId])
                        return this.state.thirdTab[productId]
                    break
            }
        }else{
            //no data

        }
        return ""
    }

    getBathTabsDisplay(productId, baths) {
        return (
            <div className={"tabs-container"}>
                <div className={"tabs-top-holder"}>
                    <input type={"checkbox"} id={"tabs-top-first"} checked={this.state.tabActive && this.state.tabActive[productId] && this.state.tabActive[productId] === "first"} readOnly={true}/>
                    <label htmlFor={"tabs-top-first"}>
                        <div className={"tabs-top-first banshee-tab"} onClick={() => this.doTabClick("first", productId)}>
                            <div className={"banshee-tab-info"}>Description</div></div>
                    </label>
                    <input type={"checkbox"} id={"tabs-top-second"} checked={this.state.tabActive && this.state.tabActive[productId] && this.state.tabActive[productId] === "second"} readOnly={true}/>
                    <label htmlFor={"tabs-top-second"}>
                        <div className={"tabs-top-second banshee-tab"} onClick={() => this.doTabClick("second", productId)}>
                            <div className={"banshee-tab-info"}>Ingredients</div>
                        </div>
                    </label>
                    <input type={"checkbox"} id={"tabs-top-third"} checked={this.state.tabActive && this.state.tabActive[productId] && this.state.tabActive[productId] === "third"} readOnly={true}/>
                    <label htmlFor={"tabs-top-third"}>
                        <div className={"tabs-top-third banshee-tab"} onClick={() => this.doTabClick("third", productId)}>
                            <div className={"banshee-tab-info"}>Important</div>
                        </div>
                    </label>
                </div>
                <div className={"tabs-content"} dangerouslySetInnerHTML={{__html: this.getTabsContent(productId, baths)}}>
                </div>
            </div>


        );
    }

    displayProductInfoModal(productId, baths, images, cart){
        let bathDetailImages = getProductDetailImages(productId, baths)
        let bath = getProductById(productId, baths)
        if(this.getModalOpen(productId)){
            return (<Modal
                isOpen={this.getModalOpen(productId)}
                onRequestClose={() => this.closeModal(productId)}
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
                    <button onClick={() => this.closeModal(productId)} className={"product-modal-close-button"}>
                        <FaRegWindowClose/>
                    </button>
                </IconContext.Provider>
                <div className={"modal-product-contents"}>
                    <div className={"modal-product-images"}>
                        <Flickity className={'modal-carousel'} // default ''
                                  elementType={'div'}
                                  flickityRef={c=> this.setBigCarousel(c, productId)}
                                  options={{contain:true, freeScroll: true, prevNextButtons:true, pageDots:false}}>
                            {bathDetailImages ? bathDetailImages.map((image) => (
                                this.displayImageForImageName(image, images, "modal-product-img")
                            )) : ""}
                        </Flickity>
                        <Flickity className={"modal-carousel-nav"}
                                  elementType={"div"}
                                  flickityRef={c=> this.setLittleCarousel(c, productId)}
                                  options={{contain:false, freeScroll:true, pageDots:false}}>
                            {bathDetailImages ? bathDetailImages.map((image) => (
                                this.displayImageForImageName(image, images, "modal-small-nav-img")
                            )) : ""}
                        </Flickity>
                    </div>
                    <div className={"modal-product-long-description"}>
                        <div className={"modal-description-left"}>
                            <div
                                className={"modal-product-name"}>{getProductName(productId, baths)}</div>
                            <div className={"modal-product-price"}>{formatPrice(getProductPrice(productId, baths), getProductCurrency(productId, baths))}</div>
                        </div>
                        <div className={"modal-description-right"}>
                            <div className={"modal-cart-buttons"}>
                                <IconContext.Provider value={{size:"2em"}}>
                                    <button key={"add-to-cart-down"} className={"add-to-cart-down"} onClick={() => this.handleInputDecrease(productId)}>
                                        <FaArrowDown/>
                                    </button>
                                </IconContext.Provider>
                                <button key={"add-to-cart"} className={"add-to-cart"}
                                        onClick={() => this.handleClick(cart, this.state.amountsToAdd[productId], productId, baths)}>
                                    Add {this.state.amountsToAdd[productId]} to Cart
                                </button>
                                <IconContext.Provider value={{size:"2em"}}>
                                    <button key={"add-to-cart-up"} className={"add-to-cart-up"} onClick={() => this.handleInputIncrease(productId)}>
                                        <FaArrowUp/>
                                    </button>
                                </IconContext.Provider>
                            </div>
                        </div>
                        {bath ? this.getBathTabsDisplay(productId, baths, bath): "" }
                    </div>
                </div>
            </Modal>)
        }
    }

    handleClick(cart, qty, productId, baths){
        cart.addToCart(productId, qty, getProductPrice(productId, baths), getProductCurrency(productId, baths), getProductName(productId, baths))
        this.notify();
    }

    handleInputIncrease(productId){
        this.increaseInputQuantity(productId)
    }

    handleInputDecrease(productId){
        this.decreaseInputQuantity(productId)
    }

    render() {

        const category = this.props.category
        const baths = this.props.baths
        const images = this.props.images

        return (
            <CartContext.Consumer>
                {cart => (
                    cart !== null && cart.cart != null ?
                        <div className="category-root" id={category.id + "-key"}>
                            <ul className="category-holder">
                                {category.products.map((productId) => (
                                    <React.Fragment key={category.id + "-" + productId}>
                                        <li>
                                            <div className="category-header" onClick={() => this.openModal(productId)}>
                                                    <div className={"product-image-bg"} onClick={() => this.openModal(productId)}>
                                                        {this.displayImageForImageName(getProductImage(productId, baths), images, "category-product-img")}
                                                    </div>
                                                    <div className={"product-subtitle"}>
                                                        <div
                                                        className={"category-product-name"} onClick={() => this.openModal(productId)}>
                                                            <span className={"category-product-name-text"}>{getProductName(productId, baths)}</span>
                                                        </div>
                                                        <div className={"category-price"}>{formatPrice(getProductPrice(productId, baths), getProductCurrency(productId, baths))}</div>
                                                    </div>

                                            </div>
                                            <div className="category-add-cart-parent">
                                                <div className={"category-add-to-cart"}>
                                                    <button key={"add-to-cart"} className={"add-to-cart"}
                                                            onClick={() => this.handleClick(cart, 1, productId, baths)}>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                            {this.displayProductInfoModal(productId, baths, images, cart)}
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