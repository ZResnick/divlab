import { Card, Image } from 'semantic-ui-react';
import React from 'react';

export default function Home() {
  return (
    <div>
      <div id="homepage">
        <h1 className="animate-welcome">{'<divlab />'}</h1>
        <h3 className="animate-caption">THE FUTURE OF WEB DESIGN</h3>
      </div>

      <div>
        <h3 className="team">THE TEAM BEHIND THE IDEA</h3>
        <center>
          <div id="teamBar" />
        </center>
        <div id="teamCards">
          <Card.Group centered="true">
            <Card raised="true" className="teamSingleCards">
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                wrapped
                ui={false}
              />
              <Card.Content style={{ height: '73.16px' }}>
                <Card.Header>
                  <span className="newProjectText">ZACHARY RESNICK</span>
                  <p className="captionText">SOFTWARE ENGINEER</p>
                </Card.Header>
              </Card.Content>
            </Card>
            <Card raised="true" className="teamSingleCards" id="profileCards">
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                wrapped
                ui={false}
              />
              <Card.Content style={{ height: '73.16px' }}>
                <Card.Header>
                  <span className="newProjectText">JOONHO HAN</span>
                  <p className="captionText">SOFTWARE ENGINEER</p>
                </Card.Header>
              </Card.Content>
            </Card>
            <Card raised="true" className="teamSingleCards">
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                wrapped
                ui={false}
              />
              <Card.Content style={{ height: '73.16px' }}>
                <Card.Header>
                  <span className="newProjectText">ELLIOT GONZALEZ</span>
                  <p className="captionText">SOFTWARE ENGINEER</p>
                </Card.Header>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
