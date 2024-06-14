import React, { useContext, useState } from 'react';
import { View,TouchableOpacity, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { CartContext } from '../CartContext'; // Correct import path

const CheckoutScreen = ({ navigation }) => {
  const { cart } = useContext(CartContext);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolderName: '',
  });

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Placeholder for shipping details
  const shippingDetails = {
    address: '123 Main St',
    city: 'New York',
    country: 'USA',
    zip: '10001',
  };

  const handlePayment = () => {
    // Check if any of the payment details fields are empty
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.expirationDate ||
      !paymentDetails.cvv ||
      !paymentDetails.cardHolderName
    ) {
      // If any of the fields are empty, display payment failed message
      alert('Payment Failed\nPlease fill in all payment details');
    } else {
      // Placeholder for actual payment processing logic
      const paymentProcessed = true; // Change this based on actual payment processing result
      navigation.navigate('ConfirmationScreen', { paymentProcessed });
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Details</Text>
        <Text>{shippingDetails.address}</Text>
        <Text>{shippingDetails.city}, {shippingDetails.zip}</Text>
        <Text>{shippingDetails.country}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text style={styles.text}>Total Items: {cart.length}</Text>
        <Text style={styles.text}>Total Price: ${totalPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChangeText={(text) => setPaymentDetails({ ...paymentDetails, cardNumber: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Expiration Date (MM/YYYY)"
          value={paymentDetails.expirationDate}
          onChangeText={(text) => setPaymentDetails({ ...paymentDetails, expirationDate: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={paymentDetails.cvv}
          onChangeText={(text) => setPaymentDetails({ ...paymentDetails, cvv: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Card Holder Name"
          value={paymentDetails.cardHolderName}
          onChangeText={(text) => setPaymentDetails({ ...paymentDetails, cardHolderName: text })}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handlePayment}>
        <Text style={styles.submitButtonText}>Pay Now</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    paddingVertical:50
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#eee',
    padding:10,
    borderRadius:5
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "blue",
  },
  text:{
    fontWeight:'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "blue",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign:'center'
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    width:'100%',
    textAlign:'center'
  },
});

export default CheckoutScreen;
