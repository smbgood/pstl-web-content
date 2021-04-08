import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"

class OrderSuccessPage extends React.Component{
    componentDidMount() {
        this.clearCart()
    }

    clearCart(){
        localStorage.removeItem("b-b-cart")
    }

    render(){
        return (
            <Layout navImage={this.props.data.navImage.edges[0].node}>
                <SEO title="Order Submit Success" />
                <div className={"ultimate-center"}>
                    <h1>Thank you for your order!</h1>
                    <p className={"back-to-you-text"}>We will get back to you as soon as (unearthly) possible!</p>
                    <Link className={"back-home-link"} to="/shope">Go back to the homepage</Link>
                </div>
            </Layout>
        )
    }
}
export const query=graphql`
    query OrderSuccessQuery{
        navImage: allImageSharp(filter: {fluid: {originalName: {eq: "pstl-logo.png"}}}) {
            edges {
                node {
                    id
                    fluid(maxWidth: 500, quality: 100) {
                        ...GatsbyImageSharpFluid
                        originalName
                    }
                }
            }
        }
    }
`
export default OrderSuccessPage
