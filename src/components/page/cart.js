import React, { Component } from 'react'

import "../../styles/cart.scss"
import {formatPrice} from "../../utils/shared";
import CartContext from "../widget/cart-context";
import {FaTrash} from "react-icons/fa"

class Cart extends Component {

    state = {
        stripe: null,
    }
    componentDidMount() {
        const stripe = window.Stripe("pk_live_OGxNOUzWvpoUJS3yscyZ6Ccw00ukIopzD4")
        /*const stripe = window.Stripe("pk_test_4xqQzlAyU2e9MJ2h9P1SapFe00K4jXy6Rk")*/
        this.setState({ stripe })
    }

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
            cancelUrl: `https://www.bansheebabe.com/shope/cart`,
            billingAddressCollection:`required`,
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
                    <div className={"cart-last"}> GRAND TOTAL:{formatPrice(total, currency)}</div>
                </div>
            )
        }

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

                        {cart.cart.length > 0 ? <button className={"checkout-cart-page-btn"} onClick={() => {this.doCheckout(cart.cart, this.state.stripe)}}>Checkout</button> : ""}

                    </div> : ""
                )}
            </CartContext.Consumer>
        )
    }
}

export default Cart