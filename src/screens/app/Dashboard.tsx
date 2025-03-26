import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {AppColors} from '../../constants/AppColors';

const Dashboard = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.page}>
          <Text style={styles.heading}>Welcome to Jornify</Text>
          <Text style={styles.subHeading}>
            Your one stop solution for all your daily needs
          </Text>

          <CustomButton
            title="Get Started"
            color={AppColors.AppBlue}
            isFilled={true}
            onPress={() => props.navigation.navigate('Welcome')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  heading: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: AppColors.AppBlue,
    textAlign: 'center',
  },
  subHeading: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: AppColors.black,
    textAlign: 'center',
    marginVertical: '5%',
  },
});

export default Dashboard;
