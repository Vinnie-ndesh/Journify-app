import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomButton from '../../components/CustomButton';
import {AppColors} from '../../constants/AppColors';
import {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {apiRequest} from '../../utils/network';

const EditJournal = (props: any) => {

  const journalData = props.route.params.journalData || {};
  const [title, setTitle] = useState(journalData.title||'');
  const [content, setContent] = useState(journalData.content||'');

  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>( journalData.categoryId||null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiRequest('GET', 'journals/categories');

        const categoryItems = (await response).data.data.map(
          (category: any) => ({
            label: category.categoryName,
            value: category.categoryId,
          }),
        );
        setCategories(categoryItems);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();


  }, []);

  const validateFields = () => {
    if (!title || !content || !value) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return false;
    }
    return true;
  };

  const processEditJournal = () => {
    if (validateFields()) {
      try {
        const journalDataParam = {
          title,
          content,
          categoryId: value,
        };
        apiRequest('PUT', `journals/edit-journal/${journalData.journalId}`, journalDataParam).then(
          (response: any) => {
         
            if (response.status === 200) {
              Alert.alert('Success', response.data.message);
           
            
              props.navigation.navigate('ViewJournal', {journalData: {...journalDataParam, journalId: journalData.journalId,createdAt: journalData.createdAt}});
            } else {
              Alert.alert('Error', response.message);
            }
          },
        );
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while adding journal');
      }
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollContainer}>
        <ScreenHeader title="Edit Journal" navigation={props.navigation} />

        <View>
          <Text style={GlobalStyles.labels}>Title</Text>
          <TextInput
            style={GlobalStyles.textInput}
            placeholder="Enter Title"
            maxLength={50}
            placeholderTextColor={AppColors.GrayLightApp}
            value={title}
            onChangeText={text => setTitle(text)}
          />

          <Text style={GlobalStyles.labels}>Category</Text>
          <View style={{zIndex: 1}}>
            <DropDownPicker
              open={open}
              value={value}
              items={categories}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setCategories}
              theme="LIGHT"
              multiple={false}
              mode="BADGE"
              textStyle={{
                fontFamily: 'Nunito-Regular',
                color: AppColors.appBlack,
              }}
              labelStyle={{
                fontFamily: 'Nunito-Regular',
                color: AppColors.appBlack,
              }}
              placeholder="Select a category"
              selectedItemLabelStyle={{
                fontFamily: 'Nunito-Regular',
                color: AppColors.appBlack,
              }}
            />
          </View>

          <Text style={GlobalStyles.labels}>Content</Text>
          <TextInput
            multiline={true}
            style={GlobalStyles.textArea}
            onChangeText={text => setContent(text)}
            value={content}
            placeholderTextColor={AppColors.GrayLightApp}
            placeholder="Enter Your Content Here"
          />
        </View>

        <View>
          <CustomButton
            title="Edit Journal"
            color={AppColors.AppDarkGreen}
        
            onPress={processEditJournal}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditJournal;
