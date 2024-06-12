import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { CartContext } from '../CartContext'; // Correct import path


const ShoppingCartScreen = () => {
  const { cart } = useContext(CartContext);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemDescription}>{item.description}</Text>
        <Text style={styles.cartItemPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.cartList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItemContainer: {
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
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  cartItemDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default ShoppingCartScreen;
