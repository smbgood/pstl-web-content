import React from "react"
import NavBar from "./nav"
import Footer from "./footer"
const Layout = ({ children }) => (
    <>
        <NavBar />
        <div className="page-root">
            {children}
        </div>
        <Footer />
    </>
)
export default Layout