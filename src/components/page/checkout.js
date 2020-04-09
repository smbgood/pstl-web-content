import React, { Component } from 'react'

import "../../styles/cart.scss"
import {formatPrice} from "../../utils/shared";
import CartContext from "../widget/cart-context";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Modal from 'react-modal';
import { FaInfo, FaRegWindowClose } from "react-icons/fa";
import { IconContext } from "react-icons"

String.prototype.removeCharAt = function (i) {
    let tmp = this.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}

class Checkout extends Component {

    state = {
        stripe: null,
        shipping: null,
        modalsOpen: []
    }
    componentDidMount() {
        const stripe = window.Stripe("pk_live_OGxNOUzWvpoUJS3yscyZ6Ccw00ukIopzD4")
        /*const stripe = window.Stripe("pk_test_4xqQzlAyU2e9MJ2h9P1SapFe00K4jXy6Rk")*/
        this.setState({ stripe: stripe, shipping: {}, modalsOpen:[] })
    }

    openModal(state, id){
        if(state.state.modalsOpen){
            if(state.state.modalsOpen[id]){
                //modal already open, do nothing
            }else{
                let newVal = state.state.modalsOpen;
                newVal.push(id)
                state.setState({modalsOpen: newVal})
            }
        }
    }

    closeModal(state, id){
        if(state.state.modalsOpen) {
            if (state.state.modalsOpen.indexOf(id) > -1) {
                let newVals = state.state.modalsOpen;
                newVals.splice(newVals.indexOf(id))
                state.setState({modalsOpen: newVals})
            }
        }
    }

    async doCheckout(cart, orderId, shipping, stripe){
        let outItems = []
        for(let cartItem of cart){
            let sku = cartItem.sku
            let qty = cartItem.qty
            let obj = {sku: sku, quantity:qty}
            outItems.push(obj)
        }

        //add pseudo items for shipping
        if(shipping && shipping.rate) {
            let rate = parseInt(shipping.rate)
            //testing sku
            let shippingSku = "sku_GtwTbV76ZkJSXo"
            //live sku
            //let shippingSku = "sku_GwA4reU8UYoeki"
            let obj = {sku : shippingSku, quantity: rate}
            outItems.push(obj)
        }

        //make request to stripe
        const { error } = await stripe.redirectToCheckout({
            items: outItems,
            successUrl: `https://www.bansheebabe.com/page-2/`,
            cancelUrl: `https://www.bansheebabe.com/shope/cart`,
            billingAddressCollection:`required`,
            clientReferenceId: orderId+"___"+shipping.id,
        })

        if (error) {
            console.warn("Error:", error)
            //TODO error handling if stripe payment request fails
        }
    }

