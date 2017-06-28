/**
 * Created by Han on 6/21/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";


class PostArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            results: [],
            contents: [],
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({post: event.target.value});
    }

    handleSubmit(event) {
        var self = this;
        axios.post('/api/v1/posts/',
            {user: 8, post: this.state.post}).then(function (response) {
            console.log('saved successfully');
            self.setState({
                results: self.state.results.concat(response.data), // add the new data to old json data set
                message: 'I just made a new post!',
            });
        }).catch(function (error) {
            console.log(error);
        });

        // alert('A post was submitted: ' + this.state.message);
        event.preventDefault();
    }

    componentDidMount() {
        var self = this;
        axios.get('/api/v1/posts/').then(function (response) {
            console.log(response.data);
            self.setState({
                results: response.data,
                message: 'load all post data!',
            });
        }).catch(function (error) {
            console.log(error);
        });

        // axios({
        //     method:'get',
        //     url:'/api/v1/posts/'
        // }).then(function(response) {
        //     console.log(response.data);
        //     self.setState({
        //         results: response.data,
        //         message: 'load all post data!',
        //     });
        // }).catch(function(error) {
        //     console.log(error);
        // });
    }

    render() {
        return (
            <div>
                <PostBox
                    handleSubmit={this.handleSubmit}
                    post={this.state.post}
                    handleChange={this.handleChange}/>
                <PostsList results={this.state.results} message={this.state.message}/>
            </div>
        );
    }
}


class PostsList extends React.Component {
    render() {
        // map the array of objects
        const listItems = this.props.results.map((post, index) => {
            return <li key={index}> {post.user} - {post.post} </li>
        });
        const load_state = this.props.message;

        return (
            <ul>
                {load_state}
                {listItems}
            </ul>
        );
    }
}


class PostBox extends React.Component {
    render() {
        return (
            <form>
                <input type="text" value={this.props.post} onChange={this.props.handleChange}/>
                <p>
                    <button onClick={this.props.handleSubmit}> Submit</button>
                </p>
            </form>
        );
    }
}


// export this class so that it could be imported by App.js.
module.exports = {
    PostArea: PostArea,
}

// export default PostArea;
