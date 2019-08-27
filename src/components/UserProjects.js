import React from 'react';
import {
  Card, Image, Button, Confirm
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPages, deleteAPage } from '../store/pageReducer';

class UserProjects extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false
		}
	}
  componentDidMount() {
		this.props.getAllPages(this.props.auth.auth.uid);
		this.forceUpdate()
	}

	show = () => this.setState({open:true})
	handleConfirm = (pageId) => {
		this.setState({open: false});
		const {auth} = this.props
		this.props.deleteAPage(auth.auth.uid, pageId)
	}
	handleCancel = () => this.setState({open: false})

  render() {
		const { pages } = this.props;
    return (
      <div>
        <div className="myProjects">
          <p>MY PROJECTS</p>
        </div>
        <div className="cardGroup">
          <Card.Group>
            <Card>
              <Card.Content id="newCardSymbol">
                <Link to="/divlab">
                  <span className="newItemSign">+</span>
                </Link>
              </Card.Content>
              <Card.Content style={{ height: '73.16px' }}>
                <Card.Header>
                  <Link to="/divlab">
                    <span className="newProjectText">ADD A NEW PROJECT</span>
                  </Link>
                </Card.Header>
              </Card.Content>
            </Card>
            {pages.length ? (
              pages.map(page => {
                return (
                  <Card key={page.id}>
                    <Image src="/images/projectImage.png" wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>
                        <span className="projectTitles">
                          <Link to={`/divlab/${page.id}`}>
                            Project Number: {page.id}
                          </Link>
                        </span>
                      </Card.Header>
                    </Card.Content>
										<Button onClick={this.show}>Delete</Button>
										<Confirm open={this.state.open}
                  content="Are you sure you want to delete this project?"
                  onCancel={this.handleCancel}
                  onConfirm={() => this.handleConfirm(page.id)} />
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
    deleteAPage: (userId, pageId) => {
      dispatch(deleteAPage(userId, pageId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjects);
