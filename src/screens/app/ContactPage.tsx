import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import Globalstyles from '../../styles/GlobalStyles';
import {useState} from 'react';
import Indicator from '../../components/Indicator';
import {AppColors} from '../../constants/AppColors';


import AntDesign from 'react-native-vector-icons/AntDesign';

import GlobalStyles from '../../styles/GlobalStyles';
import CustomButton from '../../components/CustomButton';

const ContactUs = (props: any) => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message == '' || subject == '') {
      setError(true);
      return;
    } else {
      setError(false);
      setLoading(true);
    }
  

    Alert.alert(
        'Done',
        'Message sent Successfully. we will get back to you soonest Possible',
      );
  };

  return (
    <SafeAreaView style={Globalstyles.safeArea}>
      <ScrollView
        contentContainerStyle={Globalstyles.scrollContainer}
        bounces={false}
        keyboardShouldPersistTaps={'handled'}>
        <Indicator Visibility={loading} />

        <View style={styles.row}>
          <AntDesign
            name="leftsquare"
            size={30}
            color={AppColors.AppDarkBlue}
            onPress={() => props.navigation.goBack()}
          />
          <Text style={Globalstyles.titleBolder}>Contact Us</Text>
          <Text></Text>
        </View>

        <Indicator Visibility={loading} cancel={() => setLoading(false)} />

        <View style={{padding: 10}}>
          <Image
            source={require('../../assets/images/envolope.png')}
            style={styles.TopScreenImages}
          />

          {error ? (
            <Text style={{color: 'red'}}>*Please Enter all the fields</Text>
          ) : (
            <></>
          )}

          <Text style={GlobalStyles.labels}>Name</Text>
      
              <TextInput
                style={Globalstyles.textInput}
                onChangeText={text => setname(text)}
                placeholder="john doe"
                value={name}
              />
         
          

          <Text style={GlobalStyles.labels}>Email</Text>

         
              <TextInput
                style={Globalstyles.textInput}
                onChangeText={text => setEmail(text)}
                placeholder="Example@mailinator.com"
                value={email}
              />
         

          <Text style={GlobalStyles.labels}>Select Subject</Text>

         
              <TextInput
                style={Globalstyles.textInput}
                value={subject}
                onChangeText={text => setSubject(text)}
                placeholder="Sponsor my account"
              />
         

          <Text style={GlobalStyles.labels}>Send Message</Text>

          <TextInput
            multiline={true}
            style={GlobalStyles.textInput}
            onChangeText={text => setMessage(text)}
            placeholder="Enter Your Message Here"
          />
          {/* <View style={{alignSelf: 'center', marginVertical: '10%'}}> */}
          <CustomButton
            title="Send Message"
            onPress={() => sendMessage()}
            color={AppColors.appGreen}
          />
          {/* </View> */}
          <Text
            style={{
              color: 'grey',
              fontFamily: 'Nunito-Medium',
              alignSelf: 'center',
              marginBottom: '10%',
            }}>
            We strive to respond within 24 hrs
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {},
  textMediun: {
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: '5%',
    fontFamily: 'Nunito-Medium',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  searchCont: {
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 0.8,
    height: 35,
    marginBottom: '2%',
    paddingLeft: '3%',
    alignItems: 'center',
  },
  searchText: {
    fontFamily: 'Nunito-Regular',
    minWidth: '80%',
  },

  TopScreenImages: {
    width: '90%',
    height: '20%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
