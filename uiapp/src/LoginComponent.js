import React, { Component } from 'react';
import AuthentificationService from './AuthentificationService.js'
import {Input, Button, Container} from "reactstrap";


class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.loginClicked = this.loginClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }
        )
    }

    loginClicked() {
        AuthentificationService.registerSuccessfulLogin(this.state.username, this.state.password)
        this.props.history.push(`/expenses/`)
        this.setState(
            {
                showSuccessMessage: true,
                hasLoginFailed: false
            }
        )
    }


    render() {
        return (
            <div>
                <Container>
                    <h1>Login</h1>
                    <div className="container">
                        <ShowInvalidCredentials hasLoginFailed = {this.state.hasLoginFailed}/>
                        <ShowLoginSuccess showSuccessMessage = {this.state.showSuccessMessage}/>
                        UserName: <Input type="text" name="username" value={this.state.username} onChange = {this.handleChange}/>
                        Password: <Input type="password" name="password" value={this.state.password} onChange = {this.handleChange}/>
                        <Button className="btn btn-success" onClick={this.loginClicked}>Login</Button>
                    </div>
                </Container>
            </div>
        );
    }
}

function ShowInvalidCredentials(props) {
    if (props.hasLoginFailed) {
        return <div className="alert alert-warning ">Invalid Credentials</div>
    }
    return null
}

function ShowLoginSuccess(props) {
    if (props.showSuccessMessage) {
        return <div>Login Success</div>
    }
    return null
}

export default LoginComponent