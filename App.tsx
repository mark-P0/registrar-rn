import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HelloWorldView from './src/views/HelloWorldView';
import TabNavigator from './src/nav/TabNavigator';

/*
 *  Finalize install of `react-native-gesture-handler`
 *  https://reactnavigation.org/docs/5.x/getting-started
 */
import 'react-native-gesture-handler';

export default function App() {
  return (
    /*
     *  Wrap whole app with "React Navigation" container
     *  https://reactnavigation.org/docs/5.x/getting-started
     */
    <NavigationContainer>
      <TabNavigator></TabNavigator>
    </NavigationContainer>
  );
}
