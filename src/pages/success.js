import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"


export default function Success() {
  return (
    <Layout >
      <SEO title="Contact Submit Success" />
      <div className={"ultimate-center contact-success"}>
        <h1>Thank you for your contact request!</h1>
        <p className={"back-to-you-text"}>We will get back to you as soon as possible!</p>
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}
