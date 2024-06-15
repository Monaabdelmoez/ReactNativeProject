import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = ({ navigation }) => {
  const [users, setusers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    let isValid = true;

    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      isValid = false;
    } else {
      setUsernameError("");
    }

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

    if (!/^\d+$/.test(phone)) {
      setPhoneError("Phone number must contain only digits.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (isValid) {
      // Submit the form
      setusers([
        ...users,
        {
          username: username,
          password: password,
          email: email,
          phone: phone,
        },
      ]);
      const newUser = {
        username: username,
        password: password,
        email: email,
        phone: phone,
      };

      const updatedUsers = [...users, newUser];


      try {
        await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
        navigation.navigate("Login");
      } catch (error) {
        console.error("Failed to save cart items", error);
      }
      data();
    
    }
  };
  const data = async () => {
    try {
      const us = await AsyncStorage.getItem("users");
      if (us !== null) {
        setusers(JSON.parse(us));
        console.log(us);
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  const isValidEmail = (email) => {
    // Simple email validation pattern
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // let users=[]
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("users");
        if (storedCart) {
          setusers(JSON.parse(storedCart));
          console.log(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to load cart items", error);
      }
    };

    loadCart();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.h1}>Sign Up</Text>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>User Name :</Text>
        <TextInput
          style={[styles.input, usernameError ? styles.errorInput : null]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}
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
        <Text style={styles.label}>Phone :</Text>

        <TextInput
          style={[styles.input, phoneError ? styles.errorInput : null]}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
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

      

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: "#fff",
    paddingVertical: 30,
  },
  formGroup: {
    width: "100%",
    marginBottom: 16,
  },
  h1: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "blue",
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
    backgroundColor: "blue",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
