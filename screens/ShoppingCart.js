import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../CartContext'; // Correct import path

const ShoppingCartScreen = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.logo }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        {/* <Text style={styles.cartItemDescription}>{item.description}</Text> */}
        <Text style={styles.cartItemPrice}>${item.price}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Icon name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.invoiceContainer}>
            <Text style={styles.invoiceText}>Total: ${totalPrice.toFixed(2)}</Text>
          </View>
        </>
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
    alignItems: 'center',
  },
  cartItemImage: {
    width: 60, // Adjust the width of the image
    height: 60, // Adjust the height of the image
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
  cartItemQuantity: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: '#ff6347',
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

export default ShoppingCartScreen;
