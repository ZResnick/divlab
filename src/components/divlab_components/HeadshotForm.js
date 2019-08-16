import React, { Component } from 'react';
import HeadshotComponent from './HeadshotComponent';
import { Button, Form } from 'semantic-ui-react';

export default class HeadshotForm extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
      id: '',
      edit: true,
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
            label="div ID"
            type="text"
            name="id"
            value={this.state.id}
            placeholder="<div> #ID"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Headshot Image (url)"
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            placeholder="https://url"
            onChange={this.handleChange}
          />
          <Button type="submit">Preview</Button>
        </Form>
      </div>
    ) : (
      <div id={this.state.id && this.state.id}>
        <HeadshotComponent info={this.state} />
        <Button className="edit-button-on" onClick={this.switchEdit} width={6}>
          Edit
        </Button>
      </div>
    );
  }
}
