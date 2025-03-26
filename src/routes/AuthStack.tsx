import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LoginPage,
    SignUp,
  WelcomePage,
} from '../screens/auth/AuthModule';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Login" component={LoginPage} />

      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
