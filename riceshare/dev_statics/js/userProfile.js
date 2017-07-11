/**
 * Created by Han on 7/5/2017.
 */

import React from 'react';
// import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";


const styleSheet = createStyleSheet('ControlPanel', theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 150,
        height: 150,
    },
    infoDiv: {
        margin: theme.spacing.unit * 2,
    },
    singleLineText: {
        display: 'inline-block',
    },
    bullet: {
        display: 'inline-block',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        transform: 'scale(0.8)',
    },
    button: {
        verticalAlign: 'middle',
        margin: theme.spacing.unit,
        padding: '0 30px',
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 500,
    },
}));


class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            location: '',
            home: '',
            introduction: '',
            following: 0,
            isEdit: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCheckFollowingClick = this.handleCheckFollowingClick.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUpdateSubmit(event) {
        let self = this;
        console.log(this.state.username);
        const updateInfo = {
            username: this.state.username,
            name: this.state.name,
            location: this.state.location,
            home: this.state.home,
            short_description: this.state.introduction,
        };

        axios.put('/api/v1/users/3/', updateInfo).then(response => {
            console.log('updated successfully');
            self.setState({
                isEdit: false,
            });
        }).catch(error => {
            console.log(error);
        });

        event.preventDefault();
    }

    handleEditClick() {
        this.setState({isEdit: true});
    }

    handleCheckFollowingClick() {
        console.log('click!');
    }

    componentDidMount() {
        let self = this;
        // could change to user in database
        axios.get('/api/v1/users/3/').then(response => {
            console.log(response.data);
            console.log(response.data['saved_users']);
            console.log(response.data['saved_users'].length);
            self.setState({
                username: response.data['username'],
                name: response.data['name'],
                location: response.data['location'],
                home: response.data['home'],
                introduction: response.data['short_description'],
                following: response.data['saved_users'].length,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const isEdit = this.state.isEdit;
        const classes = this.props.classes;

        let div = null;
        if (isEdit) {
            div =
                <UpdateProfileForm
                    myClassStyle={classes}
                    name={this.state.name}
                    location={this.state.location}
                    home={this.state.home}
                    introduction={this.state.introduction}
                    handleInputChange={this.handleInputChange}
                    handleUpdateSubmit={this.handleUpdateSubmit}
                />;
        } else {
            div =
                <UserProfile
                    myClassStyle={classes}
                    username={this.state.username}
                    name={this.state.name}
                    location={this.state.location}
                    home={this.state.home}
                    introduction={this.state.introduction}
                    following={this.state.following}
                    handleEditClick={this.handleEditClick}
                    handleCheckFollowingClick={this.handleCheckFollowingClick}
                />;
        }

        return (
            <div className={classes.root}>
                <Grid container gutter={24}>
                    <Grid item xs>
                    </Grid>

                    <Grid item md={6}>
                        {div}
                    </Grid>

                    <Grid item xs>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


class UserProfile extends React.Component {
    render() {
        const classes = this.props.myClassStyle;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Grid container>
                <Grid item sm={12} md={4}>
                    <Avatar
                        alt=""
                        src="../../media/user_pic/Lin1.jpg"
                        className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                </Grid>
                <Grid item sm={12} md={8}>
                    <div className={classes.infoDiv}>
                        <Typography type="display1" gutterBottom>
                            {this.props.username}
                            <Button className={classes.button} onClick={this.props.handleEditClick}>
                                Edit
                            </Button>
                        </Typography>
                    </div>
                    <div className={classes.infoDiv}>
                        <Typography type="body1" component="p">
                            <Typography className={classes.singleLineText} type="body1" component="p">
                                1 post</Typography>{bull}
                            <Typography className={classes.singleLineText} type="body1" component="p"
                                        onClick={this.props.handleCheckFollowingClick}>
                                {this.props.following} following</Typography>{bull}
                            <Typography className={classes.singleLineText} type="body1" component="p">
                                2 followed</Typography>
                        </Typography>
                    </div>
                    <div className={classes.infoDiv}>
                        <Typography type="subheading" component="h2">
                            {this.props.name}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        );
    }
}


class UpdateProfileForm extends React.Component {
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

    render() {
        const classes = this.props.myClassStyle;

        return (
            <div className={classes.container}>
                <form encType="multipart/form-data">
                    <TextField
                        name="name"
                        label="Edit your name"
                        className={classes.input}
                        type="text"
                        value={this.props.name}
                        onChange={this.props.handleInputChange}
                        InputProps={{placeholder: 'Name'}}
                        marginForm
                    />
                    <br/>
                    <TextField
                        name="location"
                        label="Edit your location"
                        className={classes.input}
                        type="text"
                        value={this.props.location}
                        onChange={this.props.handleInputChange}
                        InputProps={{placeholder: 'Location'}}
                        marginForm
                    />
                    <br/>
                    <TextField
                        name="home"
                        label="Edit your home address"
                        className={classes.input}
                        type="text"
                        value={this.props.home}
                        onChange={this.props.handleInputChange}
                        InputProps={{placeholder: 'Home'}}
                        marginForm
                    />
                    <br/>
                    <TextField
                        name="introduction"
                        label="Edit your introduction"
                        className={classes.input}
                        multiline
                        rows="3"
                        type="text"
                        value={this.props.introduction}
                        onChange={this.props.handleInputChange}
                        InputProps={{placeholder: 'Introduction'}}
                        marginForm
                    />
                    <br/>
                    <Button
                        raised
                        color="primary"
                        className={classes.button}
                        onClick={this.props.handleUpdateSubmit}>
                        Update
                    </Button>
                </form>
            </div>
        );
    }
}


ControlPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styleSheet)(ControlPanel);
module.exports = {
    ControlPanel: withStyles(styleSheet)(ControlPanel),
};
