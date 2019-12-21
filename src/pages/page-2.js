import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Order Success" />
    <h1>Thank you for your purchase!</h1>
    <p>You will receive an email shortly with details concerning your purchase. Thank you for shopping with us!</p>
    <Link to="/app/shop">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
