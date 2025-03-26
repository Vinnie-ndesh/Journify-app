import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {apiRequest} from '../../utils/network';
import {useCallback, useEffect, useState} from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import JournalList from '../../components/JounalListItem';
import Indicator from '../../components/Indicator';
import ScreenHeader from '../../components/ScreenHeader';
import {AppColors} from '../../constants/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
interface journal {
  journalId: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
const Journals = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMyJounals = async () => {
    try {
      setLoading(true);
      await apiRequest('GET', `journals/my-journals?page=${currentPage}`).then(
        (response: any) => {
          setJournals(response.data.data);
          setPageCount(response.data.pagination.totalPages);
          setCurrentPage(response.data.pagination.currentPage);
          setLoading(false);
        },
      );
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);

      console.error(error);
    }
  };

  useEffect(() => {
    getMyJounals();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getMyJounals();
    }, []),
  );

  const loadMore = async () => {
    if (currentPage < pageCount) {
      try {
        setCurrentPage(currentPage + 1);
        await apiRequest(
          'GET',
          `journals/my-journals?page=${currentPage + 1}`,
        ).then((response: any) => {
          console.log(response.pagination, 'response2');
          setJournals([...journals, ...response.data.data]);
          setPageCount(response.data.pagination.totalPages);
          setCurrentPage(response.data.pagination.currentPage);
        });
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <Indicator Visibility={loading} cancel={() => setLoading(false)} />

      <ScreenHeader title="My Journals" navigation={props.navigation} />
      <FlatList
        keyExtractor={(item: journal) => item.journalId}
        data={journals}
        onEndReached={() => loadMore()}
        renderItem={({item}) => (
          <JournalList
            journalData={item}
            onPress={(data: any) => {
              props.navigation.navigate('ViewJournal', {journalData: data});
            }}
          />
        )}
      />

      <View style={[styles.addItemButton]}>
        <Text style={GlobalStyles.smallText}>Add New Journal</Text>
        <AntDesign
          name="pluscircle"
          size={50}
          color={AppColors.AppOrange}
          onPress={() => props.navigation.navigate('AddJournal')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addItemButton: {
    position: 'absolute', 
    bottom: 20, 
    right: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default Journals;
