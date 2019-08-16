import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Droppable extends Component {
	state = {};

	drop = e => {
		e.preventDefault();
		const data = e.dataTransfer.getData('transfer');
		// const element = document.getElementById(data);
		if (data) {
			e.target.appendChild(document.getElementById(data));
		}

		// console.log('hello');
	};

	allowDrop = e => {
		e.preventDefault();
	};

	render() {
		return (
			<div
				id={this.props.id}
				onDrop={this.drop}
				onDragOver={this.allowDrop}
				style={this.props.style}
			>
				{this.props.children}
			</div>
		);
	}
}

Droppable.propTypes = {
	id: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.node,
};

export default Droppable;
