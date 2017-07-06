/**
 * Created by Han on 6/27/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";


const styleSheet = createStyleSheet('UserCenter', theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    button: {
        margin: theme.spacing.unit,
        padding: '0 30px',
    },
}));


class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            home: '',
            introduction: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // handleImageChange(event) {
    //     const path='/media/user_pic/';
    //     let reader = new FileReader();
    //     let file = event.target.files[0];
    //     console.log(file);
    //
    //     reader.onloadend = () => {
    //         this.setState({
    //             file: path.concat(file.name),
    //             //imagePreviewUrl: reader.result
    //         });
    //     };
    //
    //     reader.readAsDataURL(file);
    // }

    handleSubmit(event) {
        let self = this;
        const updateInfo = {
            name: this.state.name,
            location: this.state.location,
            home: this.state.home,
            short_description: this.state.introduction
        };

        axios.put('/api/v1/users/5/', updateInfo).then(response => {
            console.log('updated successfully');
        }).catch(error => {
            console.log(error);
        });

        event.preventDefault();
    }

    componentDidMount() {
        let self = this;
        axios.get('/api/v1/users/5/').then(response => {
            console.log(response.data);
            self.setState({
                name: response.data['name'],
                location: response.data['location'],
                home: response.data['home'],
                introduction: response.data['short_description']
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                <form encType="multipart/form-data">
                    <TextField
                        name="name"
                        label="Edit your name"
                        className={classes.input}
                        type="text"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        marginForm
                    />
                    <br/>
                    <TextField
                        name="location"
                        label="Edit your location"
                        className={classes.input}
                        type="text"
                        value={this.state.location}
                        onChange={this.handleInputChange}
                        marginForm
                    />
                    <br/>
                    <TextField
                        name="home"
                        label="Edit your home address"
                        className={classes.input}
                        type="text"
                        value={this.state.home}
                        onChange={this.handleInputChange}
                        marginForm
                    />
                    <br/>
                    <TextField
                        name="introduction"
                        label="Edit your introduction"
                        className={classes.input}
                        multiline
                        rows="3"
                        value={this.state.introduction}
                        onChange={this.handleInputChange}
                        marginForm
                    />
                    <br/>
                    <Button
                        raised
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmit}>
                        Update
                    </Button>
                </form>
            </div>
        );
    }
}

UserCenter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(UserCenter);
