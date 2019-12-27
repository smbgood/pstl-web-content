import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../../services/login"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isLoggedIn() && location.pathname !== `/shope/login`) {
        navigate("/shope/login")
        return null
    }

    return <Component {...rest} />
}

export default PrivateRoute