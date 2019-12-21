import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/login"
import Collage from "../components/collage"
import SEO from "../components/seo";
import Shop from "../components/shop";

const App = () => (
    <Layout>
        <SEO title="Advanced Example" />
        <Router>
            <PrivateRoute path="/app/profile" component={Profile} />
            <Login path="/app/login" />
            <Collage path="/app/collage" />
            <Shop path="/app/shop" />
        </Router>
    </Layout>
)

export default App