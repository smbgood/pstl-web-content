import React from "react"

const defaultState = {
    hasItems: false,
    itemSet: [],
    addToCart: () => {},
    removeFromCart: () => {},
    getCartItemsTotal: () => {}
}
const CartContext = React.createContext(defaultState)

class CartProvider extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        hasItems: false,
        itemSet: []
    }
    addToCart = (item, qty, price, currency) => {
        let contents = localStorage.getItem("b-b-cart")
        if(contents != null && contents !== ""){
            let input = JSON.parse(contents)
            let incremented = false
            let outArray = []
            for( let cartItem of input){
                if(cartItem.sku === item){
                    cartItem.qty = parseInt(cartItem.qty) + parseInt(qty)
                    incremented = true
                }
                outArray.push(cartItem)
            }
            if(!incremented){
                outArray.push({
                    sku:item,
                    qty:qty,
                    price:price,
                    currency:currency
                })
            }
            localStorage.setItem("b-b-cart", JSON.stringify(outArray))
            this.setState({itemSet:outArray, hasItems:outArray.length > 0})
        }else{
            let init_cart = [{
                sku: item,
                qty: qty,
                price:price,
                currency:currency
            }]
            localStorage.setItem("b-b-cart", JSON.stringify(init_cart))
            this.setState({itemSet:init_cart, hasItems:true})
        }
    }

    removeFromCart = (item, qty) => {
        let contents = localStorage.getItem("b-b-cart")
        if(contents != null && contents !== "") {
            let input = JSON.parse(contents)
            let outArray = []
            for (let cartItem of input) {
                if(cartItem.sku === item){
                    if(cartItem.qty > qty){
                        cartItem.qty = parseInt(cartItem.qty) - parseInt(qty)
                        if(cartItem.qty < 0){
                            cartItem.qty = 0
                        }
                        outArray.push(cartItem)
                    }else{
                        //do not push to array since qty is now 0
                    }
                }else{
                    outArray.push(cartItem)
                }
            }
            localStorage.setItem("b-b-cart", JSON.stringify(outArray))
            this.setState({itemSet:outArray, hasItems:outArray.length > 0})
        }
    }

    getCartItemsTotal(){
        let total = 0
        let contents = localStorage.getItem("b-b-cart")
        if(contents != null && contents !== "") {
            let input = JSON.parse(contents)
            for (let item of input) {
                if(item.qty > 0 && item.price) {
                    total += (item.qty * item.price)
                }
            }
        }
        return total
    }

    componentDidMount() {
        let contents = localStorage.getItem("b-b-cart")
        if(contents != null && contents !== "") {
            let input = JSON.parse(contents)
            let outArray = []
            for (let item of input) {
                outArray.push(item)
            }
            this.setState({itemSet:outArray, hasItems:true})
        }
    }

    render() {
        let { children } = this.props
        return (
            <CartContext.Provider
                value={{
                    cart: this.state.itemSet,
                    addToCart: this.addToCart,
                    removeFromCart: this.removeFromCart,
                    getCartItemsTotal: this.getCartItemsTotal
                }}
            >
                {children}
            </CartContext.Provider>
        )
    }
}
export default CartContext
export { CartProvider }