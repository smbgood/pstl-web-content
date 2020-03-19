import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/page/layout"
import SEO from "../components/page/seo"

class SecondPage extends React.Component{

    componentDidMount() {
        this.clearCart()
    }

    clearCart(){
        localStorage.setItem("b-b-cart", "{}")
    }

    render(){
        return (
            <Layout navImage={this.props.data.navImage.edges[0].node}>
                <SEO title="Order Success" />
                <h1>Thank you for your purchase!</h1>
                <p>You will receive an email shortly with details concerning your purchase. Thank you for shopping with us!</p>
                <Link to="/shope">Go back to the homepage</Link>
            </Layout>
        )
    }
}
export const query=graphql`
    query OurOrderConfirmQuery{
        navImage: allImageSharp(filter: {fluid: {originalName: {eq: "banshee-logo-full.png"}}}) {
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
export default SecondPage
