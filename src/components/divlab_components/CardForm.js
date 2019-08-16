import React, { Component } from 'react';
import CardComponent from './CardComponent';
import { Button, Form } from 'semantic-ui-react';

export default class CardForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      edit: false,
    };
    this.switchEdit = this.switchEdit.bind(this);
  }

  switchEdit(evt) {
    evt.preventDefault();
    console.log(this.state.edit);
    this.setState({
      edit: !this.state.edit,
    });
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    console.log(this.state.content);
  };

  render() {
    return this.state.edit ? (
      <div>
        <Form onSubmit={this.switchEdit}>
          <Form.Input
            label="Name"
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Name"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Description"
            type="text"
            name="description"
            value={this.state.description}
            placeholder="Description"
            onChange={this.handleChange}
          />
          <Button type="submit">Preview</Button>
        </Form>
      </div>
    ) : (
      <div>
        <CardComponent info={this.state} />
        <Button onClick={this.switchEdit} width={6}>
          Edit
        </Button>
      </div>
    );
  }
}
