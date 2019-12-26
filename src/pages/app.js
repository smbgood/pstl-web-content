import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/login"
import Collage from "../components/collage"
import SEO from "../components/seo";
import Shop from "../components/shop";
import Categories from "../components/categories";
import Blog from "../components/blog"

const App = () => (
    <Layout>
        <SEO title="Advanced Example" />
        <Router>
            <PrivateRoute path="/app/profile" component={Profile} />
            <Login path="/app/login" />
            <Collage path="/app/collage" />
            <Shop path="/app/shop" />
            <Categories path="/app/categories"/>
            <Blog path="/app/blog"/>
        </Router>
    </Layout>
)

export default App