import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/authReducer';
import { Modal, Image } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const elements = [
      {
        render: () => {
          return (
            <div>
              <iframe
                TITLE="TOUR"
                src="https://giphy.com/embed/lQ7R3JYODF1CTiBW8w"
                width="800"
                height="410"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
              ></iframe>
              <h5>Add a container.</h5>
            </div>
          );
        },
      },
      {
        render: () => {
          return <Image src="https://i.imgur.com/0eRe75Y.jpg" />;
        },
      },
      {
        render: () => {
          return (
            <Image src="https://flipwallpapers.com/wallpapers/anime-wallpaper-hd-resolution-For-desktop-Wallpaper.jpg" />
          );
        },
      },
    ];

    return (
      <div id="navbar">
        {this.props.auth.auth.uid ? (
          <nav>
            <div>
              <Link id="mainHeader" className="navlink" to="/home">
                {'<divlab />'}
              </Link>
            </div>
            <div>
              <Modal trigger={<Link className="navlink">TOUR</Link>}>
                <Modal.Header>How to use {'<divlab />'}</Modal.Header>
                <Modal.Content>
                  <Carousel
                    elements={elements}
                    showNextPrev={true}
                    showIndicators={false}
                  />
                </Modal.Content>
              </Modal>
              <Link className="navlink" to="/divlab">
                NEW PROJECT
              </Link>
              <a href="/projects" className="navlink">
                {this.props.profile.initials}
              </a>
              <Link className="navlink" to="/" onClick={this.props.signOut}>
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
  }
}

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
