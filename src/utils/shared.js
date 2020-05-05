
export const formatPrice = (amount, currency) => {
    let price = (parseInt(amount) / 100).toFixed(2)
    let numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    })
    return numberFormat.format(price)
}

export const getStripeProductFromSku = (id, products) => {
    if(id && products && products.nodes){
        for(let i=0; i< products.nodes.length; i++){
            let product = products.nodes[i]
            if(product && product.id){
                if(product.id === id){
                    return product
                }
            }
        }
    }
}

export const getPriceForStripeSku = (id, products) => {
    if(id && products){
        let product = getStripeProductFromSku(id, products)
        if(product && product.price){
            return product.price
        }
    }
    return 0
}

export const getCurrencyForStripeSku = (id, products) => {
    if(id && products){
        let product = getStripeProductFromSku(id, products)
        if(product && product.currency){
            return product.currency
        }
    }
    return "usd"
}