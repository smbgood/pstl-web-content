import React from "react"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/login"

import Layout from "../components/page/layout"

export default () => (
  <Layout>
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
    <h1 className="center-splash">We're Sorry -- Monsters Ate Your Page</h1>
  </Layout>
)