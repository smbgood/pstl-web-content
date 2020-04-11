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
                <div key={"cart-left-"+item.sku} className={"cart-left"}>{item.name}</div>
                <div key={"cart-mid-"+item.sku} className={"cart-mid"}>{item.qty}</div>
                <div key={"cart-right-"+item.sku} className={"cart-right"}>{formatPrice(item.price, item.currency)}</div>
                <div key={"cart-last-"+item.sku} className={"cart-last"}>{formatPrice((item.price*item.qty), item.currency)}</div>
                <div key={"cart-delete-"+item.sku} className={"cart-delete-item"}><button className={"cart-delete-btn"} onClick={() => {cart.removeFromCart(item.sku, item.qty)}}><FaTrash/></button></div>
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
                        <div className={"cart-page-parent"}>
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

                            </div>
                            <div className={"cart-page-lower"}>
                                <Formik
                                    initialValues={{ firstname: '', lastname: '', email: '', addresslineone: '',
                                        addresslinetwo: '', city: '', state: '', country:'', zip:'', message: '', addressvalid: '', lastaddress: '' }}
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
                                            errors.firstname = 'Please enter your full name';
                                        }
                                        if(!values.addresslineone){
                                            errors.addresslineone = 'Please enter an address to ship to'
                                        }
                                        let enteredAddress = values.addresslineone + "_" + values.addresslinetwo + "_" + values.city + "_" + values.state + "_" + values.country + "_" + values.zip;
                                        if(values.lastaddress){
                                            if(enteredAddress === values.lastaddress){
                                                errors.addresslineone = 'Unable to validate address. Please check and try again.'
                                            }
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
                                            errors.country = 'Please select a country'
                                        }
                                        return errors;
                                    }}
                                    onSubmit={async (values, {setSubmitting, setFieldValue}) => {
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
                                            }).catch((error) => {
                                                if(error.response){
                                                    console.log(error.response);
                                                }else if(error.request){
                                                    console.log(error.request);
                                                }else{
                                                    console.log('error', error);
                                                }
                                                console.log(error.config);
                                                setSubmitting(false)
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
                                            }else{
                                                setFieldValue("lastaddress", values.addresslineone + "_" + values.addresslinetwo + "_" + values.city + "_" + values.state + "_" + values.country + "_" + values.zip, false)
                                                setFieldValue("addressvalid", false, true)
                                                setSubmitting(false)
                                            }
                                        }
                                    }}
                                >
                                    {({ values, touched, isSubmitting}) => (
                                        <Form name="bborder" data-netlify="true" netlify-honeypot="bot-field" method="post" action="/" >
                                            <input type="hidden" name="bot-field"/>
                                            <input type="hidden" name="form-name" value="bborder"/>
                                            <input type="hidden" name="stripe-order-id" value={values.orderId}/>
                                            <h3 className={"form-heading-shipping"}>Shipping Address</h3>
                                            <h4 className={"form-subheading-shipping"}>(US and Canada only, please)</h4>
                                            <div className={"form-field-holder"}>
                                                <Field name="firstname" placeholder="Name"/>
                                                <ErrorMessage name="firstname" render={msg => <div className={"form-error-holder"}>
                                                    <div className={"form-error-msg"}>{msg}</div>
                                                    <div className={"form-error-msg-mobile"}>X</div>
                                                </div>}/>
                                            </div>
                                            <div className={"form-field-holder"}>
                                            <Field type="email" name="email" placeholder="Email" />
                                            <ErrorMessage name="email" render={msg => <div className={"form-error-holder"}>
                                                    <div className={"form-error-msg"}>{msg}</div>
                                                    <div className={"form-error-msg-mobile"}>X</div>
                                                </div>} />
                                            </div>
                                            <div className={"form-field-holder"}>
                                            <Field name="addresslineone" placeholder="Address 1"/>
                                            <ErrorMessage name="addresslineone" render={msg => <div className={"form-error-holder"}>
                                                    <div className={"form-error-msg"}>{msg}</div>
                                                    <div className={"form-error-msg-mobile"}>X</div>
                                                </div>}/>
                                            </div>
                                            <div className={"form-field-holder"}>
                                            <Field name="addresslinetwo" placeholder="Address 2"/>
                                            <ErrorMessage name="addresslinetwo" render={msg =>  <div className={"form-error-holder"}>
                                                    <div className={"form-error-msg"}>{msg}</div>
                                                    <div className={"form-error-msg-mobile"}>X</div>
                                                </div>}/>
                                            </div>
                                            <div className={"city-state-holder"}>
                                                <div className={"fields-row-holder"}>
                                                    <Field name="city" placeholder="City"/>
                                                    <Field name="state" placeholder="State"/>
                                                </div>
                                                <div className={"errors-row-holder"}>
                                                    <ErrorMessage name="city" render={msg => <div className={"form-error-holder"}>
                                                        <div className={"form-error-msg city-msg"}>{msg}</div>
                                                        <div className={"form-error-msg-mobile city-error-msg"}>X</div>
                                                    </div>}/>
                                                    <ErrorMessage name="state" render={msg => <div className={"form-error-holder"}>
                                                        <div className={"form-error-msg state-msg"}>{msg}</div>
                                                        <div className={"form-error-msg-mobile state-error-msg"}>X</div>
                                                    </div>}/>
                                                </div>
                                            </div>
                                            <div className={"country-zip-holder"}>
                                                <div className={"fields-row-holder"}>
                                                    <Field as="select" name="country">
                                                        <option value="">Select a country</option>
                                                        <option value="US">United States</option>
                                                        <option value="CA">Canada</option>
                                                    </Field>
                                                    <Field name="zip" placeholder="Zip"/>
                                                </div>
                                                <div className={"errors-row-holder"}>
                                                    <ErrorMessage name="country" render={msg => <div className={"form-error-holder"}>
                                                        <div className={"form-error-msg country-msg"}>{msg}</div>
                                                        <div className={"form-error-msg-mobile country-error-msg"}>X</div>
                                                    </div>}/>
                                                    <ErrorMessage name="zip" render={msg => <div className={"form-error-holder"}>
                                                        <div className={"form-error-msg zip-msg"}>{msg}</div>
                                                        <div className={"form-error-msg-mobile"}>X</div>
                                                    </div>}/>
                                                </div>
                                            </div>

                                            <ErrorMessage name="firstname" render={msg => <div className={"form-error-holder"}>
                                                <div className={"form-error-btm-msg"}>{msg}</div>
                                            </div>}/>

                                            <ErrorMessage name="email" render={msg => <div className={"form-error-holder"}>
                                                <div className={"form-error-btm-msg"}>{msg}</div>
                                            </div>} />

                                            <ErrorMessage name="addresslineone" render={msg => <div className={"form-error-holder"}>
                                                <div className={"form-error-btm-msg"}>{msg}</div>
                                            </div>}/>

                                            <ErrorMessage name="city" render={msg => <div className={"form-error-holder"}>
                                                <div className={"form-error-btm-msg"}>{msg}</div>
                                            </div>}/>
                                            <ErrorMessage name="state" render={msg => <div className={"form-error-holder"}>
                                                <div className={"form-error-btm-msg"}>{msg}</div>
                                            </div>}/>

                                            <ErrorMessage name="country" render={msg => <div className={"form-error-holder"}>
                                                <div className={"form-error-btm-msg"}>{msg}</div>
                                            </div>}/>
                                            <ErrorMessage name="zip" render={msg => <div className={"form-error-holder"}>
                                                <div className={"form-error-btm-msg"}>{msg}</div>
                                            </div>}/>

                                            {isSubmitting ? <div className="lds-heart">
                                                <div></div>
                                            </div> : <button className="checkout-cart-page-btn" type="submit" disabled={isSubmitting}>
                                                Next
                                            </button>}

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div> : <div className={"cart-page-root"}><h4 className={"cart-items-empty"}>No items currently in cart.</h4></div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default Cart