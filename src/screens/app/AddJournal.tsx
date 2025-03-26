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

const AddJournal = (props: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

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

  const processAddJournal = () => {
    if (validateFields()) {
      try {
        const journalData = {
          title,
          content,
          categoryId: value,
        };
        apiRequest('POST', 'journals/create-journal', journalData).then(
          (response: any) => {
            console.log(response, 'response');
            if (response.status === 201) {
              Alert.alert('Success', response.data.message);
              props.navigation.goBack();
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
        <ScreenHeader title="Add Journal" navigation={props.navigation} />

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
            placeholderTextColor={AppColors.GrayLightApp}
            placeholder="Enter Your Content Here"
          />
        </View>

        <View>
          <CustomButton
            title="Add Journal"
            color={AppColors.AppDarkGreen}
            isFilled={true}
            onPress={processAddJournal}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddJournal;
