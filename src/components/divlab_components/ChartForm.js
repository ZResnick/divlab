import React, { Component } from 'react';
import ChartComponent from './ChartComponent';
import { Button, Form } from 'semantic-ui-react';

export default class ChartForm extends Component {
  constructor() {
    super();
    this.state = {
      labels: '',
      datasets: '',
      dataTypes: '',
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
  };

  render() {
    return this.state.edit ? (
      <div id={this.state.id && this.state.id}>
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
            label="Labels"
            type="text"
            name="labels"
            value={this.state.labels}
            placeholder="Labels for x-axis"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Data Categories"
            type="text"
            name="dataTypes"
            value={this.state.dataTypes}
            placeholder="Data Categories"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Data"
            type="text"
            name="datasets"
            value={this.state.datasets}
            placeholder="Datasets for each Data Category, separated by ' || '"
            onChange={this.handleChange}
          />
          <Button type="submit">Preview</Button>
        </Form>
      </div>
    ) : (
      <div id={this.state.id && this.state.id}>
        <ChartComponent info={this.state} />
        <Button onClick={this.switchEdit}>Edit</Button>
      </div>
    );
  }
}
