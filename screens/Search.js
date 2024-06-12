import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { debounce } from 'lodash';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import { CartContext } from '../CartContext'; // Correct import path

const SearchScreen = ({ navigation }) => {
  //const { addToCart } = useContext(CartContext);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://retoolapi.dev/pmRHmd/data');
        console.log('API Response:', response.data);
        if (!Array.isArray(response.data)) {
          console.error('Invalid API response: Expected an array of products');
          return;
        }
        const filteredData = response.data.filter(product =>
           product.productname.toLowerCase().includes(searchText.toLowerCase())
        );
        console.log('Filtered Data:', filteredData);
        setResults(filteredData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
  
    if (searchText.trim() !== '') {
      fetchData();
    } else {
      setResults([]);
    }
  }, [searchText]);
  

  const debouncedSearch = useCallback(debounce((text) => setSearchText(text), 300), []);

  const handleSearch = (text) => {
    console.log('Search Text:', text);
    debouncedSearch(text);
  };
  

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Product_Details', { productId: item.id })}
      >
        <Image source={{ uri: item.logo }} style={styles.productImage} />
        <Text style={styles.productName}>{item.productname}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
        <Icon name="cart-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by product name"
        value={searchText}
        onChangeText={handleSearch}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={results}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  productList: {
    flexGrow: 1,
  },
  productContainer: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 100, // Change to a numeric value without quotes
    borderRadius: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
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

export default SearchScreen;
