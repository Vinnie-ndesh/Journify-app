import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StatusBar} from 'react-native';
import {AppColors} from './src/constants/AppColors';

import {AuthContext, AuthProvider} from './src/routes/AuthContext';
import AuthStack from './src/routes/AuthStack';
import AppStack from './src/routes/AppStack';

const App = () => {
  const {isAuthenticated} = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const Main = () => {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.AppDarkBlue}
      />
      {/* <View
        style={{
          backgroundColor: AppColors.AppDarkBlue,
          paddingBottom: 10,
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
        }}>
        <Image
          source={require('./src/assets/images/logoh.png')}
          style={GlobalStyles.logo}
        />
      </View> */}
      <App />
    </AuthProvider>
  );
};

export default Main;
