
export const formatPrice = (amount, currency) => {
    let price = (parseInt(amount) / 100).toFixed(2)
    let numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    })
    return numberFormat.format(price)
}

export const getProductValue = (id, products, valueToGet) => {
    if(id && products && valueToGet){
        let product = getProductById(id, products)
        if(product && product[valueToGet]){
            return product[valueToGet];
        }
    }
    return "";
}

export const getProductName = (id, products) => {
    return getProductValue(id, products, "name");
}

export const getProductPrice = (id, products) => {
    let retVal = getProductValue(id, products, "price");
    if(retVal){
        return retVal
    }else{
        return 0
    }
}

export const getProductCurrency = (id, products) => {
    let retVal = getProductValue(id, products, "currency");
    if(retVal){
        return retVal
    }else{
        return "usd"
    }
}

export const getProductImage = (id, products) => {
    return getProductValue(id, products, "image")
}

export const getProductDetailImages = (id, products) => {
    return getProductValue(id, products, "detail_images")
}

export const getProductById = (id, products) => {
    if (products && products.nodes) {
        for (const product of products.nodes) {
            if (product && product.sku) {
                if (product.sku === id) {
                    return product
                }
            }
        }
    }
    return null
}