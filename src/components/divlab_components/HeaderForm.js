import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent';
import { Button, Form } from 'semantic-ui-react';

export default class CardForm extends Component {
  constructor() {
    super();
    this.state = {
      backgroundUrl: '',
      title: '',
      navlinks: '',
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
            label="Background Image (url)"
            type="text"
            name="backgroundUrl"
            value={this.state.backgroundUrl}
            placeholder="https://url"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Title"
            type="text"
            name="title"
            value={this.state.title}
            placeholder="Title"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Navbar Links"
            type="text"
            name="navlinks"
            value={this.state.navlinks}
            placeholder="Link Name , div ID to link to || Link Name...."
            onChange={this.handleChange}
          />
          <Button type="submit">Preview</Button>
        </Form>
      </div>
    ) : (
      <div id={this.state.id && this.state.id}>
        <HeaderComponent info={this.state} />
        <Button className="edit-button-on" onClick={this.switchEdit} width={6}>
          Edit
        </Button>
      </div>
    );
  }
}
