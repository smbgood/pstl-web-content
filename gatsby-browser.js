/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import "./src/styles/global.scss"
import "./src/styles/category.scss"
import React from "react"
import {CartProvider} from "./src/components/widget/cart-context"

require('typeface-bad-script')
require('typeface-arima-madurai')
require('typeface-imprima')
require('typeface-courgette')



export const wrapRootElement = ({ element }) => (
    <CartProvider>
        {element}</CartProvider>
)
