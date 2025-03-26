import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from '../../styles/GlobalStyles';
import {AppColors} from '../../constants/AppColors';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native';
import {AuthContext} from '../../routes/AuthContext';
import CustomInput from '../../components/CustomInput';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import {apiRequest} from '../../utils/network';


const LoginPage = (props: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AuthContext);

  const savedataTolocal = async (data: any) => {
    console.log(data);
    data = JSON.stringify(data);
    await AsyncStorage.setItem('userCred', data).then(() => {
      setLoading(false);
      login();
    });
  };

  const Processlogin = async () => {
    if (!userName || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = {
        password,
        email: userName,
      };

      apiRequest('POST', 'users/login', data)
        .then(async (res: any) => {
          console.log(res);
          if (!res.error) {
            await savedataTolocal(res.data);
           
          } else {
            setLoading(false);
            Alert.alert('Failed', res.message);
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          Alert.alert('Error', err);
        });
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserNameChange = (val: string) => {
    setUserName(val);
    if (error) setError('');
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (error) setError('');
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollContainer}>
   
        <View style={styles.page}>
          <Image
            source={require('../../assets/images/login.png')}
            style={GlobalStyles.topScreenImages}
          />

          <Text style={GlobalStyles.titleBolder}>Login</Text>

          <View>
            {error.length > 0 && (
              <Text style={GlobalStyles.errorText}>{error}</Text>
            )}

            <CustomInput
              placeholder="Email ID / Mobile number"
              iconName="at-sign"
              value={userName}
              onChangeText={handleUserNameChange}
            />

            <CustomPasswordInput
              placeholder="Password"
              iconName="lock"
              value={password}
              onChangeText={handlePasswordChange}
            />

            <TouchableOpacity
              style={styles.forgotPasswordLink}
              onPress={() => props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Login"
            isLoading={loading}
            color={AppColors.AppBlue}
            isFilled={true}
            onPress={Processlogin}
          />

          <View style={styles.registerPrompt}>
            <Text style={styles.registerText}>New to Jornify? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    marginRight: 20,
    marginVertical: 10,
    fontFamily: 'Nunito-Bold',
    color: AppColors.AppBlue,
  },
  registerPrompt: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 20,
  },
  registerText: {
    fontFamily: 'Nunito-Regular',
    color: AppColors.black,
  },
  registerLink: {
    color: AppColors.AppBlue,
    fontFamily: 'Nunito-Bold',
  },
});
