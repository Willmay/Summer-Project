/**
 * Created by Han on 6/21/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        post: '',
        results: [],
        contents: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({post: event.target.value});
  }

  handleSubmit(event) {
      axios.post('http://localhost:8000/api/v1/posts/',
          {user: 5, post: this.state.post}).then(function(response){
          console.log('saved successfully')
      }).catch(function(error) {
          console.log(error);
      });
      alert('A post was submitted: ' + this.state.post);
      event.preventDefault();
  }

  componentDidMount() {
      var self = this;
      axios.get('http://localhost:8000/api/v1/posts/').then(function(response) {
          console.log(response.data);
          self.setState({
              results: response.data,
          });
      }).catch(function(error) {
          console.log(error);
      });
  }

  render() {
      return (
          <div>
            <InBox
                handleSubmit={this.handleSubmit}
                post={this.state.post}
                handleChange={this.handleChange} />
            <PostsArea results={this.state.results}/>
          </div>
      );
  }
};


class PostsArea extends React.Component{
	render() {
	    // map the array of objects
        const listItems = this.props.results.map((post, index) => {
            return <li key={index}>{post.user} - {post.post}</li>
        });

        return (
            <ul>
                {listItems}
            </ul>
        );
	}
}


class InBox extends React.Component{
	render() {
		return (
			<form>
				<input type="text" value={this.props.post} onChange={this.props.handleChange} />
				<p>
				  <button onClick={this.props.handleSubmit}> Submit </button>
				</p>
			</form>
		);
	}
}

export default Search;
