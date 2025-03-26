import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppColors} from '../constants/AppColors';

interface ScreenHeaderProps {
  navigation: any;

  title?: string;
}

const ScreenHeader = (props: ScreenHeaderProps) => {
  return (
    <View style={styles.row}>
      <AntDesign
        name="leftsquare"
        size={30}
        color={AppColors.AppDarkBlue}
        onPress={() => props.navigation.goBack()}
      />
      <Text style={styles.pagetitle}>{props.title}</Text>
      <MaterialCommunityIcons
        name="help-box"
        size={30}
        color={AppColors.AppDarkBlue}
        onPress={() => props.navigation.navigate('ContactUs')}
      />
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  pagetitle: {
    fontSize: 25,
    fontFamily: 'Nunito-Bold',
    color: AppColors.black,
  },
});
