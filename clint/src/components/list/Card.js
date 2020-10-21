import React from 'react'

export default class Card extends React.Component {
    state = {
        title: this.props.title,
        description: this.props.description,
        edit: false
    }

    handelInput = e => this.setState({ [e.target.name]: e.target.value })
    //fix card
    fixedCard = () => {
        const { title, description, hadndleDelete, id } = this.props;
        return (
            <div className='card'>
                <span className='card-icons'>
                    <span className="material-icons" onClick={() => hadndleDelete(id)}>
                        delete
                    </span>
                    <span className="material-icons">
                        edit
                     </span>
                </span>
                <h2>{title}</h2>
                <h2>{description}</h2>
            </div>
        )

    };
    //edit card
    editCard = () => {
        return <div className='card'>
            <input type="text" name="title" value={this.state.title} onChange={this.handelInput} />
            <input type="text" name="description" value={this.state.description} onChange={this.handelInput} />
            <span>
                <button onClick={() => {
                    this.props.editCard({
                        title: this.state.title,
                        description: this.state.description,
                        id: this.props.id
                    })
                    this.setState({ edit: false })
                }}>save</button>
                <button onClick={() => (
                    this.setState({
                        edit: false,
                        title: this.props.title,
                        description: this.props.description,
                    })
                )}>cancel</button>
            </span>
        </div>
    };
    render() {
        return !this.state.edit ? this.fixedCard() : this.editCard()


    }
}



