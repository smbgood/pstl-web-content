import React, { Component } from 'react'

import "../../styles/cart.scss"
import {formatPrice} from "../../utils/shared";
import CartContext from "../widget/cart-context";
import {FaTrash} from "react-icons/fa"
import qs from "querystring";
import axios from "axios";
import { navigate } from "@reach/router"
import {ErrorMessage, Field, Form, Formik} from "formik";

class Cart extends Component {

    doOutput(item, cart){
        return (
            <div className={"cart-row-item"}>
                <div className={"cart-left"}>{item.name}</div>
                <div className={"cart-mid"}>{item.qty}</div>
                <div className={"cart-right"}>{formatPrice(item.price, item.currency)}</div>
                <div className={"cart-last"}>{formatPrice((item.price*item.qty), item.currency)}</div>
                <div className={"cart-delete-item"}><button className={"cart-delete-btn"} onClick={() => {cart.removeFromCart(item.sku, item.qty)}}><FaTrash/></button></div>
            </div>
        )
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
                    <div className={"cart-last subtotal-line"}> Subtotal:{formatPrice(total, currency)}</div>
                </div>
            )
        }

    }

    render() {
        return (
            <CartContext.Consumer>
                {cart => (
                    cart != null && cart.cart != null && cart.cart.length > 0 ?
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
                            initialValues={{ firstname: '', lastname: '', email: '', addresslineone: '',
                                addresslinetwo: '', city: '', state: '', country:'', zip:'', message: '' }}
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
                                }else{
                                    if(values.state.length > 2){
                                        errors.state = 'Please use 2 letter abbreviation'
                                    }
                                }
                                if(!values.zip){
                                    errors.zip = 'Please enter a zip code'
                                }
                                if(!values.country){
                                    errors.country = 'Please enter a country'
                                }
                                return errors;
                            }}
                            onSubmit={async (values, {setSubmitting}) => {
                                if (cart != null) {
                                    //validate address before we allow submit:
                                    let addressValues = {}
                                    addressValues["name"] = values["firstname"]
                                    addressValues["email"] = values["email"]
                                    addressValues["street1"] = values["addresslineone"]
                                    addressValues["street2"] = values["addresslinetwo"]
                                    addressValues["city"] = values["city"]
                                    addressValues["state"] = values["state"]
                                    addressValues["zip"] = parseInt(values["zip"])
                                    addressValues["country"] = values["country"]
                                    addressValues["validate"] = true
                                    let responseData = null
                                    let orderId = ""
                                    let url = "https://richornot.com/banshee/addr?" + qs.stringify(addressValues)
                                    await axios.get(url).then(response => {
                                        setSubmitting(false)
                                        //if valid, show them how much to ship,
                                        if (response && response.data) {
                                            if (response.data.rates && response.data.rates.length > 0) {
                                                //values.shipping = response.data.rates;
                                                responseData = response.data.rates
                                            }
                                            if(response.data.orderId){
                                                orderId = response.data.orderId;
                                            }
                                        }
                                        //if not valid, pop up an error next to address and do not allow form submit
                                    })
                                    if(responseData){
                                        let state = {
                                            rates: responseData,
                                            address: addressValues,
                                            orderId: orderId,
                                            beepBoop: cart.cart,
                                        }
                                        navigate(`/shope/checkout`, {
                                            state: state
                                        })
                                    }
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


                                    <button className="checkout-cart-page-btn" type="submit" disabled={isSubmitting}>
                                        Next
                                    </button>
                                </Form>
                            )}
                        </Formik>

                    </div> : <div className={"cart-page-root"}><h4 className={"cart-items-empty"}>No items currently in cart.</h4></div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default Cart