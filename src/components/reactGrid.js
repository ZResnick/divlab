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
import { addAPage, getAllPages, editAPage } from '../store/pageReducer';
import { setHTML, paragraphContentParser } from '../utils/utils';

import {
  Button,
  // Header,
  Icon,
  // Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import { throwStatement, tsImportEqualsDeclaration } from '@babel/types';

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
  //   border: '1px solid #555',
  //
  minWidth: '250px',
  minHeight: '500px',
  margin: '32px',
};

class divlab extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 120, md: 100, sm: 60, xs: 40, xxs: 20 },

    rowHeight: 2,
    // onLayoutChange: this.onLayoutChange,
    // verticalCompact: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      items: [],
      newCounter: 0,
      components: [],
      usedComponents: [],
      // divs: [],
      html: '',
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.reactDomRender = this.reactDomRender.bind(this);
  }

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  componentDidMount() {
    this.props.auth.auth.uid &&
      this.props.getAllPages(this.props.auth.auth.uid);
    console.log(this.props);
    if (this.props.pages.length && this.props.match.params.id) {
      const newState = JSON.parse(
        this.props.pages.find(doc => doc.id === `${this.props.match.params.id}`)
          .data.pageData
      );

      // setTimeout(() => {
      // 	this.saveDivs();
      // }, 10);

      this.setState({
        ...newState,
        divs: this.state.divs,
      });
      setTimeout(() => {
        this.reactDomRender(this.state);
      }, 10);
      // this.setState({
      // 	divs: this.state.divs,
      // 	components: newState.components,
      // 	visible: newState.visible,
      // 	items: newState.items,
      // 	newCounter: newState.newCounter,
      // 	usedComponents: newState.usedComponents,
      // });
      // this.saveDivs();
    }

    // this.reactDomRender()
  }

  createElement(el) {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer',
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
        h: 20,
        isResizable: this.state.isResizable,
        static: this.state.static,
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
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

  // saveDivs = () => {
  // 	const divs = Array.from(document.querySelectorAll('.react-grid-item'));

  // 	let divsArr = [...divs].map(div => {
  // 		return {
  // 			id: div.id,
  // 			innerHTML: div.innerHTML,
  // 			className: div.className,
  // 		};
  // 	});
  // 	this.setState({
  // 		divs: divsArr,
  // 	});
  // };

  save = async () => {
    const html = setHTML();
    console.log(html);
    await this.setState({
      html,
    });
    if (this.props.match.params.id) {
      this.props.editAPage(
        this.props.auth.auth.uid,
        this.props.match.params.id,
        JSON.stringify(this.state)
      );
    } else {
      this.props.addAPage(this.props.auth.auth.uid, JSON.stringify(this.state));
    }
  };

  // Test injection method
  reactDomRender(state) {
    for (let i = 0; i < this.state.items.length; i++) {
      const temp = document.getElementById(`n${i}`);
      const newDiv = document.createElement('div');
      newDiv.id = `newDiv${i}`;
      temp.style.padding = '8px';
      temp.appendChild(newDiv);
      let component = (
        <ParagraphForm
          info={{ content: 'hello', id: `paragraph${i}`, edit: false }}
        />
      );
      ReactDOM.render(component, document.getElementById(`newDiv${i}`));
    }
  }

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
                  components: [...this.state.components, <CardForm />],
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
                  components: [...this.state.components, <ParagraphForm />],
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
                  flexDirection: 'row',
                }}
              >
                <div>
                  <Droppable style={droppableStyle1}>
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
                  {/* <Droppable id="dr2"> */}
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
                    Toggle Preview
                  </Button>
                  <Button onClick={this.onAddItem}>Add new container</Button>
                  <Button onClick={this.save}>Save</Button>
                  <Button onClick={paragraphContentParser}>Test</Button>
                  <Droppable>
                    <ResponsiveReactGridLayout
                      onLayoutChange={this.onLayoutChange}
                      style={{
                        width: '1200px',
                        minHeight: '1000px',
                        // border: '1px solid blue',
                        backgroundColor: 'white',
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

const mapStateToProps = state => {
  return {
    auth: state.firebase,
    profile: state.firebase.profile,
    pages: state.pages,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(divlab);
