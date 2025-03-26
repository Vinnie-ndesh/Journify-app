import React, { useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import {AppColors} from '../../constants/AppColors';
import CustomInput from '../../components/CustomInput';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import Indicator from '../../components/Indicator';
import { apiRequest } from '../../utils/network';


const SignUp = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const [loading, setLoading] = useState(false);


  const validateForm = () => {
    const newErrors: any = {};
    let isValid = true;

    if (!firstName) {
      newErrors.firstName = 'Please enter your first name.';
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Please enter your last name.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    const simplePasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const commonPasswords = ['abcd', '123456', 'password', 'qwerty', 'abc123'];
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    } else if (!simplePasswordRegex.test(password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
      isValid = false;
    } else if (commonPasswords.includes(password.toLowerCase())) {
      newErrors.password =
        'Password is too simple or common. Please choose a stronger password.';
      isValid = false;
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const processAccount = async () => {
    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    };

    setLoading(true);

    apiRequest('POST', 'users/register', data)
      .then(async (res: any) => {
        if (!res.error) {
        props.navigation.navigate('Login');
          Alert.alert('Success', res.message);
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
  };

  const processSignup = () => {
    if (validateForm()) {
      processAccount();
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView
        contentContainerStyle={GlobalStyles.scrollContainer}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        <Indicator Visibility={loading} cancel={() => setLoading(false)} />

        <Image
          source={require('../../assets/images/signUp.png')}
          style={styles.topScreenImage}
        />
        <Text style={styles.title}>Sign up</Text>

        <View>
          {errors.firstName && (
            <Text style={GlobalStyles.errorText}>{errors.firstName}</Text>
          )}
          <CustomInput
            placeholder="First Name"
            iconName="user"
            maxLength={40}
            onChangeText={setFirstName}
          />

          {errors.lastName && (
            <Text style={GlobalStyles.errorText}>{errors.lastName}</Text>
          )}
          <CustomInput
            placeholder="Last Name"
            iconName="user"
            maxLength={40}
            onChangeText={setLastName}
          />

          {errors.email && (
            <Text style={GlobalStyles.errorText}>{errors.email}</Text>
          )}
          <CustomInput
            placeholder="Email ID"
            iconName="at-sign"
            onChangeText={setEmail}
          />

          {errors.password && (
            <Text style={GlobalStyles.errorText}>{errors.password}</Text>
          )}
          <CustomPasswordInput
            placeholder="Password"
            iconName="lock"
            onChangeText={setPassword}
          />

          {errors.confirmPassword && (
            <Text style={GlobalStyles.errorText}>{errors.confirmPassword}</Text>
          )}
          <CustomPasswordInput
            placeholder="Confirm Password"
            iconName="lock"
            onChangeText={setConfirmPassword}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>
            By signing up, you're agreeing to our{' '}
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TermsAndCondition')}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <Text style={styles.text}> and </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Continue"
          color={AppColors.AppBlue}
          isFilled
          onPress={processSignup}
        />

        <View style={styles.loginPrompt}>
          <Text style={GlobalStyles.normalText}>Joined us before? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={[GlobalStyles.normalText, styles.loginText]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  topScreenImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginVertical: 20,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: AppColors.black,
  },
  linkText: {
    color: AppColors.AppBlue,
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 20,
  },
  loginText: {
    color: AppColors.AppBlue,
    fontFamily: 'Nunito-Bold',
  },
});
