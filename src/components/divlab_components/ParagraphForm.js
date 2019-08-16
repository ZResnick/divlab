import React, { Component } from 'react';
import ParagraphComponent from './ParagraphComponent';
import { Button, Form } from 'semantic-ui-react';

export default class ParagraphForm extends Component {
	constructor() {
		super();
		this.state = {
			content: '',
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
						label="Paragraph Content"
						type="text"
						name="content"
						value={this.state.content}
						placeholder="Content"
						onChange={this.handleChange}
					/>
					<Button className="edit-button-on" type="submit">
						Preview
					</Button>
				</Form>
			</div>
		) : (
			<div id={this.state.id && this.state.id}>
				<ParagraphComponent info={this.state} />
				<Button className="edit-button-on" onClick={this.switchEdit} width={6}>
					Edit
				</Button>
			</div>
		);
	}
}
