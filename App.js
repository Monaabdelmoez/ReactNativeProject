import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUp';
import CheckoutScreen from './screens/CheckoutScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import ShoppingCartScreen from './screens/ShoppingCart';
import LoginScreen from './screens/Login';
import SearchScreen from './screens/Search';
import ProductDetailsScreen from './screens/Product_Details';
import { CartProvider } from './CartContext'; 

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = (navigation) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product_Details" component={ProductDetailsScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
      
    </Stack.Navigator>
  );
};

const App = () => {
 


  return (
    <CartProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={MainStack} />
          <Drawer.Screen name="Search" component={SearchScreen} />
          <Drawer.Screen name="SignUp" component={SignUpScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="ShoppingCart" component={ShoppingCartScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
