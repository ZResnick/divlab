import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/authReducer';
import { Modal, Dropdown } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		this.profileItems = [
			{
				key: 'newProject',
				text: 'NEW PROJECT',
				onClick: () => {
					const newProject = document.querySelector('#newProject');
					newProject.click();
				},
			},
			{
				key: 'projects',
				text: 'PROJECTS',
				onClick: () => {
					const allProjects = document.querySelector('#allProjects');
					allProjects.click();
				},
			},
			{
				key: 'signout',
				text: 'SIGN OUT',
				onClick: this.props.signOut,
			},
		];
	}

	render() {
		const elements = [
			{
				render: () => {
					return (
						<div>
							<center>
								<h2>
									After logging in, add a container or two to your canvas...
								</h2>
							</center>
							<br />
							<iframe
								title="intro"
								src="https://giphy.com/embed/Qz4snoMQSPhXDikptH"
								width="800"
								height="410"
								frameBorder="0"
								class="giphy-embed"
								allowFullScreen
							></iframe>
							<center>
								<h4>
									You can add, resize, move, and delete these containers as you
									wish.
								</h4>
							</center>
						</div>
					);
				},
			},
			{
				render: () => {
					return (
						<div>
							<center>
								<h2>
									Click "Show Comopnents" to choose which elements to add to
									your canvas.
								</h2>
							</center>
							<br />
							<iframe
								title="another"
								src="https://giphy.com/embed/lPLOsVCKifFC19EImy"
								width="800"
								height="410"
								frameBorder="0"
								class="giphy-embed"
								allowFullScreen
							></iframe>
							<center>
								<h4>
									After adding a component, fill out the form and click preview
									to see your element in action!
								</h4>
							</center>
						</div>
					);
				},
			},
			{
				render: () => {
					return (
						<div>
							<center>
								<h2>
									When you're happy with the way everything looks, save it to
									your projects page.
								</h2>
							</center>
							<br />
							<iframe
								title="anotherrr"
								src="https://giphy.com/embed/hs1cB6r8dTkjPt3fGt"
								width="800"
								height="410"
								frameBorder="0"
								class="giphy-embed"
								allowFullScreen
							></iframe>
							<center>
								<h4>
									Don't worry! You can always go back and edit your page later.
									PRO TIP: You can see what your page will look like live by
									toggling the preview button on and off!
								</h4>
							</center>
						</div>
					);
				},
			},
			{
				render: () => {
					return (
						<div>
							<center>
								<h2>
									Once your happy with your site, export it as an HTML file.
								</h2>
							</center>
							<br />
							<iframe
								title="outro"
								src="https://giphy.com/embed/fxNXJQzuevhG04Hz3N"
								width="800"
								height="410"
								frameBorder="0"
								class="giphy-embed"
								allowFullScreen
							></iframe>
							<center>
								<h4>
									Launch the download using your favorite Text Editor or
									directly in your web browser of choice, and see your site in
									action!
								</h4>
							</center>
						</div>
					);
				},
			},
			{
				render: () => {
					return (
						<div>
							<center>
								<h2>
									If you'd like, you can add navigation links to yoiur header!
								</h2>
							</center>
							<br />
							<iframe
								title="outro"
								src="https://giphy.com/embed/QzAdOIkZ9G0svTin0X"
								width="800"
								height="410"
								frameBorder="0"
								class="giphy-embed"
								allowFullScreen
							></iframe>
							<center>
								<h4>
									To do this, change the div ID of the component you want the
									link to navigate to, and add that link to the 'navbars'
									section of the header in the format DivId1, DivId1 || DivId2,
									DivId2 || etc.... NOTE: Adding navlinks can only be done
									immediately before exporting. All navlinks will be cleared
									upon exit from that specific working space.
								</h4>
							</center>
						</div>
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
								<Modal.Header>
									<center>How to use {'<divlab />'}</center>
								</Modal.Header>
								<Modal.Content>
									<Carousel
										elements={elements}
										showNextPrev={true}
										showIndicators={false}
									/>
								</Modal.Content>
							</Modal>
							<Link
								id="newProject"
								className="navlink"
								to="/divlab"
								style={{ display: 'none' }}
							>
								NEW PROJECT
							</Link>
							<a
								id="allProjects"
								href="/projects"
								className="navlink"
								style={{ display: 'none' }}
							>
								{this.props.profile.initials}
							</a>
							<Link id="about" className="navlink" to="/about">
								ABOUT
							</Link>

							<Dropdown
								className="navlink"
								text={this.props.profile.initials}
								floating
								labeled
							>
								<Dropdown.Menu>
									{this.profileItems.map(option => (
										<Dropdown.Item key={option.key} {...option} />
									))}
								</Dropdown.Menu>
							</Dropdown>
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
								TRY IT
							</Link>
							<Link id="about" className="navlink" to="/about">
								ABOUT
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
