import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import {
	LinkContainer
} from 'react-router-bootstrap';
import {MuiThemeProvider} from 'material-ui/styles';

import {
  LoginForm,
  SignupForm
} from './UserManagement.js';
import {PostArea} from './postArea.js';
import {ControlPanel} from './userProfile.js';

import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore();

injectTapEventPlugin();

class Home extends React.Component{
  render() {
  	return (
  	  <div>
  	    Another1 Home!!!
  	  </div>
  	);
  }
}

class About extends React.Component{
  render() {
  	return (
  	  <div>
  	    About
  	  </div>
  	);
  }
}

class Topics extends React.Component{
  render() {
  	return (
  	  <div>
  	    Topics
  	  </div>
  	);
  }
}

class PostHome extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <PostArea />
            </MuiThemeProvider>
        );
    }
}

class UserHome extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <ControlPanel />
            </MuiThemeProvider>
        );
    }
}

class NavBar extends React.Component{

  constructor() {
    super();
    this.state = {
      isLogedIn: 'False',
    };
  }


  render() {
    let divs;
    if (this.state.isLogedIn == 'True') {
      divs = <Nav>
          <LinkContainer to="/react/postArea"><NavItem eventKey={5.4}>Test</NavItem></LinkContainer>
          <LinkContainer to="/react/userProfile"><NavItem eventKey={5.5}>Profile</NavItem></LinkContainer>
		  <LinkContainer to="/react/logout"><NavItem eventKey={5.3}>Logout</NavItem></LinkContainer>
	  </Nav>
    }
    else {
      divs = <Nav>
        <LinkContainer to="/react/login"><NavItem eventKey={5.1}>Login</NavItem></LinkContainer>
        <LinkContainer to="/react/signup"><NavItem eventKey={5.2}>Sign Up</NavItem></LinkContainer>
      </Nav>
    }
	  return (
    	<Navbar>
		    <Navbar.Header>
		      <LinkContainer to="/react">
		      	<Navbar.Brand>
		          Riceshare
		        </Navbar.Brand>
		      </LinkContainer>
		    </Navbar.Header>

		      <Navbar.Form pullLeft>
		        <FormGroup>
		          <FormControl type="text" placeholder="Search" />
		        </FormGroup>
		        {' '}
		        <Button type="submit">Submit</Button>
		      </Navbar.Form>
		      <Nav pullRight>
		        <LinkContainer to="/react/about"><NavItem eventKey={1}>About</NavItem></LinkContainer>
		        <LinkContainer to="/react/topics"><NavItem eventKey={2}>Topics</NavItem></LinkContainer>
            {divs}
		        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
		          <MenuItem eventKey={3.1}>Action</MenuItem>
		          <MenuItem eventKey={3.2}>Another action</MenuItem>
		          <MenuItem eventKey={3.3}>Something else here</MenuItem>
		          <MenuItem divider />
		          <MenuItem eventKey={3.4}>Separated link</MenuItem>
		        </NavDropdown>
		      </Nav>

  		</Navbar>
	  );
    }


};

class App extends React.Component{

  render() {

    return (
      <Provider store={store}>
        <Router>
        	<div>
        	  <NavBar />

        	  <hr />

              <Route exact path="/react" component={Home} />
              <Route path="/react/about" component={About} />
              <Route path="/react/topics" component={Topics} />
    		  <Route path="/react/postArea" component={PostHome}/>
              <Route path="/react/userProfile" component={UserHome}/>
              <Route path="/react/login" component={LoginForm} />
              <Route path="/react/signup" component={SignupForm} />

        	</div>
        </Router>
      </Provider>
    );
  }


};


ReactDOM.render(
		<App />,
		document.getElementById('react-root')
	);
