import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailsTab from './tabs/Details';
import HomeTab from './tabs/Home';
import SettingsTab from './tabs/Settings';

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

const tabNavigatorOptions = ({ route }: any) => ({
  tabBarIcon: ({ focused, color }: any) => {
    // let iconName = '';
    // switch (route.name) {
    //   case 'Home':
    //     iconName = focused ? 'home' : 'home-outline';
    //     break;
    //   case 'Details':
    //     iconName = focused ? 'list' : 'list-outline';
    //     break;
    //   case 'Settings':
    //     iconName = focused ? 'settings' : 'settings-outline';
    //     break;
    // }

    let tabName: keyof typeof iconNames = route.name;
    let iconName = iconNames[tabName][Number(!focused)];

    return <Ionicons name={iconName} color={color} size={styles.tabIconSize} />;
  },
});

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      // initialRouteName="Details"
      screenOptions={tabNavigatorOptions}
      keyboardHidesNavigationBar={false}
      // labeled={false}
      shifting={true}
      barStyle={styles.tabWhole}
      activeColor={styles.tabActive}
      inactiveColor={styles.tabInactive}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Details" component={DetailsTab} />
      <Tab.Screen name="Settings" component={SettingsTab} />
    </Tab.Navigator>
  );
}
