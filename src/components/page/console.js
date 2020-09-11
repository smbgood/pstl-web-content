import React from "react";
import Img from "gatsby-image"
import "../../styles/welcome.scss"

class Console extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className={"welcome-root"}>
                <div className={"welcome-section"}>
                    <div className={"welcome-image"}>
                        <Img fluid={this.props.welcomeInfo.image.fluid} alt={"Welcome Image"}>
                        </Img>
                        <div className={"welcome-overlay"}>
                            <div className={"welcome-top"}>
                                Top
                            </div>
                            <div className={"welcome-bottom"}>
                                Bottom
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Console