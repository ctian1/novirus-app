import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../Profile';
import Home from '../Home';
import Report from '../Report';
import Details from '../Details';

import homeIcon from 'assets/ic_home/ic_home.png';
// import { mdiThermometerAlert } from '@mdi/js';
import { Icon } from 'react-native-elements'
import settingsIcon from 'assets/ic_settings/ic_settings.png';
import Colors from 'helpers/Colors';

const iconForTab = ({ state }) => {
  switch (state.routeName) {
    case 'Home':
      return 'map-outline';
    case 'Report':
      return 'thermometer-alert';
    case 'Profile':
      return 'account';
    default:
      return null;
  }
};

const TabIcon = ({ icon, tintColor }) => (// eslint-disable-line
  // <Image
  //   source={icon}
  //   style={{ tintColor }}
  // />
  <Icon
    type={"material-community"}
    name={icon}
    size={30}
    color={tintColor}/>
);

const ProfileStack = createStackNavigator({ Profile });
const HomeStack = createStackNavigator({ Home, Details });
const ReportStack = createStackNavigator({ Report });
const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Report: ReportStack,
    Profile: ProfileStack,
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.red,
      inactiveTintColor: Colors.gray,
      style: {
        backgroundColor: Colors.White,
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (// eslint-disable-line
        <TabIcon
          icon={iconForTab(navigation)}
          tintColor={tintColor}
        />
      ),
    }),
  },
);

export default AppStack;
