import React, { Component } from 'react';
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react';

import DivLab from './reactGrid';

// import ChartForm from './chartForm';

export default class DivLab2 extends Component {
  state = { visible: false };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="wide"
          >
            <a href="#chart">
              <Menu.Item as="a">
                <Icon name="home" />
                Home
              </Menu.Item>
            </a>
            <Menu.Item as="a">
              <Icon name="align justify" />
              Games
            </Menu.Item>
            <Menu.Item as="a" onClick={() => console.log('Hello World')} />
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Header as="h3">Application Content</Header>
              <DivLab />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
