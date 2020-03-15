import React, { Component } from 'react'

import "../../styles/checkout.scss"
import {formatPrice} from "../../utils/shared";
import CartContext from "../widget/cart-context";
import {FaTrash} from "react-icons/fa"
import qs from "querystring";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";

class Checkout extends Component {

    state = {
        stripe: null,
        orderId: "",
    }
    componentDidMount() {
        /*const stripe = window.Stripe("pk_live_OGxNOUzWvpoUJS3yscyZ6Ccw00ukIopzD4")*/
        const stripe = window.Stripe("pk_test_4xqQzlAyU2e9MJ2h9P1SapFe00K4jXy6Rk")
        const orderId = this.createOrderId()
        this.setState({ stripe: stripe, orderId: orderId })
    }

    doOutput(item, cart){
        return (
            <div key={item.name + "-cart-item"} className={"cart-row-item"}>
                <div className={"cart-left"}>{item.name}</div>
                <div className={"cart-mid"}>{item.qty}</div>
                <div className={"cart-right"}>{formatPrice(item.price, item.currency)}</div>
                <div className={"cart-last"}>{formatPrice((item.price*item.qty), item.currency)}</div>
                <div className={"cart-delete-item"}><button onClick={() => {cart.removeFromCart(item.sku, item.qty)}}><FaTrash/></button></div>
            </div>
        )
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

    doTotal(cart) {
        let total = 0
        let currency = null
        for(let cartItem of cart){
            total += (cartItem.qty * cartItem.price)
            currency = cartItem.currency
        }
        if(currency){
            return(
                <div className={"cart-row-item cart-total-line"}>
                    <div className={"cart-left"}/>
                    <div className={"cart-mid"}/>
                    <div className={"cart-right"}/>
                    <div className={"cart-last"}> GRAND TOTAL:{formatPrice(total, currency)}</div>
                </div>
            )
        }

    }

    calcShipping(){
        //do call
        console.log("http call")
    }

    render() {
        return (
            <CartContext.Consumer>
                {cart => (
                    cart != null && cart.cart != null ?
                        <div className={"cart-page-root"} >
                            <div className={"cart-row-item cart-header-item"}>
                                <div className={"cart-left header"}>Item</div>
                                <div className={"cart-mid header"}>Amount</div>
                                <div className={"cart-right header"}>Price ($)</div>
                                <div className={"cart-last header"}>Total</div>
                            </div>

                            {cart.cart.map( item => (
                                item != null && item.qty > 0 ? this.doOutput(item, cart) : ""
                            ))}

                            {this.doTotal(cart.cart)}

                            <Formik
                                initialValues={{ firstname: '', lastname: '', email: '', addresslineone: '', addresslinetwo: '', city: '', state: '', country:'', zip:'', message: '', cart: cart, shipping: null }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Email required';
                                    }else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }

                                    if(!values.firstname){
                                        errors.firstname = 'Please enter your first name';
                                    }
                                    if(!values.addresslineone){
                                        errors.addresslineone = 'Please enter an address to ship to'
                                    }
                                    if(!values.city){
                                        errors.city  = 'Please enter a city'
                                    }
                                    if(!values.state){
                                        errors.state = 'Please enter a state'
                                    }
                                    if(!values.zip){
                                        errors.zip = 'Please enter a zip code'
                                    }
                                    if(!values.country){
                                        errors.country = 'Please enter a country'
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    if(values && values.cart != null){
                                        //validate address before we allow submit:
                                        let addressValues = {}
                                        addressValues["name"] = values["firstname"]
                                        addressValues["street1"] = values["addresslineone"]
                                        addressValues["city"] = values["city"]
                                        addressValues["state"] = values["state"]
                                        addressValues["zip"] = parseInt(values["zip"])
                                        addressValues["country"] = values["country"]
                                        addressValues["validate"] = true

                                        let url = "http://localhost:9090/banshee/addr?" + qs.stringify(addressValues)
                                        axios.get(url).then(response => {
                                            //if valid, show them how much to ship,
                                            if(response && response.data) {
                                                if(response.data.rates && response.data.rates.length > 0){
                                                    values.shipping = response.data.rates;
                                                    setSubmitting(false)
                                                }
                                            }
                                            //if not valid, pop up an error next to address and do not allow form submit
                                        })

                                        /*axios.post("http://localhost:9090/banshee/addr",
                                            addressValues, {headers:{"Access-Control-Allow-Origin":"http://localhost:8000"}}).then(response => {
                                            console.log(response)
                                        })*/


                                        /*//need to initiate authorization with shippo before we can make this call to our endpoint
                                        axios.post("http://localhost:9090/addresses/", addressValues,
                                            {headers:  {"Authorization" : "Authorized",
                                                    "Content-Type": "application/json"}} ).then(response => {
                                            if(response && response.data){
                                                let validationResult = response.data["validation_results"]
                                                if(validationResult){
                                                    let isValid = validationResult["is_valid"] === true
                                                    if(isValid === true) {
                                                        values["form-name"] = "bborder"
                                                        let post_values = qs.stringify(values)
                                                        axios.post("/orderinfo", post_values, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                                                            .then(response => {
                                                                this.doCheckout(values.cart.cart, this.state.stripe)
                                                            }).catch(error => {
                                                            console.log("Error with order form submit: " + error)
                                                            }
                                                        )

                                                    }
                                                    setSubmitting(false);
                                                }
                                            }

                                        }).catch(error => {
                                            console.log("error with input")
                                            setSubmitting(false);
                                        })*/
                                    }

                                }}
                            >
                                {({ values, touched, isSubmitting}) => (
                                    <Form name="bborder" data-netlify="true" netlify-honeypot="bot-field" method="post" action="/" >
                                        <input type="hidden" name="bot-field"/>
                                        <input type="hidden" name="form-name" value="bborder"/>
                                        <input type="hidden" name="stripe-order-id" value={this.state.orderId}/>
                                        <br/>
                                        <br/>
                                        <h3 className={"form-heading-shipping"}>Shipping Address</h3>
                                        <h4 className={"form-subheading-shipping"}>(US and Canada only, please)</h4>
                                        <Field name="firstname" placeholder="Name"/>
                                        <ErrorMessage name="firstname" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>
                                        <Field type="email" name="email" placeholder="Email" />
                                        <ErrorMessage name="email" render={msg => <div className={"form-error-msg"}>{msg}</div>} />
                                        <br/>
                                        <Field name="addresslineone" placeholder="Address 1"/>
                                        <ErrorMessage name="addresslineone" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>
                                        <br/>
                                        <Field name="addresslinetwo" placeholder="Address 2"/>
                                        <ErrorMessage name="addresslinetwo" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>
                                        <br/>
                                        <Field name="city" placeholder="City"/>
                                        <ErrorMessage name="city" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>
                                        <Field name="state" placeholder="State"/>
                                        <ErrorMessage name="state" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>
                                        <br/>
                                        <Field name="zip" placeholder="Zip"/>
                                        <ErrorMessage name="zip" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>
                                        <br/>
                                        <Field as="select" name="country">
                                            <option value="">Select a country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                        </Field>
                                        <ErrorMessage name="country" render={msg => <div className={"form-error-msg"}>{msg}</div>}/>
                                        <br/>

                                        <Field as="select" name="shipping-option">
                                            <option value="">Select a shipping method</option>
                                            {values.shipping != null ? values.shipping.map( item =>{
                                                return item != null ? this.showShippingOptions(item) : ""
                                            }) : ""}
                                        </Field>

                                        <Field name="message" component="textarea" placeholder="Message" />
                                        <ErrorMessage name="message" render={msg => <div className={"form-error-msg"}>{msg}</div>} />
                                        <br/>

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
            return (<option value={item.shipmentId}>{item.provider} - {item.serviceLevel} - {item.rate}</option>)
        }
    }


    createOrderId() {
        return 'order_' + Math.random().toString(36).substr(2, 9);
    }
}

export default Checkout