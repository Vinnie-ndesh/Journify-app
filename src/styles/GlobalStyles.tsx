import {StyleSheet} from 'react-native';
import {AppColors} from '../constants/AppColors';

const GlobalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingHorizontal: '4%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: '1%',
  },

  titleBolder: {
    fontSize: 25,
    fontFamily: 'Nunito-Bold',
    color: AppColors.black,
    marginBottom: 10,
  },

  errorText: {
    fontFamily: 'Nunito-Medium',
    color: 'red',
  },
  topScreenImages: {
    width: '90%',
    height: '40%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  normalText: {
    fontFamily: 'Nunito-Medium',
    color: AppColors.black,
  },
  labels: {
    fontFamily: 'Nunito-Bold',
    color: AppColors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  container: {
    flex: 1,

    justifyContent: 'space-between',
  },
  smallText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    color: AppColors.black,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 5,
    padding: 10,
    marginBottom: '5%',
    fontFamily: 'Nunito-Regular',
    color: AppColors.black,
  },
  textInput: {
    borderColor: 'black',
    color: AppColors.black,
    borderWidth: 0.8,
    borderRadius: 5,
    padding: 10,
    maxHeight: 40,
    fontFamily: 'Nunito-Regular',
  },

  avata: {
    width: 100,

    height: 120,

    padding: 10,
    borderRadius: 15,
  },

});
export default GlobalStyles;
