import React from "react"

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
    async redirectToCheckout(event, sku, quantity = 1) {
        event.preventDefault()
        const { error } = await this.props.stripe.redirectToCheckout({
            items: [{ sku, quantity }],
            successUrl: `http://localhost:8000/page-2/`,
            cancelUrl: `http://localhost:8000/advanced`,
        })

        if (error) {
            console.warn("Error:", error)
        }
    }

    render() {
        const sku = this.props.sku
        return (
            <div style={cardStyles}>
                <h4>{sku.attributes.name}</h4>
                <p>Price: {formatPrice(sku.price, sku.currency)}</p>
{/*                <img src={sku.image}/>*/}
                <button
                    style={buttonStyles}
                    onClick={event => this.redirectToCheckout(event, sku.id)}
                >
                    BUY ME
                </button>
            </div>
        )
    }
}

export default ShopItem