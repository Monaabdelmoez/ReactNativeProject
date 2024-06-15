import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { CartContext } from '../CartContext'; 
import { WishListContext } from '../WishListContext';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext);
  // const { addToList } = useContext(WishListContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://retoolapi.dev/A64tOl/data')
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
        onPress={() => navigation.navigate('Product_Details', {
          productId: item.id,
          productName: item.productname,
          productDescription: item.description,
          productPrice: item.price,
          productImage:item.logo
          // Add other product details as needed
        })} >
        <Image source={{ uri: item.logo }} style={styles.productImage} />
        <Text style={styles.productName}>{item.productname}</Text>
        {/* <Text style={styles.productDescription}>{item.description}</Text> */}
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addToCartButton} 
      onPress={async () => {
          if (await AsyncStorage.getItem("useremail")) {
            addToCart(item);
          } else {
            navigation.navigate("Login");
          }
        }}
        >
        <Icon name="cart-outline" size={24} color="#fff" />
        {/* <FontAwesome name="heart" size={24} color="red" /> */}
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.addToButton} onPress={() => addToList(item)}>
              
                <FontAwesome name="heart" size={24} color="red" />
              
                <FontAwesome name="heart-o" size={24} color="black" />
        
            </TouchableOpacity> */}
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
    maxWidth: (Dimensions.get('window').width / 2) - 20, 
    position: 'relative', 
  },
  productImage: {
    width: '100%',
    height: 100, 
    borderRadius: 5,
  },
  productName: {
    fontSize: 14, 
    marginTop: 8, 
    textShadowColor: '#000', 
    textShadowRadius: 1, 
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
    backgroundColor: 'blue', 
    borderRadius: 20,
    padding: 5,
  },
  addToButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'blue', 
    borderRadius: 20,
    padding: 5,
  },
});

export default HomeScreen;
