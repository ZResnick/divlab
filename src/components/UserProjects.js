import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPages } from '../store/pageReducer';

class UserProjects extends React.Component {
  componentDidMount() {
    this.props.getAllPages(this.props.auth.auth.uid);
  }

  render() {
    const { pages } = this.props;
    console.log(pages);
    return (
      <div>
        <div className="myProjects">
          <p>MY PROJECTS</p>
        </div>
        <div className="cardGroup">
          <Card.Group>
            <Card>
              <Card.Content id="newCardSymbol">
                <Link to="/divlab">+</Link>
              </Card.Content>
              <Card.Content>
                <Card.Header>
                  <Link to="/divlab">Add a new project</Link>
                </Card.Header>
              </Card.Content>
            </Card>
            {pages.length ? (
              pages.map(page => {
                return (
                  <Card key={page.id}>
                    <Image src="/images/projectImage.png" wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{page.data.title}</Card.Header>
                    </Card.Content>
                  </Card>
                );
              })
            ) : (
              <h3 id="noProjects">You have no existing projects...</h3>
            )}
          </Card.Group>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase,
    profile: state.firebase.profile,
    pages: state.pages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPages: user => {
      dispatch(getAllPages(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjects);
