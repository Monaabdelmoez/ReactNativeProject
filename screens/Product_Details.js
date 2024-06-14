import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
  // Extract the product details from the route params
  const { productName, productDescription, productPrice, productImage } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Display the product image */}
        <Image source={{ uri: productImage }} style={styles.productImage} />
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.productDescription}>{productDescription}</Text>
        <Text style={styles.productPrice}>Price: ${productPrice}</Text>
        {/* Add other product details here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  productImage: {
    width: '100%',
    height: 200, // Set the height of the image as desired
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default ProductDetailsScreen;
