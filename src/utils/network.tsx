import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform} from 'react-native';

// Base URL for your API
const baseUrl = 'http://192.168.100.7:3040/v1/';

// Function to get the token from AsyncStorage
const getToken = async () => {
  const userCred = await AsyncStorage.getItem('userCred');
  if (!userCred) {
    return null;
  }
  const user = JSON.parse(userCred);
  return user.token;
};

// Function to refresh the token
const refreshToken = async () => {
  try {
    const response = await axios.get(`${baseUrl}users/refresh-token`);
    console.log('response refresh', response);
    if (response.status === 200) {
      await AsyncStorage.setItem('userCred', JSON.stringify(response.data));
      return response.data.token;
    } else {
      await logout();
      throw new Error('Token refresh failed. User logged out.');
    }
  } catch (error) {
    await logout();
    console.error('Error refreshing token:', error);
    throw error;
  }
};

const apiRequest = async (
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  url: string,
  data?: any,
) => {
  let token = await getToken();
  let attemptCount = 0;

  const makeRequest = async (_retry = false) => {
    try {
      const response = await axios({
        method,
        url: `${baseUrl}${url}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.status === 200 ||
        response.status === 206 ||
        response.status === 201
      ) {
        return {data: response.data, status: response.status, error: false};
      }

      return {
        error: true,
        status: response.status,
        data: response.data,
        message: `Request failed with status ${response.status}`,
      };
    } catch (err: any) {
      if (err.response && err.response.status === 403 && attemptCount === 0) {
        attemptCount += 1;
        const newToken = await refreshToken();

        token = newToken;
        return makeRequest(true);
      }

      if (axios.isAxiosError(err)) {
        const errorDetails = {
          error: true,
          message: err.message,
          code: err.code,
          status: err.response ? err.response.status : null,
          data: err.response ? err.response.data : null,
        };
        return errorDetails;
      } else {
        return {
          error: true,
          message: 'An unexpected error occurred',
          details: err,
        };
      }
    }
  };

  return makeRequest();
};

// Function to log the user out by clearing AsyncStorage
const logout = async () => {
  try {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
    } else if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export {getToken, baseUrl, apiRequest, logout};
