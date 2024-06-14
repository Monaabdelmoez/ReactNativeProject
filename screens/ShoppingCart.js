import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CartContext } from "../CartContext"; // Correct import path

const ShoppingCartScreen = ({ navigation }) => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.logo }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${item.price}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.decreaseButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Icon name="remove-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.increaseButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Icon name="add-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Icon name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
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
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.invoiceContainer}>
            <Text style={styles.invoiceText}>
              Total: ${totalPrice.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate("CheckoutScreen")}
            >
              <Text style={styles.submitButtonText}>Checkout</Text>
            </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  cartList: {
    paddingBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  cartItemImage: {
    width: 60, // Adjust the width of the image
    height: 60, // Adjust the height of the image
    borderRadius: 5,
  },
  cartItemDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "center",
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#888",
    fontWeight: "bold",
    marginTop: 5,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#000000",
    borderRadius: 20,
    // padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  increaseButton: {
    backgroundColor: "#00ff00",
    borderRadius: 20,
    // padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  decreaseButton: {
    backgroundColor: "#ff0000",
    borderRadius: 20,
    // padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  invoiceContainer: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginTop: 10,
  },
  invoiceText: {
    fontSize: 18,
    fontWeight: "bold",
    // textAlign: 'right',
    padding: 10,
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

export default ShoppingCartScreen;
