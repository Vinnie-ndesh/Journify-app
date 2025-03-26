import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScreenHeader from '../../components/ScreenHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomButton from '../../components/CustomButton';
import {AppColors} from '../../constants/AppColors';
import {apiRequest} from '../../utils/network';

const ViewJournal = (props: any) => {
  const journalData = props.route.params.journalData || {};

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const datePart = date.toISOString().split('T')[0];
    const timePart = date.toISOString().split('T')[1].split('.')[0];

    return `${datePart} at ${timePart}`;
  };
  function deleteJournal(): void {
    try {
      Alert.alert('Are you sure?', 'Do you want to delete this journal?', [
        {
          text: 'Yes',
          onPress: () => {
            apiRequest(
              'DELETE',
              `journals/delete-journal/${journalData.journalId}`,
            ).then((response: any) => {
              if (response.status === 200) {
                Alert.alert('Success', response.data.message);
                props.navigation.goBack();
              } else {
                Alert.alert('Error', response.message);
              }
            });
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  function editJournal(): void {
props.navigation.navigate('EditJournal', {journalData: journalData});
  }

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollContainer}>
        <ScreenHeader title="View Journals" navigation={props.navigation} />
        <View style={GlobalStyles.container}>
          <View>
            <Text style={GlobalStyles.labels}>Title</Text>
            <Text style={GlobalStyles.normalText}>{journalData.title}</Text>
            <Text style={GlobalStyles.labels}>Category</Text>
            <Text style={GlobalStyles.normalText}>
              {journalData.categoryName}
            </Text>
            <Text style={GlobalStyles.labels}>Content</Text>
            <Text style={GlobalStyles.normalText}>{journalData.content}</Text>

            <Text style={GlobalStyles.labels}>Date Added</Text>
            <Text style={GlobalStyles.normalText}>
              {formatDate(journalData.createdAt)}
            </Text>
          </View>
          <View style={GlobalStyles.row}>
            <CustomButton
              title="Edit"
              minWidth="40%"
              maxWidth="45%"
              color={AppColors.AppBlue}
              isFilled={true}
              onPress={() => editJournal()}
            />

            <CustomButton
              title="Delete"
              minWidth="40%"
              maxWidth="45%"
              color={AppColors.AppRed}
              isFilled={true}
              onPress={() => deleteJournal()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ViewJournal;
