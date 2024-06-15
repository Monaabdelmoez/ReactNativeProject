import axios from "axios";
import  { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const Login = ({navigation}) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getdata = async()=>{
   
    try {
      const us = await AsyncStorage.getItem('users');
      if (us !== null) {
        const usersArray = JSON.parse(us); 
        const currentUser = usersArray.find(user => user.email === email);
        if (currentUser) {
          await AsyncStorage.setItem('useremail', currentUser.email);
          await AsyncStorage.setItem('username', currentUser.username);
          navigation.navigate('Home');
        } else {
          console.log('User not found.');
         
        }
      }
    } catch (error) {
      console.error('Error retrieving user data: ', error);
   
    }

    

  };


  const handleSubmit = () => {
    let isValid = true;

   

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isValid) {
      
      getdata()
      console.log("Password:", password);
      console.log("Email:", email);
    }
  };

  const isValidEmail = (email) => {
  
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.h1}>
          Login
        </Text>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password :</Text>
        <TextInput
          style={[styles.input, passwordError ? styles.errorInput : null]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.togglePassword}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      

      <View style={styles.formGroup}>{}</View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor:'#fff',
    paddingVertical: 50,
  },
  formGroup: {
    width: "100%",
    marginBottom: 16,
  },
  h1:{
    fontSize:40,
    fontWeight:'bold',
    marginVertical:20,
    textAlign:'center',
    color:'blue'
  },
  label: {
    marginBottom: 10,
    color: "blue",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "blue",
    marginBottom: 2,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  togglePassword: {
    position: "absolute",
    right: 12,
    top: -35,
    color: "#666",
    // margin:10,
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;
