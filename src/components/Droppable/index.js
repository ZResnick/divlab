import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Droppable extends Component {
  state = {};

  drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    if (data && !e.target.classList.contains('react-grid-layout')) {
      // when dropping image, data is null and errors
      e.target.appendChild(document.getElementById(data));
    }
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
