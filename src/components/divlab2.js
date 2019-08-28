import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
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
import {
  addAPage,
  getAllPages,
  editAPage,
  deleteAPage
} from '../store/pageReducer';
import { setHTML, regexer } from '../utils/utils';

import {
  Button,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Confirm
} from 'semantic-ui-react';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
  minWidth: '250px',
  minHeight: '500px',
  margin: '32px'
};

class divlabTwo extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    cols: { lg: 120, md: 100, sm: 60, xs: 40, xxs: 20 },
    rowHeight: 2
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      items: [],
      newCounter: 0,
      components: [],
      usedComponents: [],
      html: '',
      open: false,
      title: ''
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.reactDomRender = this.reactDomRender.bind(this);
  }

  //Opens and closes the delete modal
  show = () => this.setState({ open: true });
  handleConfirm = () => {
    this.setState({ open: false });
    this.props.deleteAPage(
      this.props.auth.auth.uid,
      this.props.match.params.id
    );
  };
  handleCancel = () => this.setState({ open: false });
  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  componentDidMount() {
    this.props.auth.auth.uid &&
      this.props.getAllPages(this.props.auth.auth.uid);
    if (this.props.pages.length && this.props.match.params.id) {
      const newState = JSON.parse(
        this.props.pages.find(doc => doc.id === `${this.props.match.params.id}`)
          .data.pageData
      );
      this.setState({ ...newState.canvas, html: newState.html });
      setTimeout(() => {
        this.reactDomRender(this.state);
      }, 10);
    }
  }

  save = async () => {
    const { items, visible, newCounter } = this.state;
    const html = setHTML();
    await this.setState({ html });

    if (this.props.match.params.id) {
      this.props.editAPage(
        this.props.auth.auth.uid,
        this.props.match.params.id,
        JSON.stringify({
          canvas: {
            items,
            visible,
            newCounter,
            components: [],
            usedComponents: [],
            title: this.state.title
          },
          html
        })
      );
    } else {
      await this.props.addAPage(
        this.props.auth.auth.uid,
        JSON.stringify({
          canvas: {
            items,
            visible,
            newCounter,
            components: [],
            usedComponents: []
          },
          html
        })
      );
    }
  };

  reactDomRender(state) {
    let data = regexer(state.html);
    if (data) {
      let counter = 0;
      for (let i = 0; i < data.length; i++) {
        let curEl = data[i];
        if (
          curEl === 'HeadshotComponent' ||
          curEl === 'ParagraphComponent' ||
          'CardComponent' ||
          'SidewaysCardComponent' ||
          'HeaderComponent'
        ) {
          switch (curEl) {
            case 'HeadshotComponent':
              let temp = document.getElementById(`n${counter}`);
              while (!temp) {
                counter++;
                temp = document.getElementById(`n${counter}`);
              }
              let newDiv = document.createElement('div');
              newDiv.id = `newDiv${counter}`;
              temp.style.padding = '8px';
              temp.appendChild(newDiv);
              ReactDOM.render(
                <HeadshotForm
                  info={{
                    imageUrl: data[i + 1],
                    id: `image${i}`,
                    edit: false
                  }}
                />,
                document.getElementById(`newDiv${counter}`)
              );
              counter++;
              break;
            case 'ParagraphComponent':
              let temp2 = document.getElementById(`n${counter}`);
              while (!temp2) {
                counter++;
                temp2 = document.getElementById(`n${counter}`);
              }
              let newDiv2 = document.createElement('div');
              newDiv2.id = `newDiv${counter}`;
              temp2.style.padding = '8px';
              temp2.appendChild(newDiv2);
              ReactDOM.render(
                <ParagraphForm
                  info={{
                    content: data[i + 1],
                    id: `paragraph${i}`,
                    edit: false
                  }}
                />,
                document.getElementById(`newDiv${counter}`)
              );
              counter++;
              break;
            case 'CardComponent':
              let temp3 = document.getElementById(`n${counter}`);
              while (!temp3) {
                counter++;
                temp3 = document.getElementById(`n${counter}`);
              }
              let newDiv3 = document.createElement('div');
              newDiv3.id = `newDiv${counter}`;
              temp3.style.padding = '8px';
              temp3.appendChild(newDiv3);
              ReactDOM.render(
                <CardForm
                  info={{
                    imageUrl: data[i + 1],
                    name: data[i + 2],
                    caption: data[i + 3],
                    description: data[i + 4],
                    footer: data[i + 5],
                    id: `paragraph${i}`,
                    edit: false
                  }}
                />,
                document.getElementById(`newDiv${counter}`)
              );
              counter++;
              break;
            case 'HeaderComponent':
              let temp4 = document.getElementById(`n${counter}`);
              while (!temp4) {
                counter++;
                temp4 = document.getElementById(`n${counter}`);
              }
              let newDiv4 = document.createElement('div');
              newDiv4.id = `newDiv${counter}`;
              temp4.style.padding = '8px';
              temp4.appendChild(newDiv4);
              ReactDOM.render(
                <HeaderForm
                  info={{
                    backgroundUrl: data[i + 1],
                    title: data[i + 2],
                    navlinks: '',
                    id: `paragraph${i}`,
                    edit: false
                  }}
                />,
                document.getElementById(`newDiv${counter}`)
              );
              counter++;
              break;
            case 'SidewaysCardComponent':
              let temp5 = document.getElementById(`n${counter}`);
              while (!temp5) {
                counter++;
                temp5 = document.getElementById(`n${counter}`);
              }
              let newDiv5 = document.createElement('div');
              newDiv5.id = `newDiv${counter}`;
              temp5.style.padding = '8px';
              temp5.appendChild(newDiv5);
              ReactDOM.render(
                <SidewaysCardForm
                  info={{
                    imageUrl: data[i + 1],
                    name: data[i + 2],
                    caption: data[i + 3],
                    description: data[i + 4],
                    id: `paragraph${i}`,
                    edit: false
                  }}
                />,
                document.getElementById(`newDiv${counter}`)
              );
              counter++;
              break;
            default:
              break;
          }
        }
      }
    }
  }

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

    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: 'n' + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 120),
        // y: Infinity, // puts it at the bottom

        y: 1,
        w: 20,
        h: 20
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
    this.setState({ items });
  };

  onRemoveItem(i) {
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  removeClass = () => {
    const divs = document.querySelectorAll('.react-resizable');
    divs.forEach(item => {
      item.classList.remove('react-resizable');
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show Components
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide Components
          </Button>
        </Button.Group>
        <div className="myProjects" style={{ marginTop: '20px' }}>
          <p>{this.state.title}</p>
        </div>
        <Sidebar.Pushable
          as={Segment}
          style={{ backgroundColor: 'rgb(92,0,41)' }}
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
                  components: [...this.state.components, <CardForm />],
                  visible: false
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
                  components: [...this.state.components, <SidewaysCardForm />],
                  visible: false
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
                  components: [...this.state.components, <HeaderForm />],
                  visible: false
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
                  components: [...this.state.components, <HeadshotForm />],
                  visible: false
                });
              }}
            >
              <Icon name="image" />
              Image
            </Menu.Item>

            <Menu.Item
              as="a"
              onClick={() => {
                this.setState({
                  components: [...this.state.components, <ParagraphForm />],
                  visible: false
                });
              }}
            >
              <Icon name="paragraph" />
              Paragraph
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <div style={{ marginBottom: '10px' }}>
                <Button
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
                    const divs = document.querySelectorAll('.react-grid-item');
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
                  <Icon name="eye" />
                  Toggle Preview
                </Button>
                <Button onClick={this.onAddItem}>
                  <Icon name="plus square" />
                  Add New Container
                </Button>
                <Button onClick={this.save}>
                  <Icon name="save" />
                  Save
                </Button>
                <Button
                  onClick={() => {
                    // let html = document.querySelector('html').innerHTML;
                    // html = '<html>\n' + html + '\n</html>';
                    let head = document.querySelector('head').innerHTML;
                    let canvas = document.querySelector('.react-grid-layout')
                      .innerHTML;
                    let html =
                      '<html>\n' +
                      head +
                      '<body style="background-color: white;">\n' +
                      '<div style="width: 1200px; margin: auto;">' +
                      canvas +
                      '</div>' +
                      '</body>\n' +
                      '\n</html>';
                    // console.log(canvas);

                    let download = document.createElement('a');
                    download.style.display = 'none';
                    download.setAttribute(
                      'href',
                      'data:text/html;charset=utf-8,' + encodeURIComponent(html)
                    );
                    download.setAttribute('download', 'index');
                    document.body.appendChild(download);
                    download.click();
                    document.body.removeChild(download);
                  }}
                >
                  <Icon name="download" />
                  Export
                </Button>
                <Button onClick={this.show}>
                  <Icon name="trash alternate" />
                  Delete Project
                </Button>
                <Confirm
                  open={this.state.open}
                  content="Are you sure you want to delete this project?"
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm}
                />
              </div>
              {/* Styling for centering grid here */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <div>
                  <Droppable
                    style={
                      this.state.components.length ? droppableStyle1 : null
                    }
                  >
                    {this.state.components.map((item, idx) => {
                      if (!this.state.usedComponents.includes(item)) {
                        this.state.usedComponents.push(item);
                      }
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
                  <Droppable>
                    <ResponsiveReactGridLayout
                      onLayoutChange={this.onLayoutChange}
                      style={{
                        width: '1200px',
                        minHeight: '1000px',
                        backgroundColor: 'white'
                      }}
                      {...this.props}
                    >
                      {_.map(this.state.items, el => {
                        return this.createElement(el);
                      })}
                    </ResponsiveReactGridLayout>
                  </Droppable>
                </div>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase,
    profile: state.firebase.profile,
    pages: state.pages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editAPage: (userId, pageId, pageContent) => {
      dispatch(editAPage(userId, pageId, pageContent));
    },
    addAPage: (userId, pageContent) => {
      dispatch(addAPage(userId, pageContent));
    },
    getAllPages: user => {
      dispatch(getAllPages(user));
    },
    deleteAPage: (userId, pageId) => {
      dispatch(deleteAPage(userId, pageId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(divlabTwo);
