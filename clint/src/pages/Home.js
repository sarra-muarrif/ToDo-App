import React, { Component } from 'react'
import Form from '../components/form/Form'
import List from '../components/list/List'
import { list_URL } from '../constants/URI'

export default class Home extends Component {
    state = {
        list: [],
        errorMessage: "",
        showError: false
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        fetch(list_URL)
            .then(res => res.json())
            .then(res => {
                this.setState({ list: res })
            })
            .catch(err => console.log(err))
    }
    //delete card
    hadndleDelete = (id) => {
        fetch(`${list_URL}/${id}`, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 2000) {
                return res.json()
            }
            throw new Error("can't delete card ,,")
        })
            .then(res => this.fetchData())
            .catch(err => {
                this.setState({
                    showError: true,
                    errorMessage: err.message
                })
            })
    };
    //add card
    handleAdd = ({ title, description }) => {
        fetch(list_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description
            })
        }).then((res) => {
            if (res.status === 2000) {
                return res.json()
            }
            throw new Error("can't add card ,,")
        })
            .then((res) => this.fetchData())
            .catch((err) => {
                this.setState({
                    showError: true,
                    errorMessage: err.message
                })
            })
    }
    //edit card
    editCard = (title, description, _id) => {
        fetch(`${list_URL}/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description
            })
        }).then(res => {
            if (res.status === 2000) {
                return res.json()
            }
            throw new Error("can't edit card ,,")
        })
            .then((res) => this.fetchData())
            .catch((err) => {
                this.setState({
                    showError: true,
                    errorMessage: err.message
                })
            })
    }
    render() {
        const { list } = this.state
        return (
            <>
                {this.state.showError && <span>{this.state.errorMessage}</span>}
                <Form handleAdd={this.handleAdd} />
                <List list={list} hadndleDelete={this.hadndleDelete} editCard={this.editCard} />
            </>
        )
    }
}