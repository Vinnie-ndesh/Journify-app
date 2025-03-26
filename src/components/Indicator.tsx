import React, { useEffect, useState } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { AppColors } from '../constants/AppColors';

interface IndicatorProps {
  Visibility: boolean;
  cancel?: (cancelled: boolean) => void;
  text?: string;
}

const Indicator: React.FC<IndicatorProps> = ({ Visibility, cancel, text }) => {
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    setTimePassed(false);
    const timer = setTimeout(() => {
      setTimePassed(true);
    }, 20000);

    return () => clearTimeout(timer); 
  }, []);

  const handleCancel = () => {
    cancel?.(true);  
    setTimePassed(false);
  };

  return (
    <Modal animationType="slide" visible={Visibility} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.loadingCard}>
          <Text style={styles.loadingText}>Please wait</Text>
          <UIActivityIndicator size={50} color={AppColors.appBlack} />
          {timePassed ? (
            <>
              <Text style={styles.errorText}>
                Taking longer than expected, Please check your internet.
              </Text>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.loadingSubText}>{text || 'Loading'}...</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    height: 200,
    elevation: 10,
    minWidth: '60%',
    maxWidth: '90%',
  },
  loadingText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 20,
    marginBottom: 10,
    color: AppColors.appBlack,
  },
  loadingSubText: {
    fontFamily: 'Nunito-Regular',
    marginTop: '10%',
    color: AppColors.appBlack,
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    marginTop: '7%',
    color: AppColors.appBlack,
  },
  cancelText: {
    fontFamily: 'Nunito-Regular',
    color: 'red',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
