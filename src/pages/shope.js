import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/page/layout"
/*import PrivateRoute from "../components/old/privateRoute"
import Profile from "../components/old/profile"
import Login from "../components/old/login"*/
import Collage from "../components/old/collage"
import SEO from "../components/page/seo";
import Shop from "../components/shop";
import Categories from "../components/categories";
import Blog from "../components/blog"
import Home from "../components/page/home"

const Shope = () => (
    <Layout>
        <SEO title="Banshee Babe Boutique | Trinkets, Odds & Ends" />
        <Router>
{/*            <PrivateRoute path="/shope/profile" component={Profile} />
            <Login path="/shope/login" />*/}
            <Collage path="/shope/collage" />
            <Shop path="/shope/shop" />
            <Categories path="/shope/categories"/>
            <Blog path="/shope/blog"/>
            <Home path="/shope"/>
        </Router>
    </Layout>
)

export default Shope