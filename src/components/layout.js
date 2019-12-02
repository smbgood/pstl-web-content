import React from "react"
import NavBar from "./nav"
const Layout = ({ children }) => (
    <>
        <NavBar />
        {children}
    </>
)
export default Layout