import React from "react"
import { graphql, Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/login"

import Layout from "../components/page/layout"

export default ({data}) => (
    <Layout navImage={data.navImage.edges[0].node}>
        {/*<h1>Hello {isLoggedIn() ? getUser().name : "world"}!</h1>
        <p>
            {isLoggedIn() ? (
                <>
                    You are logged in, so check your{" "}
                    <Link to="/shope/profile">profile</Link>
                </>
            ) : (
                <>
                    You should <Link to="/shope/login">log in</Link> to see restricted
                    content
                </>
            )}
        </p>*/}
        <h1 className="center-splash">Welcome to Banshee Babe Boutique!</h1>
    </Layout>
)
export const query=graphql`
    query OurIndexQuery{
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