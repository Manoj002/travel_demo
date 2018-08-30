import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import RegisterScreen from './screens/RegisterScreen';
import TrackScreen from './screens/TrackScreen';

export default class App extends Component {

  render() {

    const MainNavigation = createBottomTabNavigator({
      welcome: WelcomeScreen,
      register: RegisterScreen,
      auth: AuthScreen,
      trace: TrackScreen
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true,
      initialRouteName: "welcome"
    })

    return (

      <View
        style={{ flex: 1 }}
      >
        <MainNavigation />
      </View>

    );
  }
}
