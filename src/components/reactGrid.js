import React from 'react';

import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import styled from 'styled-components';
import Draggable from './Draggable';
import Droppable from './Droppable';
import CardForm from '../components/divlab_components/CardForm';
import ChartForm from '../components/divlab_components/ChartForm';
import HeaderForm from '../components/divlab_components/HeaderForm';
import HeadshotForm from '../components/divlab_components/HeadshotForm';
import ParagraphForm from '../components/divlab_components/ParagraphForm';

import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Item = styled.div`
  color: #555;
  padding: 8px;

  border-radius: 3px;
`;

const droppableStyle1 = {
  backgroundColor: '#555',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  //   border: '1px solid #555',
  //
  minWidth: '250px',
  minHeight: '500px',
  margin: '32px'
};

const droppableStyle2 = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'flex-start',
  flexWrap: 'wrap',
  backgroundColor: '#f0f0f0',
  width: '800px',
  height: '1100px',
  margin: '32px'
};

const droppableStyle3 = {
  backgroundColor: '#555',
  border: '1px solid red',
  width: '250px',
  height: '200px',
  margin: '5px'
};

const droppableStyle31 = {
  backgroundColor: '#555',
  border: '1px solid red',
  flexGrow: '1',
  margin: '5px'
};

const droppableStyle4 = {
  backgroundColor: '#f0f0f0',
  overflow: 'scroll',
  border: '1px solid red',
  width: '775px',
  height: '1050px',
  margin: '5px'
};

const droppableStyle5 = {
  backgroundColor: '#f0f0f0',
  border: '1px solid red',
  width: '382px',
  height: '340px',
  margin: '5px'
};

class divlab extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
    onLayoutChange: function() {},
    verticalCompact: false
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      items: [0, 1, 2, 3, 4].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1).toString(),
          isResizable: true,
          static: false
        };
      }),

      newCounter: 0,
      components: []
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  createElement(el) {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    };
    const i = el.add ? '+' : el.i;
    return (
      <div
        style={{ border: '1px solid red', overflow: 'hidden' }}
        key={i}
        data-grid={el}
      >
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text" />
        )}
        <span
          name="X"
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    // console.log('adding', 'n' + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: 'n' + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        isResizable: this.state.isResizable,
        static: this.state.static
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log('removing', i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  removeClass = () => {
    const divs = document.querySelectorAll('.react-resizable');
    divs.forEach(item => {
      item.classList.remove('react-resizable');
    });

    console.log(divs);
  };

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
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => {
                this.setState({
                  components: [...this.state.components, <CardForm />]
                });
              }}
            >
              <Icon name="address card" />
              Card
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => {
                this.setState({
                  components: [...this.state.components, <ChartForm />]
                });
              }}
            >
              <Icon name="chart bar" />
              Chart
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => {
                this.setState({
                  components: [...this.state.components, <HeaderForm />]
                });
              }}
            >
              <Icon name="header" />
              Header
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => {
                this.setState({
                  components: [...this.state.components, <HeadshotForm />]
                });
              }}
            >
              <Icon name="image" />
              Headshot
            </Menu.Item>

            <Menu.Item
              as="a"
              onClick={() => {
                this.setState({
                  components: [...this.state.components, <ParagraphForm />]
                });
              }}
            >
              <Icon name="paragraph" />
              Paragraph
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              {/* <Header as="h3">Application Content</Header> */}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <div>
                  <Droppable style={droppableStyle1}>
                    {this.state.components.map((item, idx) => {
                      return (
                        <Draggable
                          id={String(Math.floor(Math.random() * 100000000))}
                          key={idx}
                        >
                          <Item>{item}</Item>
                        </Draggable>
                      );
                    })}
                  </Droppable>
                </div>
                <div>
                  {/* <Droppable id="dr2"> */}
                  <button
                    onClick={() => {
                      const imgs = document.querySelectorAll(
                        '.react-resizable-handle-se'
                      );
                      const editButtonsOn = document.querySelectorAll(
                        '.edit-button-on'
                      );
                      const editButtonsOff = document.querySelectorAll(
                        '.edit-button-off'
                      );
                      const divs = document.querySelectorAll(
                        '.react-grid-item'
                      );
                      const xs = document.getElementsByName('X');

                      editButtonsOn.forEach(item => {
                        if (item.classList.contains('edit-button-on')) {
                          item.classList.replace(
                            'edit-button-on',
                            'edit-button-off'
                          );
                        }
                      });

                      editButtonsOff.forEach(item => {
                        if (item.classList.contains('edit-button-off')) {
                          item.classList.replace(
                            'edit-button-off',
                            'edit-button-on'
                          );
                        }
                      });
                      imgs.forEach(i => {
                        if (i.classList.contains('react-resizable-handle')) {
                          i.classList.remove('react-resizable-handle');
                        } else {
                          i.classList.add('react-resizable-handle');
                        }
                      });

                      xs.forEach(x => {
                        if (x.textContent === 'x') {
                          x.textContent = '';
                        } else {
                          x.textContent = 'x';
                        }
                      });
                      divs.forEach(div => {
                        if (div.style.border) {
                          div.style.border = null;
                        } else {
                          div.style.border = '1px solid red';
                        }
                      });
                    }}
                  >
                    Borders off
                  </button>
                  <button onClick={this.onAddItem}>Add Item</button>
                  <Droppable>
                    <ResponsiveReactGridLayout
                      onLayoutChange={this.onLayoutChange}
                      style={{
                        width: '1200px',
                        minHeight: '1000px',
                        border: '1px solid blue'
                      }}
                      // onBreakpointChange={this.onBreakpointChange}
                      {...this.props}
                    >
                      {_.map(this.state.items, el => this.createElement(el))}
                    </ResponsiveReactGridLayout>
                  </Droppable>
                  {/* </Droppable> */}
                </div>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default divlab;
