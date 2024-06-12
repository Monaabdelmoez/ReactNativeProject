import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WishListContext } from '../WishListContext'; // Correct import path

const WishList = ({ navigation }) => {
  const { cart, removeFromCart } = useContext(WishListContext);

  const renderItem = ({ item }) => (
    <View style={styles.ItemContainer}>
      
      <View style={styles.ItemDetails}>
      <Image source={{ uri: item.logo }} style={styles.ItemImage} />
      <Text style={styles.ItemName}>{item.name}</Text>
      </View>

      <View style={styles.WishContainer}>

       <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
         <Ionicons name="heart-dislike-outline" size={24} color="red" /> 
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Empty WishList</Text>
      ) : (
        
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.List}
          />)
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  List: {
    paddingBottom: 20,
  },
 WishContainerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  ItemImage: {
    width: 60, // Adjust the width of the image
    height: 60, // Adjust the height of the image
    borderRadius: 5,
  },
 ItemDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
 ItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ItemPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  ItemQuantity: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceContainer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginTop: 10,
  },
  invoiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default WishList;
