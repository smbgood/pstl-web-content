import React from "react"

const cardStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
    backgroundColor: "#fff",
    borderRadius: "6px",
    maxWidth: "300px",
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

const Category = class extends React.Component {
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
        const category = this.props.category
        function getProductById(id, products) {
            if(products && products.edges) {
                for (const edge of products.edges) {
                    if (edge.node.id === id) {
                        return edge.node
                    }
                }
            }
            return null
        }
        function getName(result){
            if(result && result.name){
                return result.name
            }
            return ""
        }
        function getDescription(result){
            if(result && result.description){
                return result.description
            }
            return ""
        }
        return (
            <div style={cardStyles} id={category.id + "-key"}>
                <h4 id={category.id + "-title"}>{category.id}</h4>
                {category.products.map( (product) => (
                    <React.Fragment key={product}>
                        <a href={"/" + product} id={product + "-link"}>{getName(getProductById(product, this.props.products))}</a>
                        <p id={product + "-desc"}>{getDescription(getProductById(product, this.props.products))}</p>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default Category