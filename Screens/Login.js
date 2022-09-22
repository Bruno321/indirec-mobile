import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useKeyboard from '../Hooks/Keyboard.hook';

const oInitialState = {
  email: '',
  password: '',
};

export default function Login() {
  const [form, setForm] = useState(oInitialState);
  const isKeyboardOpen = useKeyboard();
  const navigation = useNavigation();

  const getFormData = (value, field) => {
    if (value !== undefined) {
      setForm({ ...form, [field]: value });
    }
  };

  // ? For the moment, only to visualize form data
  const handleSubmit = () => {
    console.log(form);
    navigation.navigate('Home')
    setForm(oInitialState);
  };
  
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled={true} style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.cuadrante1}>
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
        <Text style={styles.indereqTexto}>Bienvenido  a INDEREQ</Text>
        <View style={styles.rowForm}>
          <Text style={styles.label}>Correo Electronico:</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => getFormData(value, 'email')}
            keyboardType="email-address"
            placeholder="Usuario"
            value={form.email}
          />
        </View>
        <View style={styles.rowForm}>
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => getFormData(value, 'password')}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={form.password}
          />
        </View>
      </View>
      <View style={styles.cuadrante3}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.loginButton}
        >
          <Text style={styles.loginTexto}>Iniciar Sesión</Text>
        </TouchableOpacity>
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
    width: Dimensions.get('window').width,
    resizeMode: 'center',
    marginTop:Dimensions.get('window').height*0.07
  },
  cuadrante1:{
    justifyContent: 'center',
    height: Dimensions.get('window').height*0.17,
  },
  loginLogo:{
    width: 300,
    height: 300,
  },
  cuadrante2:{
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.28,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  cuadrante3: {
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.20,
    paddingTop:Dimensions.get('window').height*0.05,
		backgroundColor:'#FFF',
    alignItems: 'center',
  },
  indereqTexto: {
    color: '#003070',
    textAlign: 'center',
    fontFamily:'Fredoka-Light',
    fontWeight: 'bold',
    marginTop:Dimensions.get('window').height*.04,
    fontSize:40
  },
  rowForm: {
    marginTop:Dimensions.get('window').height*.02,
  },
  label: {
    marginLeft:Dimensions.get('window').width*.04,
		fontFamily:'Fredoka-Light',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderBottomWidth: 1,
		borderBottomColor:'black',
    color:'#000000',
    fontFamily:'Fredoka-Light',
    backgroundColor:'#ffffff',
    width: Dimensions.get('window').width * 0.8,
  },
  loginButton:{
    width: Dimensions.get('window').width * 0.8,
    height: 55,
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
    fontSize: 20,
    color: '#FFF',
  },
});
