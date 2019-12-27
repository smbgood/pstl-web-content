import React from "react"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../../services/login"

export default () => {
    const content = { message: "", login: true }
    if (isLoggedIn()) {
        content.message = `Hello, ${getUser().name}`
    } else {
        content.message = ""
    }
    return (
        <div
            className="nav-root"
        >
            <span className="nav-icon">{content.message}</span>
            <nav className="nav-container">
                <Link className="nav-link" to="/">Home</Link>
                {` `}
                <Link className="nav-link" to="/shope/blog">Blog</Link>
                {` `}
                <Link className="nav-link" to="/shope/categories">Shop</Link>
                {` `}
                {isLoggedIn() ? (
                    <a
                        className="nav-link"
                        href="/"
                        onClick={event => {
                            event.preventDefault()
                            logout(() => navigate(`/shope/login`))
                        }}
                    >
                        Logout
                    </a>
                ) : null}
            </nav>
        </div>
    )
}