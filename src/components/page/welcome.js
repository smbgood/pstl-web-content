import React from "react";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"welcome-root"}>
            <div className={"welcome-section"}>
                <h1>Welcome !</h1>
                <div className={"welcome-image"}>

                </div>
            </div>
            </div>
        )
    }
}
export default Welcome