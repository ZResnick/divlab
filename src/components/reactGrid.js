import React from 'react';

import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import styled from 'styled-components';
import Draggable from './Draggable';
import Droppable from './Droppable';
import CardForm from '../components/divlab_components/CardForm';
import HeaderForm from '../components/divlab_components/HeaderForm';
import HeadshotForm from '../components/divlab_components/HeadshotForm';
import ParagraphForm from '../components/divlab_components/ParagraphForm';
import SidewaysCardForm from '../components/divlab_components/SidewaysCardForm';
// import { renderToString } from 'react-dom/server';
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react';

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function getDivsFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('div')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function getCounterFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('counter')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

// function getCompsFromLS(key) {
//   let ls = {};
//   if (global.localStorage) {
//     try {
//       ls = JSON.parse(global.localStorage.getItem('comps')) || {};
//     } catch (e) {
//       /*Ignore*/
//     }
//   }
//   return ls[key];
// }

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-7',
      JSON.stringify({
        [key]: value
      })
    );
  }
}

function saveDivsToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'div',
      JSON.stringify({
        [key]: value
      })
    );
  }
}

function saveCounterToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'counter',
      JSON.stringify({
        [key]: value
      })
    );
  }
}

// function saveCompsToLS(key, value) {
//   if (global.localStorage) {
//     global.localStorage.setItem(
//       'comps',
//       JSON.stringify({
//         [key]: [value]
//       })
//     );
//   }
// }

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayout = getFromLS('items') || [];
const originalCounter = getCounterFromLS('newCounter') || 0;
// const originalComps = getCompsFromLS('components') || [];
const originalDivs = getDivsFromLS('divs') || [];

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
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 120, md: 100, sm: 60, xs: 40, xxs: 20 },

    rowHeight: 2,
    // onLayoutChange: function() {},
    verticalCompact: true
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      //   items: [0, 1, 2, 3, 4].map(function(i, key, list) {
      //     return {
      //       i: i.toString(),
      //       x: i * 20,
      //       y: 0,
      //       w: 20,
      //       h: 20,
      //       add: i === (list.length - 1).toString(),
      //       isResizable: true,
      //       static: false
      //     };
      //   }),
      items: JSON.parse(JSON.stringify(originalLayout)),
      newCounter: JSON.parse(JSON.stringify(originalCounter)),
      //   newCounter: 0,
      components: [],
      //   components: JSON.parse(JSON.stringify(originalComps)),
      //   divs: []
      divs: JSON.parse(JSON.stringify(originalDivs))
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
        id={i}
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
        // i: 'n' + Math.floor(Math.random() * 10000000),
        x: (this.state.items.length * 20) % (this.state.cols || 120),
        // y: Infinity, // puts it at the bottom

        y: 1,
        w: 20,
        h: 20,
        isResizable: true,
        static: false
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

  onLayoutChange = items => {
    this.setState({ items: items });
  };

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

  allowDrop = e => {
    e.stopPropagation();
  };
  save = () => {
    saveToLS('items', this.state.items);
    saveCounterToLS('newCounter', this.state.newCounter);
    saveDivsToLS('divs', this.state.divs);
    const divs = Array.from(document.querySelectorAll('.react-grid-item'));
    let divsArr = [...divs].map(div => {
      return {
        id: div.id,
        innerHTML: div.innerHTML,
        className: div.className
      };
    });
    this.setState({ divs: divsArr });

    // window.location.reload();

    console.log(this.state);
  };

  clear = () => {
    global.localStorage.clear();
    // this.setState({ items: JSON.parse(JSON.stringify(originalLayout)) });
    this.setState({ items: [], newCounter: 0 });
    window.location.reload();
  };

  restore = () => {
    // let div = document.getElementById(this.state.divs[0].id);
    // //console.log(div.childNodes[3]);
    // let newDiv = document.createElement('div');
    // newDiv.innerHTML = this.state.divs[0].innerHTML;
    // div.appendChild(newDiv);
    for (let i = 0; i < this.state.divs.length; i++) {
      let div = this.state.divs[i];
      let domDiv = document.getElementById(div.id);
      let newDiv = document.createElement('div');
      newDiv.setAttribute('style', 'padding: 15px');
      newDiv.innerHTML = div.innerHTML;
      domDiv.appendChild(newDiv);
    }
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

        <Sidebar.Pushable
          as={Segment}
          style={{ backgroundColor: 'rgb(255, 208, 0)' }}
        >
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
                  components: [...this.state.components, <SidewaysCardForm />]
                });
              }}
            >
              <Icon name="address card" />
              Sideways Card
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
                  <button onClick={this.save}>SAVE</button>
                  <button onClick={this.clear}>CLEAR</button>
                  <button onClick={this.restore}>RESTORE</button>
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
                      //   layout={this.state.layout}
                      style={{
                        width: '1200px',
                        minHeight: '1000px',
                        // border: '1px solid blue',
                        backgroundColor: 'white'
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
