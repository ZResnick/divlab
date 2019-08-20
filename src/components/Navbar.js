import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/authReducer';

const Navbar = props => {
  const { auth, profile } = props;

  console.log(auth, profile);
  return (
    <div id="navbar">
      {auth.uid ? (
        <nav>
          <Link className="navlink" to="/home">
            Home
          </Link>
          <Link className="navlink" to="/divlab">
            {profile.initials}
          </Link>
          <Link className="navlink" to="/" onClick={props.signOut}>
            Sign Out
          </Link>
        </nav>
      ) : (
        <nav>
          <Link className="navlink" to="/home">
            Home
          </Link>
          <Link className="navlink" to="/signIn">
            Sign In
          </Link>
        </nav>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
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
