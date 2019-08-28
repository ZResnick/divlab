import { Card, Image } from 'semantic-ui-react';
import React from 'react';

export default function AboutUs() {
	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div>
				<h3 className="team">THE TEAM BEHIND THE IDEA</h3>
				<center>
					<div id="teamBar" />
				</center>
				<div id="teamCards">
					<Card.Group centered="true">
						<Card raised="true" className="teamSingleCards">
							<Image src="images/ZacharyResnick.png" wrapped ui={false} />
							<Card.Content style={{ height: '73.16px' }}>
								<Card.Header>
									<a href="https://www.linkedin.com/in/zachresnick1/">
										<span className="newProjectText">ZACHARY RESNICK</span>
									</a>
									<p className="captionText">SOFTWARE ENGINEER</p>
								</Card.Header>
							</Card.Content>
						</Card>
						<Card raised="true" className="teamSingleCards" id="profileCards">
							<Image src="images/JoonhoHan.png" wrapped ui={false} />
							<Card.Content style={{ height: '73.16px' }}>
								<Card.Header>
									<a href="https://www.linkedin.com/in/joonhojhan/">
										<span className="newProjectText">JOONHO HAN</span>
									</a>
									<p className="captionText">SOFTWARE ENGINEER</p>
								</Card.Header>
							</Card.Content>
						</Card>
						<Card raised="true" className="teamSingleCards">
							<Image src="images/ElliotGonzalez.png" wrapped ui={false} />
							<Card.Content style={{ height: '73.16px' }}>
								<Card.Header>
									<a href="https://www.linkedin.com/in/elliot-gonzalez-4b18534a/">
										<span className="newProjectText">ELLIOT GONZALEZ</span>
									</a>
									<p className="captionText">SOFTWARE ENGINEER</p>
								</Card.Header>
							</Card.Content>
						</Card>
					</Card.Group>
				</div>
			</div>
		</div>
	);
}
