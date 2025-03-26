import React, {FC, useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {AppColors} from '../constants/AppColors';

interface InputProps {
  placeholder: string;
  iconName?: string;
  value?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  maxLength?: number;
  disabled?: boolean;
  onChangeText: (text: string) => void;
  borderWidth?: number;
}

const CustomPasswordInput: FC<InputProps> = ({
  placeholder,
  value,
  iconName,
  keyboardType = 'default',
  maxLength,
  disabled = false,
  onChangeText,
  borderWidth = 0,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {iconName && (
          <Icon
            name={iconName}
            size={20}
            color={AppColors.black}
            style={styles.icon}
          />
        )}
        <View
          style={{
            ...styles.inputWrapper,
            borderWidth: borderWidth,
            borderRadius: 6,
          }}>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            maxLength={maxLength}
            editable={!disabled}
            placeholderTextColor={AppColors.GrayApp}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={AppColors.black}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomPasswordInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '1%',
    marginBottom: '5%', // Add margin at the bottom
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: AppColors.Divider_1,
    flex: 1, // Allow input wrapper to take up remaining space
    height: 40,
  },
  icon: {
    marginRight: 10, // Space between icon and input
  },
  textInput: {
    flex: 1,
    padding: 10,
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: AppColors.black,
  },
});
