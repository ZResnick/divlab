import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/authReducer';
import { Modal } from 'semantic-ui-react';
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
							<center>
								<h2>
									After logging in, add a container or two to your canvas...
								</h2>
							</center>
							<br />
							<iframe
								title="intro"
								src="https://giphy.com/embed/J4PKuvA1yFchB2jqL5"
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
								src="https://giphy.com/embed/WONVnWRggvRSt5VOeY"
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
								src="https://giphy.com/embed/RezPYlVYRn42xsi59M"
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
								src="https://giphy.com/embed/W4QtsmAF21Aq5J8Nih"
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
