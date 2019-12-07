import React from "react"
import NavBar from "./nav"
const Layout = ({ children }) => (
    <>
        <NavBar />
        <div className="page-root">
            {children}
        </div>
    </>
)
export default Layout