import React from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

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
import {addAPage, getAllPages} from '../store/pageReducer'


import {
  Button,
  // Header,
  Icon,
  // Image,
  Menu,
  Segment,
  Sidebar,
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
      // items: [0, 1, 2, 3, 4].map(function(i, key, list) {
      //   return {
      //     i: i.toString(),
      //     x: i * 20,
      //     y: 0,
      //     w: 20,
      //     h: 20,
      //     add: i === (list.length - 1).toString(),
      //     isResizable: true,
      //     static: false,
      //   };
      // }),
			items: [],
      newCounter: 0,
			components: [],
			usedComponents: [],
			divs: [],
    };

    this.onAddItem = this.onAddItem.bind(this);
		this.onBreakpointChange = this.onBreakpointChange.bind(this);
		this.reactDomRender = this.reactDomRender.bind(this)
  }

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

	componentDidMount() {
		this.props.auth.auth.uid && this.props.getAllPages(this.props.auth.auth.uid);
		if (this.props.pages.length) {
			const state = JSON.parse(this.props.pages.find(doc => doc.id === 'fnvhkyWjAz4YDRW6qrSF').data.pageData);
			this.setState({...state})
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
        data-grid={el} id={i}
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

  onLayoutChange = (items) => {

    this.setState({ items});
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


	save = () => {
		const divs = Array.from(document.querySelectorAll('.react-grid-item'));
		let divsArr = [...divs].map(div => {
			return {
				id: div.id,
				innerHTML: div.innerHTML,
				className: div.className
			}
		})
		this.setState({
			divs: divsArr
		})

		this.props.addAPage(this.props.auth.auth.uid, JSON.stringify(this.state))

	}

	// Test injection method
	reactDomRender(state) {
		console.log('I am not working right...')
		if (document.getElementById(`n0`)) {
			console.log('I am testing...')
			for (let i = 0; i < this.state.divs.length; i++) {
				const temp = document.getElementById(`n${i}`);
				const newDiv = document.createElement('div')
				newDiv.id = `newDiv${i}`
				temp.appendChild(newDiv);
				ReactDOM.render(<ParagraphForm info={{content: 'hello', id: `paragraph${i}`, edit: false}} />, document.getElementById(`n${i}`))
			}
		}
	}

  render() {
		const { visible } = this.state;
		console.log(this.state)
		// console.log(this.props.pages)

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
												this.state.usedComponents.push(item)
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
                        '.edit-Button-on'
                      );
                      const editButtonsOff = document.querySelectorAll(
                        '.edit-Button-off'
                      );
                      const divs = document.querySelectorAll(
                        '.react-grid-item'
                      );
                      const xs = document.getElementsByName('X');

                      editButtonsOn.forEach(item => {
                        if (item.classList.contains('edit-Button-on')) {
                          item.classList.replace(
                            'edit-Button-on',
                            'edit-Button-off'
                          );
                        }
                      });

                      editButtonsOff.forEach(item => {
                        if (item.classList.contains('edit-Button-off')) {
                          item.classList.replace(
                            'edit-Button-off',
                            'edit-Button-on'
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
                  </Button>
                  <Button onClick={this.onAddItem}>Add Item</Button>
									<Button onClick={this.save}>Save</Button>
									<Button onclick={() => this.reactDomRender(this.state)}>Test</Button>
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
