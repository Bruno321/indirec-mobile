import { StyleSheet, Text, View, Image, Dimensions, TextInput, Button  } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState(null);  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.cuadrante1}>
        <Image
          style={styles.logoTexto}
          source={require('../images/indereq-logo-texto.png')}
        />
      </View>
      <View style={styles.cuadrante2}>
        <Text style={styles.texto1}>Iniciar sesión</Text>
      </View>
      <View>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Usuario"
            value={text}
        />
        <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Contraseña"
        />
      </View>
      <View>
        <Button title='Iniciar sesión' style={styles.button} onPress={() => navigation.navigate('Home')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#266FB6',
    alignItems: 'center',
  },
  logoTexto:{
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    marginTop:Dimensions.get('window').height*0.05
  },
  cuadrante1:{
    justifyContent: 'center',
    height: Dimensions.get('window').height*0.20,
  },
  cuadrante2:{
    height: Dimensions.get('window').height*0.225
  },
  texto1:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    color: 'white',
    fontFamily:'Fredoka-Light',
    marginTop:Dimensions.get('window').height*.05,
    fontSize:30
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color:'#000000',
    fontFamily:'Fredoka-Light',
    backgroundColor:'#ffffff',
    width: Dimensions.get('window').width * 0.5,
  },
  //   texto2:{
    //     fontSize: Dimensions.get('window').width*0.05,
    //     width: Dimensions.get('window').width*1,
    //     marginTop: Dimensions.get('window').width*0.01,
    //     marginBottom: Dimensions.get('window').width*0.01,
    //     textAlign: 'center',
    //     color: 'white',
    //     //fontFamily: 'Fredoka-Regular',
    //     fontSize:40
    //   },
    
    // button:{
    //   color: '#266FB6',
    //   backgroundColor: 'FFFFFF',
    //   marginTop: '50px',
    // }
  });
  