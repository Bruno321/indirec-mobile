import React, { useState, useContext } from "react";
import {
  Alert,
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { LoginContext } from "../Context/LoginContext";
import { login } from "../Service/Api";
import useKeyboard from "../Hooks/Keyboard.hook";
import Feather from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");

const oInitState = {
  email: "",
  password: "",
  isValidUser: true,
  isValidPassword: true,
};

export const Login = () => {
  const [data, setData] = useState(oInitState);
  const [loading, setLoading] = useState(false);
  const { iniciarSesion } = useContext(LoginContext);
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isKeyboardOpen = useKeyboard();
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (email) => {
    setData({
      ...data,
      email,
      isValidUser: email.trim().length >= 0 && !!email.trim().match(mailformat),
    });
  };

  const handlePasswordChange = (password) => {
    setData({
      ...data,
      password,
      isValidPassword: password.trim().length > 0,
    });
  };

  const handleLogin = async () => {
    const { isValidUser, isValidPassword } = data;

    if (isValidUser && isValidPassword) {
      const { email, password } = data;

      if (email !== "" && password !== "") {
        setLoading(true);
        const response = await login(email, password).catch((error) => {
          console.log('error', error.response);
          Alert.alert("Datos Incorrectos", "Correo o contraseña incorrectos", [  { text: "Aceptar" },]);
          setLoading(false);
        });

        if (response?.status == 201) {
          iniciarSesion(response.data.accessToken);
        }

        setLoading(false);
      } else {
        Alert.alert("Datos Incorrectos", "Los campos no pueden estar vacios", [
          { text: "Okay" },
        ]);
      }
    } else {
      Alert.alert("Datos Incorrectos", "Revise los campos e intente de nuevo", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <KeyboardAvoidingView
        enabled={true}
        style={{ flex: 1, alignItems: "center" }}
      >
        <View>
          <Image
            style={styles.logoTexto}
            source={require("../images/indereq-logo-texto.png")}
          />
        </View>
        {!isKeyboardOpen ? (
          <View>
            <Image
              style={styles.loginLogo}
              source={require("../images/login-logo.png")}
            />
          </View>
        ) : null}
      </KeyboardAvoidingView>
      <View style={styles.cuadrante2}>
        <Text style={styles.indereqTexto}>Iniciar Sesión</Text>
        <View style={styles.rowForm}>
          <Text style={styles.label}>Correo Electronico:</Text>
          <TextInput
            style={{...styles.input, margin: height * 0.01,}}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            placeholder="Usuario"
            value={data.email}
          />
        </View>
        {data.isValidUser ? null : (
          <Text style={styles.error}>El correo está incompleto</Text>
        )}
        <View style={styles.rowForm}>
          <Text style={styles.label}>Contraseña:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={{...styles.input, ...styles.inputPassword}}
              onChangeText={handlePasswordChange}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={data.password}
            />
            <View style={{borderBottomWidth: 1, height: 32}}>
              <Feather name={showPassword ? 'eye' : 'eye-off'} size={25} color={'#000'} onPress={() => setShowPassword(!showPassword)}/>
            </View>
          </View>
        </View>
        {data.isValidPassword ? null : (
          <Text style={styles.error}>La contraseña está vacía</Text>
        )}
        <View style={styles.rowForm}>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginTexto}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003070",
    alignItems: "center",
  },
  logoTexto: {
    width: width,
    height: height * 0.15,
    resizeMode: "center",
    marginTop: 20,
  },
  loginLogo: {
    width: width * 0.5,
    height: height * 0.3,
  },
  cuadrante2: {
    backgroundColor: "#FFF",
    width: width,
    height: 430,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
  },
  indereqTexto: {
    color: "#003070",
    textAlign: "center",
    fontFamily: "Fredoka-Medium",
    marginTop: 40,
    marginBottom: 30,
    fontSize: width * 0.07,
  },
  rowForm: {
    marginTop: 12,
    width: width * 0.8,
  },
  label: {
    marginLeft: width * 0.02,
    fontFamily: "Fredoka-Light",
    fontSize: width * 0.05,
  },
  input: {
    height: 32,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    color: "#000000",
    fontFamily: "Fredoka-Light",
    backgroundColor: "#ffffff",
    fontSize: width * 0.04,
  },
  inputPassword: {
    width: width * 0.695, 
    marginTop: height * 0.01,  
    marginLeft: height * 0.01, 
    marginBottom: height * 0.01,
  },
  loginButton: {
    marginTop: 30,
    width: width * 0.8,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#003070",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  loginTexto: {
    fontSize: width * 0.04,
    color: "#FFF",
    fontFamily: "Fredoka-Medium",
  },
  error: {
    fontFamily: "Fredoka-Light",
    color: "#BA1200",
  },
});
