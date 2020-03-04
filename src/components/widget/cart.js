import React from "react"
import CartContext from "./cart-context";
import {Link} from "gatsby"
import {formatPrice} from "../../utils/shared";

const cardStyles = {
    display: "block",
    textAlign: "center",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
    backgroundColor: "rgba(255,255,255,.2)",
    borderRadius: "6px",
}
const buttonStyles = {
    fontSize: "13px",
    textAlign: "center",
    color: "#fff",
    outline: "none",
    padding: "12px",
    boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
    backgroundColor: "rgb(255, 178, 56)",
    borderRadius: "6px",
    letterSpacing: "1.5px",
}

const Cart = class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CartContext.Consumer>
                {cart => (
                    cart.cart.length > 0 ?
                    <div className={"cart-root"} style={cardStyles}>
                        {this.displayTotalItemsInCart(cart)}
                        <Link to={"/shope/cart"} className={"view-cart-link"}>View Cart</Link>
                    </div> :
                        ""
                )}

            </CartContext.Consumer>
        )
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
                    Cart Total: {formattedPrice}<br/><br/></div>
            )
        }else{
            return ""
        }
    }
}

export default Cart