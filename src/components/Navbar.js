import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/authReducer';

const Navbar = props => {
  const { auth, profile } = props;

  console.log(auth, profile);
  return (
    <div id="navbar">
      {auth.auth.uid ? (
        <nav>
          <div>
            <Link id="mainHeader" className="navlink" to="/home">
              {'<divlab />'}
            </Link>
          </div>
          <div>
            <Link className="navlink" to="/divlab">
              NEW PROJECT
            </Link>
            <Link className="navlink" to="/projects">
              {profile.initials}
            </Link>
            <Link className="navlink" to="/" onClick={props.signOut}>
              SIGN OUT
            </Link>
          </div>
        </nav>
      ) : (
        <nav>
          <div>
            <Link id="mainHeader" className="navlink" to="/home">
              {'<divlab />'}
            </Link>
          </div>
          <div>
            <Link className="navlink" to="/divlab">
              TRY IT
            </Link>
            <Link className="navlink" to="/signIn">
              SIGN IN
            </Link>
          </div>
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
    auth: state.firebase,
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
