import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/authReducer';

const Navbar = props => (
  <div id="navbar">
    <nav>
      <Link className="navlink" to="/home">
        Home
      </Link>
      <Link className="navlink" to="/divlab">
        {'<divlab />'}
      </Link>
      <Link className="navlink" to="/signIn">
        Sign In
      </Link>
      <Link className="navlink" onClick={props.signOut}>
        Sign Out
      </Link>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  console.log(state);
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

/**
 * PROP TYPES
 */
