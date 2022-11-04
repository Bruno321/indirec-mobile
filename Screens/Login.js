import React, { useState,useContext } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useKeyboard from '../Hooks/Keyboard.hook';
import axios from 'axios';
import { LoginContext } from '../Context/LoginContext';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const isKeyboardOpen = useKeyboard();
  const navigation = useNavigation();
  const  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const {iniciarSesion} = useContext(LoginContext);
  const [data, setData] = useState({
    email:'',
    password:'',
    isValidUser:true,
    isValidPassword:true
  });

  const handleEmailChange = (value) =>{
    if(value.trim().length >= 0 && value.trim().match(mailformat)){
      setData({
        ...data,
        email:value,
        isValidUser:true
      })
    }else{
      setData({
        ...data,
        email:value,
        isValidUser:false
      })
    }
  };

  const handlePassChange = (value) =>{
    if(value.trim().length > 0){
      setData({
        ...data,
        password:value,
        isValidPassword:true
      })
    }else{
      setData({
        ...data,
        password:value,
        isValidPassword:false
      })
    }
  };

  const handleLogin = (username,passowrd) => {
    //Inicio de sesion
    axios({
      method: "POST",
      url: "http://192.168.100.25:3000/api/auth",  //NOTA: En el url se debe cambiar con la DIRECCION IP DE TU MAQUINA, no funciona si ponemos localhost ni tampoco 127.0.0.1
      data: {
        email: username,
        password:passowrd
      },
      headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":null ,
      "Accept":"*/*"
    },
      mode: 'cors',
  })
  .then((response)=>{
    iniciarSesion(response.data.token)
  })
  .catch((e)=>{
    console.log(e)
    Alert.alert('Usuario invalido', 'Usuario o contraseña incorrectos',[
      {text:'Okay'}
    ]);
  })
  };
  
  return (
    <View style={styles.container}>
    <SafeAreaView />

      <KeyboardAvoidingView enabled={true} style={{ flex: 1, alignItems: 'center' }}>
        <View>
          <Image
            style={styles.logoTexto}
            source={require('../images/indereq-logo-texto.png')}
          />
        </View>
        {!isKeyboardOpen ? (
          <View>
            <Image
              style={styles.loginLogo}
              source={require('../images/login-logo.png')}
            />
          </View>
        ) : null}
      </KeyboardAvoidingView>
      <View style={styles.cuadrante2}>
        <Text style={styles.indereqTexto}>Bienvenido a INDEREQ</Text>
        <View style={styles.rowForm}>
          <Text style={styles.label}>Correo Electronico:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleEmailChange(value)}
            keyboardType="email-address"
            placeholder="Usuario"
            value={data.email}
            // onEndEditing={(e)=>h(e.nativeEvent.text)}
          />
        </View>
        { data. isValidUser ? null : 
          <Text style={styles.error}>El correo está incompleto</Text>
        }
        <View style={styles.rowForm}>
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => handlePassChange(value)}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={data.password}
            // onEndEditing={(e)=>handleValidPass(e.nativeEvent.text)}
          />
        </View>
        { data. isValidPassword ? null : 
          <Text style={styles.error}>La contraseña está vacía</Text>
        }
        <View style={styles.rowForm}>
          <TouchableOpacity
            onPress={()=>{handleLogin (data.email,data.password )} }
            style={styles.loginButton}
          >
            <Text style={styles.loginTexto}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003070',
    alignItems: 'center',
  },
  logoTexto:{
    width: width,
    height: height * 0.15,
    resizeMode: 'center',
    marginTop: 20
  },
  loginLogo:{
    width: width*0.5,
    height: height*0.3,
  },
  cuadrante2:{
    backgroundColor: '#FFF',
    width: width,
    height: 430,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  indereqTexto: {
    color: '#003070',
    textAlign: 'center',
    fontFamily:'Fredoka-Medium',
    marginTop: 40,
    marginBottom: 30,
    fontSize:width*.07,
  },
  rowForm: {
    marginTop: 12,
  },
  label: {
    marginLeft:width*.02,
		fontFamily:'Fredoka-Light',
    fontSize:width*.05,
  },
  input: {
    width: width * 0.8,
    height: 32,
    margin: height*0.01,
    borderBottomWidth: 1,
		borderBottomColor:'black',
    color:'#000000',
    fontFamily:'Fredoka-Light',
    backgroundColor:'#ffffff',
    fontSize:width*.04,
  },
  loginButton:{
    marginTop: 30,
    width: width * 0.8,
    height: 50,
    borderRadius: 10,
    backgroundColor:'#003070',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize:width * 0.04,
    color: '#FFF',
    fontFamily:'Fredoka-Medium'
  },
  error:{
    fontFamily:'Fredoka-Light',
    color: '#BA1200'
  }
});
