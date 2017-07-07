/**
 * Created by Han on 6/21/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {MuiThemeProvider} from 'material-ui/styles';

import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";


const styles = {
    card: {
        maxWidth: 345,
        margin: 20,
    },
};


class PostArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            results: [],
            contents: [],
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({post: event.target.value});
    }

    handleSubmit(event) {
        let self = this;
        axios.post('/api/v1/posts/',
            {user: 3, post: this.state.post}).then(response => {
            console.log('saved successfully');
            self.setState({
                results: self.state.results.concat(response.data), // add the new data to old json data set
                message: 'I just made a new post!',
            });
        }).catch(error => {
            console.log(error);
        });

        // alert('A post was submitted: ' + this.state.message);
        event.preventDefault();
    }

    componentDidMount() {
        let self = this;
        axios.get('/api/v1/posts/').then(response => {
            console.log(response.data);
            self.setState({
                results: response.data,
                message: 'load all post data!',
            });
        }).catch(error => {
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
        const classes = this.props.classes;
        const listItems = this.props.results.map((post, index) => {
            return (
                <div key={index}>
                    <Card style={styles.card}>
                        <CardMedia>

                        </CardMedia>
                        <CardContent>
                            <Typography type="headline" component="h2">
                                {post.user}
                            </Typography>
                            <Typography component="p">
                                {post.post}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button dense color="primary">
                                Share
                            </Button>
                            <Button dense color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            );
        });
        const load_state = this.props.message;

        return (
            <div>
                {load_state}
                {listItems}
            </div>
        );
    }
}


class PostBox extends React.Component {
    render() {
        return (
            <form>
                <input type="text" value={this.props.post} onChange={this.props.handleChange}/>
                <p>
                    <button onClick={this.props.handleSubmit}>Submit</button>
                </p>
            </form>
        );
    }
}


// export this class so that it could be imported by App.js.
export default PostArea;
// module.exports = {
//     PostArea: PostArea,
// }
