import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TemplateView from '../views/TemplateView';

const styles = {
  tabWhole: {
    backgroundColor: 'white',
  },
  tabActive: 'forestgreen',
  tabInactive: 'gray',
  tabIconSize: 24,
};

const iconNames = {
  Home: ['home', 'home-outline'],
  Details: ['list', 'list-outline'],
  Settings: ['settings', 'settings-outline'],
};

const tabNavigatorOptions = ({route}: any) => ({
  tabBarIcon: ({focused, color}: any) => {
    let tabName: keyof typeof iconNames = route.name;
    let iconName = iconNames[tabName][Number(!focused)];

    return <Ionicons name={iconName} color={color} size={styles.tabIconSize} />;
  },
});

const Tab = createMaterialBottomTabNavigator();
export default function TabNavigator() {
  return (
    /*
        React Navigation complains about improper producing of
        components via inline functions. As this is for testing only,
        the warnings were ignored for now.
     */
    <Tab.Navigator
      // initialRouteName="Details"
      screenOptions={tabNavigatorOptions}
      keyboardHidesNavigationBar={false}
      // labeled={false}
      shifting={true}
      barStyle={styles.tabWhole}
      activeColor={styles.tabActive}
      inactiveColor={styles.tabInactive}
      /*  */
    >
      <Tab.Screen name="Home" component={() => TemplateView('Home')} />
      <Tab.Screen name="Details" component={() => TemplateView('Deets')} />
      <Tab.Screen name="Settings" component={() => TemplateView('Settings')} />
    </Tab.Navigator>
  );
}
