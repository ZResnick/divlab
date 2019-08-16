import React, { Component } from 'react';
import ParagraphComponent from './ParagraphComponent';
import { Button, Form } from 'semantic-ui-react';

export default class ParagraphForm extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
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
            label="Paragraph Content"
            type="text"
            name="content"
            value={this.state.content}
            placeholder="Content"
            onChange={this.handleChange}
          />
          <Button type="submit">Preview</Button>
        </Form>
      </div>
    ) : (
      <div>
        <ParagraphComponent info={this.state} />
        <Button onClick={this.switchEdit} width={6}>
          Edit
        </Button>
      </div>
    );
  }
}
