import React, { Component } from 'react'

import "../../styles/cart.scss"
import {formatPrice} from "../../utils/shared";
import CartContext from "../widget/cart-context";

class Cart extends Component {

    doOutput(item){
        return (
            <div className={"cart-row-item"}>
                <div className={"cart-left"}>{item.sku}</div>
                <div className={"cart-mid"}>{item.qty}</div>
                <div className={"cart-right"}>{formatPrice(item.price, item.currency)}</div>
                <div className={"cart-last"}>{formatPrice((item.price*item.qty), item.currency)}</div>

            </div>
        )
    }

    render() {
        return (
            <CartContext.Consumer>
                {cart => (
                    cart != null && cart.cart != null ?
                    <div className={"cart-root"} >
                        <div className={"cart-row-item cart-header-item"}>
                            <div className={"cart-left"}>SKU</div>
                            <div className={"cart-mid"}>QTY</div>
                            <div className={"cart-right"}>PRICE</div>
                            <div className={"cart-last"}>TOTAL</div>
                        </div>

                        {cart.cart.map( item => (
                            item != null && item.qty > 0 ? this.doOutput(item) : ""
                        ))}

                        {this.doTotal(cart.cart)}

                    </div> : ""
                )}
            </CartContext.Consumer>
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
                    <div className={"cart-left"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div className={"cart-mid"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div className={"cart-right"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div className={"cart-last"}> GRAND TOTAL:{formatPrice(total, currency)}</div>
                </div>
            )
        }

    }
}

export default Cart