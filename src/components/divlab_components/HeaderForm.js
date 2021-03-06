import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent';
import { Button, Form } from 'semantic-ui-react';

export default class CardForm extends Component {
	constructor(props) {
		super(props);
		if (this.props.info) {
			const { backgroundUrl, title, navLinks, id, edit } = this.props.info;
			this.state = {
				backgroundUrl,
				title,
				id,
				navLinks,
				edit,
			};
		} else {
			this.state = {
				backgroundUrl: '',
				title: '',
				navlinks: '',
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
					<Button
						compact
						size="mini"
						color="orange"
						className="preview"
						type="submit"
					>
						Submit
					</Button>
				</Form>
			</div>
		) : (
			<div id={this.state.id && this.state.id}>
				<HeaderComponent info={this.state} />
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
