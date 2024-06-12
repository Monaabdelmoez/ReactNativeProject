import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import { CartContext } from '../CartContext'; // Correct import path

const HomeScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://retoolapi.dev/pmRHmd/data')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Product_Details', { productId: item.id })}
      >
        <Image source={{ uri: item.logo }} style={styles.productImage} />
        <Text style={styles.productName}>{item.productname}</Text>
        {/* <Text style={styles.productDescription}>{item.description}</Text> */}
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
        <Icon name="cart-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList 
      data={products} 
      renderItem={renderProduct} 
      keyExtractor={item => item.id.toString()} 
      contentContainerStyle={styles.productList}
      numColumns={2} // Change to 2 columns
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    padding: 10,
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    maxWidth: (Dimensions.get('window').width / 2) - 20, // Adjusting for margins and padding
    position: 'relative', // Needed for positioning the add to cart button
  },
  productImage: {
    width: '100%',
    height: 100, // Change to a numeric value without quotes
    borderRadius: 5,
  },
  productName: {
    fontSize: 14, // Increase font size
    marginTop: 8, // Decrease margin top
    textShadowColor: '#000', // Add text shadow color
    // textShadowOffset: { width: .5, height: .5 }, // Add text shadow offset
    textShadowRadius: 1, // Add text shadow radius
  },
  
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ff6347', // Example color, can be changed
    borderRadius: 20,
    padding: 5,
  },
});

export default HomeScreen;
