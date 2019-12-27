import React from "react"
import { Link } from "gatsby"

import Layout from "../components/page/layout"
import SEO from "../components/page/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Order Success" />
    <h1>Thank you for your purchase!</h1>
    <p>You will receive an email shortly with details concerning your purchase. Thank you for shopping with us!</p>
    <Link to="/shope/shop">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
