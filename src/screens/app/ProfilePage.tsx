import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  Alert,
} from 'react-native';

import {AppColors} from '../../constants/AppColors';
import ScreenHeader from '../../components/ScreenHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import {useEffect, useState} from 'react';
import {apiRequest} from '../../utils/network';
import CustomButton from '../../components/CustomButton';
import Indicator from '../../components/Indicator';

const ProfilePage = (props: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const UpdateProfile = async () => {
    if (firstName == '' || lastName == '' || email == '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    } else {
        setLoading(true);
      try {
        const response = await apiRequest('POST', 'users/update-profile', {
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
        if (response.status === 200) {
          Alert.alert('Success', 'Profile updated successfully');
           
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Profile update failed');
      
      }finally{
        setLoading(false);
      }
    }
  };

const loadProfile = async () => {
    try {
      const response = await apiRequest('GET', 'users/profile');
      if (response.status === 200) {
        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);   
        setEmail(response.data.data.email);
        }
        }
    catch (error) {
        console.error('Error fetching profile:', error);
        }
    }

    useEffect(() => {
        loadProfile()
    }
    , []);  


  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollContainer}>
        <Indicator Visibility={loading} cancel={()=>setLoading(false)} />
        <ScreenHeader title="My Profile" navigation={props.navigation} />
        <View style={styles.center}>
          <Image
            source={require('../../assets/images/userimage.png')}
            style={styles.profileImage}
          />
        </View>
        <Text style={GlobalStyles.labels}>First name</Text>
        <TextInput
          style={GlobalStyles.textInput}
          onChangeText={text => setFirstName(text)}
          value={firstName}
          placeholder="First Name"
        />
        <Text style={GlobalStyles.labels}>Last Name</Text>
        <TextInput
          style={GlobalStyles.textInput}
          onChangeText={text => setLastName(text)}
          value={lastName}
          placeholder="Last Name"
        />{' '}
        <Text style={GlobalStyles.labels}>Email</Text>
        <TextInput
          style={GlobalStyles.textInput}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
        />
        <CustomButton
          title="Update Profile"
          color={AppColors.AppDarkGreen}
          onPress={()=>UpdateProfile()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: AppColors.AppDarkBlue,
    marginRight: 10,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfilePage;
