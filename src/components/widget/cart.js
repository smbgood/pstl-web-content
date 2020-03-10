import React from "react"
import CartContext from "./cart-context";
import {Link} from "gatsby"
import {formatPrice} from "../../utils/shared";

const Cart = class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CartContext.Consumer>
                {cart => (
                    cart != null && cart.cart != null && cart.cart.length > 0 ?
                        (!this.checkIfShouldClear(cart) && this.okToDisplay() ?
                            <div className={"cart-root"} >
                                {this.displayTotalItemsInCart(cart)}
                                <Link to={"/shope/cart"} className={"view-cart-link"}>View Cart</Link>
                            </div>
                        : "")
                    : ""
                )}

            </CartContext.Consumer>
        )
    }

    okToDisplay(){
        if(window != null && window.location.pathname === "/shope/cart"){
            return false
        }
        return true
    }

    displayTotalItemsInCart(cart) {
        let totalCount = 0
        let currency = null
        for(let cartItem of cart.cart){
            currency = cartItem.currency
            if(cartItem.qty > 0){
                totalCount += parseInt(cartItem.qty)
            }
        }
        if(currency) {
            let formattedPrice = formatPrice(cart.getCartItemsTotal(), currency)
            return (
                <div className={"cart-widget-total-count"}>{totalCount} items in cart <br/>
                    Cart Total: {formattedPrice}</div>
            )
        }else{
            return ""
        }
    }

    checkIfShouldClear(cart) {
        if(window != null && window.location.pathname === "/page-2"){
            cart.resetCart()
            return true
        }
        return false
    }
}

export default Cart