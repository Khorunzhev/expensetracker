import React, {Component} from "react";
import {Link} from "react-router-dom";

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: ''
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    <Link to="/todos">link</Link>
                </div>
                <div className="container">
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        )
    }
}

export default WelcomeComponent