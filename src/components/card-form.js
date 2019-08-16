import React, { Component } from 'react';
import CardTemplate from './card';

export default class CardForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      edit: false
    };
    this.switchEdit = this.switchEdit.bind(this);
  }

  switchEdit(evt) {
    evt.preventDefault();
    console.log(this.state.edit);
    this.setState({
      edit: !this.state.edit
    });
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    console.log(this.state.content);
  };

  render() {
    return this.state.edit ? (
      <div>
        <form onSubmit={this.switchEdit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <button type="submit">Edit</button>
        </form>
      </div>
    ) : (
      <center>
        <CardTemplate
          name={this.state.name}
          description={this.state.description}
        />
        <button className="edit-button-on" onClick={this.switchEdit}>
          Edit
        </button>
      </center>
    );
  }
}
