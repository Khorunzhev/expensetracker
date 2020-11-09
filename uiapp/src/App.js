import React, {Component} from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import Category from "./Category";
import Expenses from "./Expenses";
import AuthentificatedRoute from "./AuthentificatedRoute";
import LoginComponent from "./LoginComponent";
import Home from "./Home";

class App extends Component {
    state = {}
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={LoginComponent}/>
                    <Route path='/categories' exact={true} component={Category}/>
                    <Route path='/expenses' exact={true} component={Expenses}/>
                    <Route path="/login" component={LoginComponent}/>
                </Switch>
            </Router>
        );
    }
}

export default App;