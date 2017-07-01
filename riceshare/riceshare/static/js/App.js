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
import Cookies from 'js-cookie'
import axios from 'axios'
//import { Content } from './content.js'

class Home extends React.Component{
  render() {
  	return (
  	  <div>
  	    Home!!!
  	  </div>
  	);
  }
}




class SellerForm extends React.Component  {
  constructor(props)  {
    super(props);
    this.state = {

      introduction: '',
      goal: '',
      chef_type: '',
      chef_experience: '',
      cuisine_type: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    const sellerInfo = {
      user: 1,
      introduction: this.state.introduction,
      goal: this.state.goal,
      chef_type: this.state.chef_type,
      chef_experience: this.state.chef_experience,
      cuisine_type: this.state.cuisine_type,
    };
    //alert(sellerInfo.introduction);

    this.handleAjaxRequest(sellerInfo);

  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const id = target.id

    this.setState({
      [id]: value 
    });
  }

  handleAjaxRequest(sellerInfo) {
    const csrftoken=Cookies.get('csrftoken');
    console.log(csrftoken)
    let request = axios({
          method: 'post',
          url: '/api/v1/seller/',
          data: sellerInfo, 
          headers: {'X-CSRFToken': csrftoken}
        });

    request.then(response => {
            console.debug(response.data);
      })
        .catch(error => {
            console.error(error);
        })

  }

  render()  {
    return  (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <label>Introduction 
            <input 
              id='introduction'
              type='text'
              autoComplete='off'
              value={this.state.introduction}
              onChange={this.handleChange}
            />
          </label>

          <br />
          
          <label>Goal
            <select 
              id='goal'
              value={this.state.goal} 
              onChange={this.handleChange}>
                <option value="Earn money">Earn Money</option>
                <option value="Meet new friends">Meet new friends</option>
                <option value="Personal interests">Personal interests</option>
            </select>
          </label>

          <br />

          <label>Chef_type
            <select 
              id='chef_type'
              value={this.state.chef_type} 
              onChange={this.handleChange}>
                <option value="Not sure">chef1</option>
                <option value="Not sure">chef2</option>
                <option value="Not sure">chef3</option>
            </select>
          </label>

          <br />

          <label>Chef_experience
            <select 
              id='chef_experience' 
              value={this.state.chef_experience} 
              onChange={this.handleChange}>
                <option value="Newbie">New-bie</option>
                <option value="Self-taught">Self taught</option>
                <option value="Professional">Professional</option>
                <option value="Other">Other</option>
            </select>
          </label>

          <br />

          <label>Cuisine_type
            <select 
              id='cuisine_type'
              value={this.state.cuisine_type} 
              onChange={this.handleChange}>
                <option value="Asian">Asian</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Mexican">Mexican</option>
                <option value="Spanish">Spanish</option>
                <option value="Italian">Italian</option>
                <option value="American">American</option>
                <option value="French">French</option>
            </select>
          </label>

          <br />

          <button
            type='submit'
            disabled={!this.state.introduction}>
            submit
          </button>


        </form>
      </div>
    )
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


class NavBar extends React.Component{


    render() {
	  return (
    	<Navbar>
		    <Navbar.Header>
		      <LinkContainer to="/">
		      	<Navbar.Brand>
		          Riceshare
		        </Navbar.Brand>
		      </LinkContainer>
		    </Navbar.Header>

		      <Navbar.Form bsSize="sm">
		        <FormGroup>
		          <FormControl type="text" placeholder="Search" />
		        </FormGroup>
		        {' '}
		        <Button type="submit">Submit</Button>
		      </Navbar.Form>
		      <Nav pullRight>
		        <LinkContainer to="/about"><NavItem eventKey={1}>About</NavItem></LinkContainer>
		        <LinkContainer to="/topics"><NavItem eventKey={2}>Topics</NavItem></LinkContainer>
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
      <Router>
    	<div>
    	  <NavBar />

    	  <hr />
        
          <Route exact path="/" component={Home} />
          <Route path="/about" component={SellerForm} />
          <Route path="/topics" component={Topics} />

    	</div>
      </Router>
    );
  }

  
};


ReactDOM.render(
		<App />,
		document.getElementById('react-root')
	);