import React, { Component } from 'react';
import SidewaysCardComponent from './SidewaysCardComponent';
import { Button, Form } from 'semantic-ui-react';

export default class CardForm extends Component {
  constructor(props) {
    super(props);
    if (this.props.info) {
      const {
        name,
        description,
        id,
        caption,
        imageUrl,
        edit,
      } = this.props.info;
      this.state = {
        name,
        description,
        id,
        caption,
        imageUrl,
        edit,
      };
    } else {
      this.state = {
        name: '',
        description: '',
        caption: '',
        imageUrl: '',
        id: '',
        edit: true,
      };
    }
    this.switchEdit = this.switchEdit.bind(this);
  }

  switchEdit(evt) {
    evt.preventDefault();
    this.setState({
      edit: !this.state.edit,
    });
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    return this.state.edit ? (
      <div>
        <Form
          style={{
            border: '2px dotted white',
            padding: '10px',
            borderRadius: '10px',
          }}
          onSubmit={this.switchEdit}
        >
          <Form.Input
            label="div ID"
            type="text"
            name="id"
            value={this.state.id}
            placeholder="<div> #ID"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Image URL"
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            placeholder="Image URL"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Name"
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Name"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Caption"
            type="text"
            name="caption"
            value={this.state.caption}
            placeholder="Caption"
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
          <Button
            compact
            size="mini"
            color="orange"
            className="preview"
            type="submit"
          >
            Preview
          </Button>
        </Form>
      </div>
    ) : (
      <div id={this.state.id && this.state.id}>
        <SidewaysCardComponent info={this.state} />
        <Button
          compact
          size="mini"
          color="teal"
          className="edit-button-on"
          onClick={this.switchEdit}
          width={6}
        >
          Edit
        </Button>
      </div>
    );
  }
}
