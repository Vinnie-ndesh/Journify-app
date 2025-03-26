import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppColors} from '../constants/AppColors';

interface SplListProps {
  journalData: any;
  onPress: (data: any) => void;
}

const JournalList = (props: SplListProps) => {
  const {title, content} = props.journalData;


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title.toUpperCase()}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {content}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => props.onPress(props.journalData)}
          style={styles.viewJournalButton}>
          <Text style={styles.buttonText}>View Journal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JournalList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: AppColors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 5,
    marginHorizontal: 5,
  },
  description: {
    marginTop: '2%',
    fontFamily: 'Nunito-Regular',
    color: AppColors.black,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  viewJournalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.AppDarkBlue,
    paddingVertical: 2,
    borderStartStartRadius: 10,
    paddingLeft: 10,
    marginRight: -5,
    marginBottom: -10,
    borderEndEndRadius: 5,
  },
  buttonText: {
    color: AppColors.white,
    fontFamily: 'Nunito-Bold',
    marginRight: 5,
  },
  titleText: {
    fontFamily: 'Nunito-Bold',
    color: AppColors.black,
    fontSize: 15,
  },
});
