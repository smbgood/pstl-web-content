import React from "react";
import Img from "gatsby-image"
import "../../styles/welcome.scss"
import { Link } from "gatsby"

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

                <div className={"welcome-root"}>
                    <div className={"welcome-section"}>
                        <div className={"welcome-image"}>
                            {/*<Img fluid={this.props.welcomeInfo.image.fluid} alt={"Welcome Image"}>
                            </Img>*/}
                            <div className={"welcome-overlay"}>
                                <div className={"welcome-top"}>
                                    Welcome to davesbarrels.com! Please mind the mess as we are undergoing construction,
                                </div>
                                <div className={"welcome-bottom"}>
                                    however, you can still <Link className={"welcome-link"} to={"/shope/categories"}>preorder in the shop</Link> or <Link className={"welcome-link"} to={"/shope/contact"}>get in contact with us</Link> while we are building!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Welcome