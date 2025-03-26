import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color: string;
  isFilled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;


}

const CustomButton = ({
  title,
  onPress,
  color,
  isFilled = false, // Default value
  isLoading = false, // Default value
  minWidth = '60%', // Default value
  maxWidth = '100%',
  maxHeight = '100%',



}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: isFilled ? color : 'transparent' ,

        borderColor: color,
        borderWidth: isFilled ? 0 : 1,
        minWidth: minWidth,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
     
      } as ViewStyle}
      onPress={onPress}
      disabled={isLoading} // Disable CustomButton when loading
      
    >
      {isLoading ? (
        <View style={styles.row}>
          <ActivityIndicator size="small" color={isFilled ? 'white' : color} />
          <Text style={{ ...styles.text, color: isFilled ? 'white' : color, marginLeft: "5%" }}>
            Submitting ...
          </Text>
        </View>
      ) : (
        <Text style={{ ...styles.text, color: isFilled ? 'white' : color }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical:7,
    marginVertical: '2%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
