import React from "react"

import Layout from "../components/page/layout"
import SEO from "../components/page/seo"

import Shop from "../components/shop";

const AdvancedExamplePage = () => (
    <Layout>
        <SEO title="Shop Page" />
        <Shop />
    </Layout>
)

export default AdvancedExamplePage