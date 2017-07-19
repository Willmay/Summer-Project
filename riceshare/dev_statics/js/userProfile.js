/**
 * Created by Han on 7/5/2017.
 */

import React from 'react';
// import ReactDOM from 'react-dom';

import {
    Nav,
    NavItem,
    Tab,
    Col,
    Row,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import {FormControl, FormGroup} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import List, {ListItem, ListItemAvatar, ListItemText} from 'material-ui/List';
import Dialog, {DialogTitle} from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";


const styleSheet = createStyleSheet('ControlPanel', theme => ({
    // for main component
    root: {
        flexGrow: 1,
        marginTop: 30,
    },

    // for profile component
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

    // for update form component
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    profileForm: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        width: '100%',
    },
    formButton: {
        verticalAlign: 'middle',
        // marginRight: theme.spacing.unit,
        padding: '0 30px',
    },
    nameInput: {
        marginBottom: theme.spacing.unit,
    },

    // for dialog component
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
}));


class ControlPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            name: '',
            photo: null,
            location: '',
            home: '',
            introduction: '',
            followings: [],
            followingCount: 0,
            isEdit: false,
            isEditPhoto: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let value = null;

        if (target.type == 'file') {
            this.setState({isEditPhoto: true});
            value = target.files[0];
        } else {
            value = target.value;
        }
        // const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUpdateSubmit(event) {
        event.preventDefault();

        let self = this;
        console.log(this.state.photo);

        let updateInfo = new FormData();
        updateInfo.append('username', this.state.username);
        updateInfo.append('name', this.state.name);
        if (this.state.isEditPhoto) {
            updateInfo.append('photo', this.state.photo);
        }
        updateInfo.append('location', this.state.location);
        updateInfo.append('home', this.state.home);
        updateInfo.append('short_description', this.state.introduction);

        axios.put('/api/v1/users/3/', updateInfo, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            console.log('updated successfully');
            console.log(response);
            self.setState({
                isEdit: false,
                photo: response.data['photo'],
                isEditPhoto: false,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    handleEditClick() {
        this.setState({isEdit: true});
    }

    componentDidMount() {
        console.log('load!');
        let self = this;
        // could change to user in database
        axios.get('/api/v1/users/3/').then(response => {
            console.log(response.data);
            console.log(response.data['saved_users']);
            self.setState({
                username: response.data['username'],
                name: response.data['name'],
                photo: response.data['photo'],
                location: response.data['location'],
                home: response.data['home'],
                introduction: response.data['short_description'],
                followings: response.data['saved_users'],
                followingCount: response.data['saved_users'].length,
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
                <Grid item md={8}>
                    <UpdateProfileTab
                        myClassStyle={classes}
                        name={this.state.name}
                        photo={this.state.photo}
                        location={this.state.location}
                        home={this.state.home}
                        introduction={this.state.introduction}
                        handleInputChange={this.handleInputChange}
                        handleUpdateSubmit={this.handleUpdateSubmit}
                    />
                </Grid>;
        } else {
            div =
                <Grid item md={6}>
                    <UserProfile
                        myClassStyle={classes}
                        username={this.state.username}
                        name={this.state.name}
                        photo={this.state.photo}
                        location={this.state.location}
                        home={this.state.home}
                        introduction={this.state.introduction}
                        followings={this.state.followings}
                        followingCount={this.state.followingCount}
                        handleEditClick={this.handleEditClick}
                    />
                </Grid>;
        }

        return (
            <div className={classes.root}>
                <Grid container gutter={24}>
                    <Grid item xs>
                    </Grid>

                    {div}

                    <Grid item xs>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleRequestClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    render() {
        const classes = this.props.myClassStyle;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Grid container>
                <Grid item sm={12} md={4}>
                    <Avatar
                        alt=""
                        src={this.props.photo}
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
                                        onClick={this.handleOpen}>
                                {this.props.followingCount} following</Typography>{bull}
                            <Typography className={classes.singleLineText} type="body1" component="p">
                                2 followed</Typography>
                        </Typography>
                    </div>
                    <div className={classes.infoDiv}>
                        <Typography type="subheading" component="h2">
                            {this.props.name}
                        </Typography>
                    </div>
                    <FollowingDialog
                        myClassStyle={classes}
                        followings={this.props.followings}
                        open={this.state.open}
                        handleRequestClose={this.handleRequestClose}
                    />
                </Grid>
            </Grid>
        );
    }
}


class UpdateProfileTab extends React.Component {
    render() {
        const classes = this.props.myClassStyle;

        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={3}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first">
                                Edit Profile
                            </NavItem>
                            <NavItem eventKey="second">
                                Change Password
                            </NavItem>
                        </Nav>
                    </Col>

                    <Col sm={9}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                <form className={classes.profileForm} encType="multipart/form-data">
                                    <FormControl fullWidth>
                                        <TextField
                                            name="name"
                                            className={classes.nameInput}
                                            label="Edit your name"
                                            type="text"
                                            value={this.props.name}
                                            onChange={this.props.handleInputChange}
                                            InputProps={{placeholder: 'Name'}}
                                        />
                                    </FormControl>
                                    <FormControl marginForm>
                                        <input
                                            name="photo"
                                            type="file"
                                            onChange={this.props.handleInputChange}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            name="location"
                                            label="Edit your location"
                                            type="text"
                                            value={this.props.location}
                                            onChange={this.props.handleInputChange}
                                            InputProps={{placeholder: 'Location'}}
                                            marginForm
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            name="home"
                                            label="Edit your home address"
                                            type="text"
                                            value={this.props.home}
                                            onChange={this.props.handleInputChange}
                                            InputProps={{placeholder: 'Home'}}
                                            marginForm
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            name="introduction"
                                            label="Edit your introduction"
                                            multiline
                                            rows="3"
                                            type="text"
                                            value={this.props.introduction}
                                            onChange={this.props.handleInputChange}
                                            InputProps={{placeholder: 'Introduction'}}
                                            marginForm
                                        />
                                    </FormControl>
                                    <FormGroup row>
                                        <Button
                                            raised
                                            color="primary"
                                            className={classes.formButton}
                                            onClick={this.props.handleUpdateSubmit}>
                                            Update
                                        </Button>
                                    </FormGroup>
                                </form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <form className={classes.profileForm}>
                                    <FormControl fullWidth>
                                        <TextField
                                            name="oldPwd"
                                            className={classes.nameInput}
                                            label="Input your old password"
                                            type="password"
                                            InputProps={{placeholder: 'Old Password'}}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            name="newPwd"
                                            label="Input your new password"
                                            type="password"
                                            InputProps={{placeholder: 'New Password'}}
                                            marginForm
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            name="confirmPwd"
                                            label="Input again"
                                            type="password"
                                            InputProps={{placeholder: 'Confirm Password'}}
                                            marginForm
                                        />
                                    </FormControl>
                                    <FormGroup row>
                                        <Button
                                            raised
                                            color="primary"
                                            className={classes.formButton}>
                                            Confirm
                                        </Button>
                                    </FormGroup>
                                </form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}


class FollowingDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classes = this.props.myClassStyle;

        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onRequestClose={this.props.handleRequestClose}
                    transition={<Slide direction="up"/>}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.props.handleRequestClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                My Followings
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <ListItemText primary="username 1" secondary="name 1"/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="username 2" secondary="name 2"/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}


FollowingDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

ControlPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styleSheet)(ControlPanel);
module.exports = {
    ControlPanel: withStyles(styleSheet)(ControlPanel),
};
