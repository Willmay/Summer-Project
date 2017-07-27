import React from 'react';
import { StyleSheet, Text, View, Button, Platform  } from 'react-native';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import configureStore from './configureStore.js';
import { UserProfile } from './components/userProfile';

const store = configureStore();

class HomeScreen extends React.Component {
  render() {
    return <Text>Home</Text>
  }
}

const MainScreenNavigator = TabNavigator(
  {
    Home: {
     screen: HomeScreen, 
     navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialCommunityIcons
          name={focused? 'home' : 'home-outline' }
          size={26}
          style={{ color: tintColor }}
        />
      ),
     },
    },
    Search: {
     screen: HomeScreen, 
     navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name='search'
          size={26}
          style={{ color: tintColor }}
        />
      ),
     },
    },
    AddPost: {
     screen: HomeScreen, 
     navigationOptions: {
      tabBarLabel: 'Post',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialCommunityIcons
          name='plus-circle-outline'
          size={26}
          style={{ color: tintColor }}
        />
      ),
     },
    },
    Chat: {
     screen: HomeScreen, 
     navigationOptions: {
      tabBarLabel: 'Chat',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={focused? 'chat-bubble' : 'chat-bubble-outline' }
          size={26}
          style={{ color: tintColor }}
        />
      ),
     },
    },
    Profile: {
     screen: UserProfile,
     navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={focused? 'person' : 'person-outline' }
          size={26}
          style={{ color: tintColor }}
        />
      ),
     },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainScreenNavigator />
          
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
