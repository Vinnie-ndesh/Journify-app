import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,

  View,
} from 'react-native';
import {AppColors} from '../../constants/AppColors';
import CustomButton from '../../components/CustomButton';

const WelcomePage = (props: any) => {
  const PageNavigation = (name: string) => {
    props.navigation.navigate(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/landing.png')}
        style={styles.logo}
      />
      <View style={styles.v1}>
        <Text style={styles.appName}>JORNIFY</Text>
        <Text style={styles.slogan}>Capture Today, Reflect Tomorrow.</Text>

        <Text style={styles.info}>
        Express your thoughts, capture your journey. Start writing today and create a story worth revisiting.
        </Text>
      </View>
      <View style={styles.v2}>
        <CustomButton
          title="Login"
          color={AppColors.AppBlue}
          minWidth={'80%'}
          isFilled={true}
          onPress={() => PageNavigation('Login')}
        />
        <CustomButton
          title="Register"
          minWidth={'80%'}
          color={AppColors.black}
          onPress={() => PageNavigation('SignUp')}
        />

        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
    flexBasis: 100,
    backgroundColor: AppColors.white,
    minHeight: '100%',
  },
  logo: {
    width: '90%',
    height: '30%',
    marginTop: '20%',
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    alignItems: 'center',
    justifyContent: 'center',
    color: AppColors.AppOrange,
  },
  appName: {
    fontSize: 40,
    fontFamily: 'Nunito-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: AppColors.AppBlue,
  },
  v1: {
    alignItems: 'center',
  },
  v2: {
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: AppColors.black,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  guest: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: AppColors.AppBlue,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default WelcomePage;
