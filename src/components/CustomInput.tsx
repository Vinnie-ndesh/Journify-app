import React, {FC} from 'react';
import {StyleSheet, View, TextInput, DimensionValue} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {AppColors} from '../constants/AppColors';

interface InputProps {
  placeholder: string;
  iconName?: string;
  value?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  maxLength?: number;
  disabled?: boolean;
  marginBottomV?: DimensionValue;
  onChangeText: (text: string) => void;
}

const CustomInput: FC<InputProps> = ({
  placeholder,
  value,
  iconName,
  keyboardType = 'default', // Default value
  maxLength,
  disabled = false, // Default value
  marginBottomV,
  onChangeText,
}) => {
  return (
    <View style={{...styles.container, marginBottom: marginBottomV || '5%'}}>
      <View style={styles.inputContainer}>
        {iconName && (
          <Icon
            name={iconName}
            size={20}
            color={AppColors.black}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          underlineColorAndroid="transparent"
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={!disabled} // Disable input based on the prop
          placeholderTextColor={AppColors.GrayApp}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '1%',
    minWidth: '70%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10, // Space between icon and input
  },
  textInput: {
    flex: 1,
    fontFamily: 'Nunito-Medium',
    fontSize: 15,
    color: AppColors.black,

    borderBottomWidth: 1,
    borderColor: AppColors.black,
  },
});
