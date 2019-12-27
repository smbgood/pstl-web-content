import React from "react"

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

    componentDidMount() {

    }

    render() {
        if(typeof(window) !== "undefined") {
            const category = this.props.category

            function getProductById(id, products) {
                if (products && products.edges) {
                    for (const edge of products.edges) {
                        if (edge.node.id === id) {
                            return edge.node
                        }
                    }
                }
                return null
            }

            function getName(result) {
                if (result && result.name) {
                    return result.name
                }
                return ""
            }

            function getDescription(result) {
                if (result && result.description) {
                    return result.description
                }
                return ""
            }

            return (
              <div className="category-root" id={category.id + "-key"}>
                  <h4 className="category-title" id={category.id + "-title"}>{category.name}</h4>
                  <ul className="collapsible expandable category-holder">
                      {category.products.map((product) => (
                        <React.Fragment key={category.id + "-" + product}>
                            <li>
                                <div className="collapsible-header">
                                    <a href={"/" + product}
                                       id={category.id + "-" + product + "-link"}>{getName(getProductById(product, this.props.products))}</a>
                                </div>
                                <div className="collapsible-body">
                                    <div id={"dropdown" + category.id + "-" + product}>
                                        <p
                                          id={category.id + "-" + product + "-desc"}>{getDescription(getProductById(product, this.props.products))}</p>
                                    </div>
                                </div>
                            </li>
                        </React.Fragment>
                      ))}
                  </ul>
              </div>
            )
        }
        return null
    }
}

export default Category