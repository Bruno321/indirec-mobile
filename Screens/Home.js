import { StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';


export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    Alert.alert(
      "Toma de asistencia",
      data + " ha sido escaneado",
      [
        { text: "OK", onPress: () => { setScanned(false) }}
      ]
    );
  }

  if  (hasPermission === null){
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false){
    return <Text>No access to camera</Text>
  }

  return(
    <View style={styles.container}>
      <View style={styles.cuadrante1}>
        <Image
          style={styles.logoTexto}
          source={require('../images/indereq-logo-texto.png')}
        />
      </View>
      <View style={styles.cuadrante2}>
        <Text style={styles.texto1}>Bienvenido</Text>
        <Text style={styles.texto2}>Jorge Alejandro Bernal Colín</Text>
        <Text style={styles.texto3}>Escanea el QR de tus deportistas</Text>
      </View>
      <View style={styles.camera}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style = {{height:Math.round((Dimensions.get('window').width)), width:Dimensions.get('window').width}}
          ratio={'1:1'}
        />
      </View>
      <View style={styles.cuadrante3}>
        <Text style={styles.texto4}>{'Centro de Desarrollo \n Facultad de Informática UAQ \n Todos los derechos reservados 2022 (C)'}</Text>
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
    height: Dimensions.get('window').height*0.20
  },
  cuadrante2:{
    height: Dimensions.get('window').height*0.225
  },
  texto1:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    color: 'white',
    fontFamily:'Fredoka-Light',
    marginTop:Dimensions.get('window').height*.005,
    fontSize:20
  },
  texto2:{
    fontSize: Dimensions.get('window').width*0.05,
    width: Dimensions.get('window').width*1,
    marginTop: Dimensions.get('window').width*0.01,
    //marginBottom: Dimensions.get('window').width*0.01,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Fredoka-Regular',
    fontSize:40,
    marginTop:Dimensions.get('window').width*0.03,
  },
  texto3:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    color: 'white',
    fontFamily:'Fredoka-Light',
    marginTop:Dimensions.get('window').height*-.01,
    fontSize:20,
    marginTop:Dimensions.get('window').width*0.08,
  },
  cuadrante3:{
    height: 'auto',
  },
  texto4:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    color: '#DDD',
    marginTop: Dimensions.get('window').width*0.1,
    fontFamily:'Fredoka-Light',
  },
  camera:{
    marginTop: Dimensions.get('window').width*0.05,
  }

});
