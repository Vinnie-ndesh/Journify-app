import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AddJournal, ContactUs, EditJournal, LandingPage, ViewJournal} from '../screens/app/AppModule';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="ViewJournal" component={ViewJournal} />
      <Stack.Screen name="AddJournal" component={AddJournal} />
      <Stack.Screen name="EditJournal" component={EditJournal} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
};

export default AppStack;
