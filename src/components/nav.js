import React from "react"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/login"

export default () => {
    const content = { message: "", login: true }
    if (isLoggedIn()) {
        content.message = `Hello, ${getUser().name}`
    } else {
        content.message = "You are not logged in"
    }
    return (
        <div
            className="nav-root"
        >
            <span className="nav-icon">{content.message}</span>
            <nav className="nav-container">
                <Link className="nav-link" to="/">Home</Link>
                {` `}
                <Link className="nav-link" to="/app/profile">Profile</Link>
                {` `}
                {isLoggedIn() ? (
                    <a
                        className="nav-link"
                        href="/"
                        onClick={event => {
                            event.preventDefault()
                            logout(() => navigate(`/app/login`))
                        }}
                    >
                        Logout
                    </a>
                ) : null}
            </nav>
        </div>
    )
}