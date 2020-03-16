import React, { Component } from 'react'

import "../../styles/checkout.scss"
import {formatPrice} from "../../utils/shared";
import CartContext from "../widget/cart-context";
import {FaTrash} from "react-icons/fa"
import qs from "querystring";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";

String.prototype.removeCharAt = function (i) {
    let tmp = this.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}

class Checkout extends Component {

    state = {
        stripe: null,
    }
    componentDidMount() {
        /*const stripe = window.Stripe("pk_live_OGxNOUzWvpoUJS3yscyZ6Ccw00ukIopzD4")*/
        const stripe = window.Stripe("pk_test_4xqQzlAyU2e9MJ2h9P1SapFe00K4jXy6Rk")
        this.setState({ stripe: stripe })

    }

    async doCheckout(cart, stripe){
        let outItems = []
        for(let cartItem of cart){
            let sku = cartItem.sku
            let qty = cartItem.qty
            let obj = {sku: sku, quantity:qty}
            outItems.push(obj)
        }
        //make request to stripe
        const { error } = await stripe.redirectToCheckout({
            items: outItems,
            successUrl: `https://www.bansheebabe.com/page-2/`,
            cancelUrl: `https://www.bansheebabe.com/shope/checkout`,
            billingAddressCollection:`required`,
            clientReferenceId: this.state.orderId,
        })

        if (error) {
            console.warn("Error:", error)
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
                                    }
                                }
                                onSubmit={(values, { setSubmitting }) => {
                                    if(values && values.cart != null){
                                        //need to post to our OMS so we can start fufillment, then redirectToCheckout

                                    }

                                }}
                            >
                                {({ values, touched, isSubmitting}) => (
                                    <Form name="bborder" data-netlify="true" netlify-honeypot="bot-field" method="post" action="/" >
                                        <input type="hidden" name="bot-field"/>
                                        <input type="hidden" name="form-name" value="bborder"/>
                                        <input type="hidden" name="stripe-order-id" value={values.orderId}/>
                                        <br/>
                                        <br/>
                                        <Field name="firstname" placeholder="Name" disabled/>
                                        <br/>
                                        <Field type="email" name="email" placeholder="Email" disabled/>
                                        <br/>
                                        <Field name="addresslineone" placeholder="Address 1" disabled/>
                                        <br/>
                                        <Field name="addresslinetwo" placeholder="Address 2" disabled/>
                                        <br/>
                                        <Field name="city" placeholder="City" disabled/>
                                        <Field name="state" placeholder="State" disabled/>
                                        <br/>
                                        <Field name="zip" placeholder="Zip" disabled/>
                                        <br/>
                                        <Field as="select" name="country" disabled>
                                            <option value="">Select a country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                        </Field>
                                        <br/>

                                        <Field as="select" name="shippingoption">
                                            <option value="">Select a shipping method</option>
                                            {values.shipping != null ? values.shipping.map( item =>{
                                                return item != null ? this.showShippingOptions(item) : ""
                                            }) : ""}
                                        </Field>
                                        <ErrorMessage name="shippingoption" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>

                                        <Field name="message" component="textarea" placeholder="Message" />
                                        <ErrorMessage name="message" render={msg => <div className={"form-error-msg"}>{msg}</div>} />
                                        <br/>

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

                                        {values.shippingoption != null && "Shipping: " + values.shippingoption}

                                        <div className={"cart-row-item cart-total-line"}>
                                            <div className={"cart-left"}/>
                                            <div className={"cart-mid"}/>
                                            <div className={"cart-right"}/>
                                            <div className={"cart-last"}>GRAND TOTAL:
                                                {values.cart != null && values.cart.length > 0 && values.formatPrice(parseInt(values.shippingoption.removeCharAt(values.shippingoption.indexOf(".")+1)) + parseInt(values.cart.reduce(function(acc, val){ return acc + (val.qty * val.price)}, 0)),
                                                    values.cart[0].currency)}
                                            </div>
                                        </div>

                                        <button className="order-form-submit" type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div> : ""
                )}
            </CartContext.Consumer>
        )
    }

    showShippingOptions(item) {
        if(item != null && item.provider) {
            return (<option key={item.shipmentId} id={item.shipmentId} value={item.rate}>{item.provider} - {item.serviceLevel} - {item.rate}</option>)
        }
    }

}

export default Checkout