import React, { createContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../utils/network';


interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check the authentication status whenever the component mounts or AsyncStorage changes
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getToken();
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false); 
      }
    };

    checkLoginStatus();

  }, []);

  // Login function
  const login = () => {
    setIsAuthenticated(true);
  };

  // Logout function with AsyncStorage clearing
  const logout = async () => {
    setIsAuthenticated(false);

    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
    } else if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  };

  // Listen for AsyncStorage changes to automatically log the user out when storage is cleared
  useEffect(() => {
    const checkForStorageClear = async () => {
      const token = await getToken();

      if (!token) {
      logout();
      }
    };

 
    const interval = setInterval(checkForStorageClear, 1000); 


    return () => clearInterval(interval);
  }, []);

  const value = { isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
