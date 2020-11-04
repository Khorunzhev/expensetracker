import React, {Component} from "react";
import Navbar from "./AppNav"
import DatePicker from "react-datepicker"
import './App.css'
import "react-datepicker/dist/react-datepicker.css"
import {Link} from "react-router-dom";
import {Container, FormGroup, Form, Button, Input, Label} from "reactstrap";
import AppNav from "./AppNav";
import Moment from "react-moment";

class Expenses extends Component {

    emptyItem = {
        id: '103',
        expenseDate: new Date(),
        description: '',
        location: '',
        categories: [1, 'Drugs']
    }

    state = {
        date: new Date(),
        isLoading: true,
        Categories: [],
        item: this.emptyItem
    }

    async componentDidMount() {
        const response = await fetch("/api/categories")
        const body = await response.json();
        this.setState({Categories: body, isLoading: false})
    }

    render() {
        const title = <h3>Add Expense</h3>
        const {Categories, isLoading} = this.state

        if (isLoading)
            return (<div>Loading...</div>)

        let optionList = Categories.map(category =>
            <option id = {category.id}>
                {category.name}
            </option>
        )
        return (
            <div>
                <AppNav/>
                    <Container>
                        {title}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name='title' id="title"
                                       onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="category">Category</Label>
                                <select>
                                    {optionList}
                                </select>
                                <Input type="text" name='category' id="category"
                                       onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="expenseDate">Expense Date</Label>
                                <DatePicker selected={this.state.date} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input type="text" name='location' id="location"
                                       onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" type="submit">Save</Button>{' '}
                                <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Container>
            </div>
        );
    }
}

export default Expenses;