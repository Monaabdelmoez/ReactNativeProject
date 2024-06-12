import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ConfirmationScreen = ({ navigation, route }) => {
  const { paymentProcessed } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {paymentProcessed
          ? 'Payment Processed Successfully!'
          : 'Payment Processing Failed'}
      </Text>
      <Button
        title="Back to Shopping"
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ConfirmationScreen;
