import React from "react"
import CartContext from "./widget/cart-context";

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

const otherButtonStyles = {
    fontSize: "13px",
    textAlign: "center",
    color: "#fff",
    outline: "none",
    padding: "6px",
    boxShadow: "1px 2px 5px rgba(0,0,0,.1)",
    backgroundColor: "rgb(255, 18, 56)",
    borderRadius: "6px",
    letterSpacing: "1.5px",
}

const formatPrice = (amount, currency) => {
    let price = (amount / 100).toFixed(2)
    let numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    })
    return numberFormat.format(price)
}

const ShopItem = class extends React.Component {
    state = {
        amountToAdd: 0
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
        })
    }

    resetAmounts(){
        this.setState({amountToAdd:0})
    }

    displayQuantityInCart(cart, id){
        for( let cartItem of cart){
            if(cartItem.sku === id){
                return (<div key={"qty-cart-count"} className={"existing-cart-count"}>{cartItem.qty} in cart</div>)
            }
        }
        return (<div key={"0-cart-count"} className={"existing-cart-count"}>0 in cart</div>)
    }

    increaseInputQuantity(){
        let increased = this.state.amountToAdd + 1;
        this.setState({amountToAdd:increased})
    }

    decreaseInputQuantity(){
        if(this.state.amountToAdd === 0)
            return
        let decreased = this.state.amountToAdd - 1;
        this.setState({amountToAdd:decreased})
    }

    render() {
        const sku = this.props.sku
        return (
            <CartContext.Consumer>
                {cart => (
                    cart != null && cart.cart != null ?
                    <div style={cardStyles}>
                        <p key={"shop-item-price-disp"}>Price: {formatPrice(sku.price, sku.currency)}</p>
                        <button key={"shop-item-amt-increase"} style={otherButtonStyles}
                                onClick={() => {this.increaseInputQuantity();}}>+</button>
                        <button key={"shop-item-amt-decrease"} style={otherButtonStyles}
                                onClick={() => {this.decreaseInputQuantity();}}>-</button>
                        <input key={"shop-item-amt-input"} type="number" min="0" name="amountToAdd" value={this.state.amountToAdd}
                               onChange={this.handleInputChange}/>
                        <button key={"shop-item-add-cart"} style={buttonStyles}
                                onClick={() => {cart.addToCart(sku.id, this.state.amountToAdd, sku.price, sku.currency, sku.product.name); this.resetAmounts();}}>
                            ADD TO CART
                        </button>
                        <button key={"shop-item-remove-cart"} style={buttonStyles}
                                onClick={() => {cart.removeFromCart(sku.id, this.state.amountToAdd); this.resetAmounts();}}>
                            REMOVE FROM CART
                        </button>
                        {this.displayQuantityInCart(cart.cart, sku.id)}
                    </div> : ""
                )}
            </CartContext.Consumer>

        )
    }
}

export default ShopItem