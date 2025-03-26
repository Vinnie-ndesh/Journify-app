import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors } from '../constants/AppColors';
import { ProfilePage, Dashboard, Journals } from '../screens/app/AppModule';

const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.white,
        tabBarInactiveTintColor: AppColors.black,
        tabBarStyle: {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderColor: 'transparent',
          backgroundColor: AppColors.AppBlue,
          marginHorizontal: 20,
          marginBottom: Platform.OS === 'ios' ? '5%' : '2%',
          maxHeight: 60,
          overflow: 'hidden',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Nunito-Bold',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Analysis',
          tabBarIcon: () => (
            <AntDesign name="solution1" color="white" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Journals"
        component={Journals}
        options={{
          tabBarLabel: 'Journals',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="chat-plus-outline"
              color="white"
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Feather name="user" color="white" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNav;
