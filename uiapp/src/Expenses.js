import React, {Component} from "react";
import Navbar from "./AppNav"
import DatePicker from "react-datepicker"
import './App.css'
import "react-datepicker/dist/react-datepicker.css"
import {Container, FormGroup, Form, Button} from "reactstrap";
import AppNav from "./AppNav";

class Expenses extends Component {
    state = {}
    handleChange
    render() {
        return (
            <div>
                <AppNav/>
                    <Container>
                        <Form>
                            <FormGroup>
                                <label for="title">Title</label>
                                <input type="text" name='title' id="title" onChange={this.handleChange}></input>
                            </FormGroup>

                            <FormGroup>
                                <label for="category">Category</label>
                                <input type="text" name='category' id="category" onChange={this.handleChange}></input>
                            </FormGroup>

                            <FormGroup>
                                <label for="expenseDate">Expense Date</label>
                                <input type="text" name='expenseDate' id="expenseDate" onChange={this.handleChange}></input>
                            </FormGroup>

                            <FormGroup>
                                <label for="location">Location</label>
                                <input type="text" name='location' id="location" onChange={this.handleChange}></input>
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" type="submit">Save</Button>{' '}
                            </FormGroup>
                        </Form>
                    </Container>
            </div>
        );
    }
}

export default Expenses;