    render() {
        return (
            <CartContext.Consumer>
                {cart => (
                    cart != null && cart.cart != null ?
                        <div className={"cart-page-root"} >
                            <Formik
                                validate={values => {
                                    const errors = {}
                                    if(!values.shippingoption){
                                        errors.shippingoption = "Please select a shipping method"
                                    }else{
                                        console.log(values.shippingoption)
                                        let rate = values.shippingoption.substring(0,values.shippingoption.indexOf("___"))
                                        let rateId = values.shippingoption.substring(values.shippingoption.indexOf("___")+3, values.shippingoption.length)
                                        this.setState({shipping: {rate: rate, id:rateId}});
                                    }
                                    return errors
                                }}
                                validateOnChange={true}
                                initialValues={
                                    {
                                        firstname: this.props.location.state.address.name,
                                        email: this.props.location.state.address.email,
                                        addresslineone: this.props.location.state.address["street1"],
                                        addresslinetwo: this.props.location.state.address["street2"],
                                        city: this.props.location.state.address.city,
                                        state: this.props.location.state.address.state,
                                        country:this.props.location.state.address.country,
                                        zip:this.props.location.state.address["zip"],
                                        message: '',
                                        cart: this.props.location.state.beepBoop,
                                        shipping: this.props.location.state.rates,
                                        orderId: this.props.location.state.orderId,
                                        formatPrice: formatPrice,
                                        shippingoption: '',
                                        checkout: this.doCheckout,
                                    }
                                }
                                onSubmit={(values, { setSubmitting }) => {
                                    if(values && values.cart != null && values.shippingoption){
                                        //TODO post message off to our own server if user added one so we can take action
                                        //need to post to our OMS so we can start fulfillment, then redirectToCheckout
                                        this.doCheckout(values.cart, values.orderId, this.state.shipping, this.state.stripe)
                                    }

                                }}
                            >
                                {({ values, touched, isSubmitting}) => (
                                    <Form name="bbcheckout" action="/" >
                                        <div className={"checkout-top"}>
                                        <div className={"checkout-shipping-to-heading"}>
                                            <h5>Ship to:</h5>
                                        </div>
                                        <div className={"checkout-shipping-to-heading-mobile"}>
                                            <h5>Ship to:</h5>
                                        </div>
                                        <div className={"checkout-shipping-to"}>
                                            <Field name="firstname" disabled/>
                                            <Field type="email" name="email" disabled/>
                                            <Field name="addresslineone" disabled/>
                                            {values.addresslinetwo !== "" ? <Field name="addresslinetwo" disabled /> : ""}
                                            <Field name="city" disabled/>
                                            <Field name="state" disabled/>
                                            <Field name="zip" disabled/>
                                            <Field as="select" name="country" disabled>
                                                <option value="">Select a country</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                            </Field>
                                        </div>
                                        </div>

                                        <div className={"checkout-shipping-options"}>
                                            <h4>Shipping Options</h4>
                                            <Field name="shippingoption" render={({field}) => (
                                                <>
                                                    {values.shipping != null ? values.shipping.map( item =>{
                                                        return item != null ? this.showShippingOptions(item, field, this, this.openModal, this.closeModal, this.state.modalOpen) : ""
                                                    }) : ""}
                                                </>
                                            )}/>
                                            <ErrorMessage name="shippingoption" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>
                                        </div>

                                        <div className={"checkout-cart-contents"}>
                                            <h6>You'll receive:</h6>
                                            {values.cart != null && values.cart.map( item => (
                                                item != null && item.qty > 0 ?
                                                    <div key={item.name + "-cart-item"} className={"cart-row-item"}>
                                                        <div className={"cart-left"}>{item.name}</div>
                                                        <div className={"cart-mid"}>{item.qty}</div>
                                                        <div className={"cart-right"}>{formatPrice(item.price, item.currency)}</div>
                                                        <div className={"cart-last"}>{formatPrice((item.price*item.qty), item.currency)}</div>
                                                        {/* TODO add function to return to cart screen and show empty cart message */}
                                                    </div>
                                                : ""
                                            ))}

                                        </div>

                                        <div className={"checkout-shipping-total"}>

                                            <div className={"shipping-amount-line"}>
                                                {this.state.shipping != null && this.state.shipping.rate != null && "Shipping: $" + this.state.shipping.rate}
                                            </div>

                                            <div className={"cart-row-item cart-total-line"}>
                                                <div className={"cart-left"}/>
                                                <div className={"cart-mid"}/>
                                                <div className={"cart-right"}/>
                                                <div className={"cart-last"}>
                                                    {values.cart != null && values.cart.length > 0 && values.shippingoption !== '' ? "GRAND TOTAL:" + values.formatPrice(parseInt(values.shippingoption.removeCharAt(values.shippingoption.indexOf(".")+1)) + parseInt(values.cart.reduce(function(acc, val){ return acc + (val.qty * val.price)}, 0)),
                                                        values.cart[0].currency) : ""}
                                                </div>
                                            </div>

                                        </div>

                                        {/*<div className={"checkout-order-message"}>
                                            <Field name="message" component="textarea" placeholder="Message" />
                                            <ErrorMessage name="message" render={msg => <div className={"form-error-msg"}>{msg}</div>} />
                                        </div>*/}

                                        <button className="order-form-submit" type="submit" disabled={isSubmitting && values.shippingoption !== ''}>
                                            Pay Now
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div> : ""
                )}
            </CartContext.Consumer>
        )
    }



    showShippingOptions(item, field, state, openModal, closeModal) {
        if(item != null && item.provider) {
            let customStyles = {
                content : {
                    top                   : '50%',
                    left                  : '50%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    marginRight           : '-50%',
                    transform             : 'translate(-50%, -50%)'
                }
            };
            let modalOpen = false;
            if(state.state && state.state.modalsOpen && state.state.modalsOpen.length > 0 ) {
                modalOpen = state.state.modalsOpen.indexOf(item.shipmentId) > -1;
            }
            return (<div className={"shipping-option-single"}>
                <input {...field} key={item.shipmentId} id={item.shipmentId} value={item.rate+"___"+item.shipmentId} name="shippingoption" type="radio"/>
                {item.provider} - {item.serviceLevel} - {item.rate} <button className={"shipping-option-modal-open"} type={"button"} onClick={() => {openModal(state, item.shipmentId)}}><FaInfo/></button>

                {modalOpen ?
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => {closeModal(state, item.shipmentId)}}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <IconContext.Provider value={{size: "1.25em"}}>
                    <button onClick={() => {closeModal(state, item.shipmentId)}} className={"shipping-modal-close-button"}>
                        <FaRegWindowClose/>
                    </button>
                    </IconContext.Provider>
                    <div dangerouslySetInnerHTML={{__html: item.durationTerms}}/>
                </Modal> : ""}
            </div>)
        }
    }

}

export default Checkout