import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions.js';
import { StyleSheet, Text, View, Button, Platform  } from 'react-native';

function mapStateToProps(state) {
  const { mainUser } = state;
  const {
    isFetching,
    lastUpdated,
    id
  } = mainUser || {
    isFetching: true,
    id: null
  };

  return {
    id,
    isFetching
  };
};

class userProfile extends React.Component{

  constructor() {
    super();
    this.state = {
      username: 'silenta18',
      password: 'abc12345678'
    };
  }

  componentDidMount() {
    this.props.dispatch(login(this.state.username, this.state.password));
  }

  render() {
    const {id, isFetching} = this.props;
    return (
        <View style={styles.container}>
          <Text> {id} </Text>
          <Text> {isFetching} </Text>
        </View>
    );
  };
};

const connectUserProfile = connect(mapStateToProps)(userProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = {
  UserProfile: connectUserProfile
}
