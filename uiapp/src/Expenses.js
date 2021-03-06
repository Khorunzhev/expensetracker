import React, {Component} from "react";
import Navbar from "./AppNav"
import DatePicker from "react-datepicker"
import './App.css'
import "react-datepicker/dist/react-datepicker.css"
import {Link} from "react-router-dom";
import {Container, FormGroup, Form, Button, Input, Label, Table} from "reactstrap";
import AppNav from "./AppNav";
import Moment from "react-moment";

class Expenses extends Component {

    emptyItem = {
        id: '',
        amount: '',
        expenseDate: new Date(),
        description: '',
        location: '',
        category: {id:1, name:'Drugs'}
    }

    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            isLoading: true,
            Categories: [],
            Expenses: [],
            item: this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    async handleSubmit(event) {

        const item = this.state.item;

        await fetch(`/api/expense/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        })
        event.preventDefault();
        this.props.history.push("/expenses")
    }

    async handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item})
        console.log(this.state.item)
    }

    async handleDateChange(date) {
        let item = {...this.state.item};
        item.expenseDate = date;
        this.setState({item})
        console.log(item)
    }

    async handleCategoryChange(event) {
        let index = event.nativeEvent.target.selectedIndex;
        let selectedOptionText = event.nativeEvent.target[index].text
        let category = {
            id: event.target.value,
            name: selectedOptionText
        }
        let item = {...this.state.item};
        item['category'] = category
        this.setState({item})
    }

    async remove(id) {
        await fetch(`/api/expense/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(
            () => {
                let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
                this.setState({
                    Expenses: updatedExpenses
                })
            }
        )
    }

    async componentDidMount() {
        const response = await fetch("/api/categories")
        const body = await response.json();
        this.setState({Categories: body, isLoading: false})

        const responseExpenses = await fetch("/api/expenses")
        const bodyExpenses = await responseExpenses.json();
        this.setState({Expenses: bodyExpenses, isLoading: false})
    }

    render() {
        const title = <h3>Add Expense</h3>
        const {Categories} = this.state;
        const {Expenses, isLoading} = this.state;

        if (isLoading)
            return (<div>Loading...</div>)

        let optionList = Categories.map(category =>
            <option value = {category.id} key={category.id} name={category.name}>
                {category.name}
            </option>
        )

        let rows =
            Expenses.map(exp =>
                <tr key={exp.id}>
                    <td>{exp.description}</td>
                    <td>{exp.amount}</td>
                    <td>{exp.location}</td>
                    <td><Moment date={exp.expenseDate} format="YYYY/MM/DD"/></td>
                    <td>{exp.category.name}</td>
                    <td><Button size="sm" color="danger" onClick={() => this.remove(exp.id)}>Delete</Button></td>
                </tr>
            )
        return (
            <div>
                <AppNav/>
                    <Container>
                        {title}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="title">Description</Label>
                                <Input type="text" name='description' id="description"
                                       onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="amount">Amount</Label>
                                <Input type="text" name='amount' id="amount"
                                       onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="category">Category</Label>
                                <select onChange={this.handleCategoryChange} name="category">
                                    {optionList}
                                </select>
                            </FormGroup>

                            <FormGroup>
                                <Label for="expenseDate">Expense Date</Label>
                                <DatePicker selected={this.state.item.expenseDate} onChange={this.handleDateChange}/>
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
                {''}
                    <Container>
                        <h3>Expense List</h3>
                        <Table className="mt-4">
                            <thead>
                                <tr>
                                    <th width="20%">Description</th>
                                    <th width="10%">Amount</th>
                                    <th width="10%">Location</th>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th width="10%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </Container>
            </div>
        );
    }
}

export default Expenses;