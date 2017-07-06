import React from 'react';
import ReactDOM from 'react-dom';
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

// import {ChatRoom} from './chatRoom.js'
import PostArea from './postArea.js';
import UserCenter from './userCenter.js';
import UserProfile from './userProfile.js';
import CardTest from './cardTest.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class Home extends React.Component {
    render() {
        return (
            <div>
                Home!!!
            </div>
        );
    }
}


class About extends React.Component {
    render() {
        return (
            <div>
                About
            </div>
        );
    }
}


class Topics extends React.Component {
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


class Profile extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <UserProfile />
            </MuiThemeProvider>
        );
    }
}


class Card extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <CardTest />
            </MuiThemeProvider>
        )
    }
}


class User extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <UserCenter />
            </MuiThemeProvider>
        );
    }
}


class NavBar extends React.Component {
    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <LinkContainer to="/react">
                        <Navbar.Brand>
                            Riceshare
                        </Navbar.Brand>
                    </LinkContainer>
                </Navbar.Header>

                <Navbar.Form pullLeft>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search"/>
                    </FormGroup>
                    {' '}
                    <Button type="submit">Submit</Button>
                </Navbar.Form>
                <Nav pullRight>
                    <LinkContainer to="/react/about"><NavItem eventKey={1}>About</NavItem></LinkContainer>
                    <LinkContainer to="/react/topics"><NavItem eventKey={2}>Topics</NavItem></LinkContainer>
                    <LinkContainer to="/react/postArea"><NavItem eventKey={4}>Test</NavItem></LinkContainer>
                    <LinkContainer to="/react/userProfile"><NavItem eventKey={5}>Profile</NavItem></LinkContainer>
                    <LinkContainer to="/react/cardTest"><NavItem eventKey={6}>Card</NavItem></LinkContainer>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <LinkContainer to="/react/userCenter"><MenuItem eventKey={3.1}>My
                            Account</MenuItem></LinkContainer>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>

            </Navbar>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />

                    <hr />

                    <Route exact path="/react" component={Home}/>
                    <Route path="/react/about" component={About}/>
                    <Route path="/react/topics" component={Topics}/>
                    <Route path="/react/postArea" component={PostHome}/>
                    <Route path="/react/userProfile" component={Profile}/>
                    <Route path="/react/cardTest" component={Card}/>
                    <Route path="/react/userCenter" component={User}/>

                </div>
            </Router>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('react-root')
);
