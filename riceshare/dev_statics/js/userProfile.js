/**
 * Created by Han on 7/5/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {
    LinkContainer
} from 'react-router-bootstrap';

import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";


const styleSheet = createStyleSheet('InfoArea', theme => ({
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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    link: {
        verticalAlign: 'middle', // vertically center
        marginLeft: theme.spacing.unit,
    },
    button: {
        padding: '0 30px',
    },
}));


class InfoArea extends React.Component {
    render() {
        const classes = this.props.classes;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <div className={classes.root}>
                <Grid container gutter={24}>
                    <Grid item xs>
                    </Grid>

                    <Grid item md={6}>
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
                                        Vincent_han
                                        <Button className={classes.button}>
                                            Edit
                                        </Button>
                                    </Typography>
                                </div>
                                <div className={classes.infoDiv}>
                                    <Typography type="body1" component="p">
                                        1 post {bull} 1 follower {bull} 2 followed
                                    </Typography>
                                </div>
                                <div className={classes.infoDiv}>
                                    <Typography type="subheading" component="h2">
                                        Wenxuan Han
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

InfoArea.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(InfoArea);
