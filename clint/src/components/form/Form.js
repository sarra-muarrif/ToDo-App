import React, { Component } from 'react'
import './style.css'

export default class Form extends Component {
    state = {
        title: '',
        description: ''
    }
    handelInput = e => this.setState({ [e.target.name]: e.target.value })
    addItem = () => {
        this.props.handleAdd({
            title: this.state.title,
            description: this.state.description
        })
        this.setState({
            title: '',
            description: ''
        })
    }
    render() {
        return (
            <div className="form-contaiter">
                <h2>ToDo App</h2>
                <input type="text" name="title" value={this.state.title} onChange={this.handelInput} />
                <input type="text" name="description" value={this.state.description} onChange={this.handelInput} />
                <button className="form-btn" onClick={this.addItem}><span className="material-icons">add</span><span>add</span></button>
            </div>
        )
    }
}