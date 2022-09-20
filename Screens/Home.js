import { StyleSheet, Text, View, Image, Dimensions, Alert, Modal, Button } from 'react-native';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';
import TouchableCmp from '../assetsUI/TouchableCmp';
import NetInfo from "@react-native-community/netinfo";

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [alerta, setAlerta] = useState(false);
  var varImg = require('../images/indereq-logo-texto.png');
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setAlerta(true);
    NetInfo.fetch().then(networkState => {
      console.log("Estás conectado a internet?: ", networkState.isConnected);
      // networkState.isConnected
    });
    setScanned(true);
  }

  if  (hasPermission === null){
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false){
    return <Text>No access to camera</Text>
  }
  // NetInfo.addEventListener(networkState => {
  //   console.log("Is connected?: ", networkState.isConnected);
  // })
  
  return(
    <View style={styles.container}>
      <View style={styles.cuadrante1}>
        <Image
          style={styles.logoTexto}
          source={varImg}
        />
      </View>
      <View style={styles.cuadrante2}>
        <Text style={styles.texto1}>Bienvenido</Text>
        <Text style={styles.texto2}>Por favor escanea el código QR para tomar la asistencia</Text>
      </View>
      <View style={styles.camera}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style = {{height:Math.round((Dimensions.get('window').width)), width:Dimensions.get('window').width}}
          ratio={'1:1'}
        />
      </View>
      <Modal 
        visible={alerta}
        transparent
        onRequestClose={()=>setAlerta(false)}
      >
        <View style={styles.ModalCentrado}>
          <View style={styles.ModalAlerta}>
            <Text style={styles.ModalText1}>Escaneo exitoso</Text>
            <Text style={styles.ModalText2}>Bienvenido</Text>
            <Text style={styles.ModalText3}>Jorge Bernal</Text>
            <Image style={styles.ModalImage} source={require("../images/ImagenEjemploDeportista.jpg")}></Image>
            <Text style={styles.ModalText4}>La hora de entrada ha sido registrada con exito</Text>
            <View style={styles.ModalTouchable}>
              <TouchableCmp>
                <Text style={styles.ModalCerrarButton} onPress={() => {
                  setAlerta(false);
                  setScanned(false);
                  }}>Aceptar</Text>
              </TouchableCmp>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.cuadrante3}>
        {/* <TouchableCmp onPress={() => {setAlerta(true)}}>
          <View style={styles.buttonNOQROut}>
            <View style={styles.buttonNOQR}>
              <Text style={styles.ButtonText}>No tengo código QR</Text>
            </View>
          </View>
        </TouchableCmp> */}
        <View style={styles.ModalTouchable}>
              <TouchableCmp>
                <Text style={styles.ModalCerrarButton2} onPress={() => {
                  setAlerta(true);
                  setScanned(false);
                  }}>No tengo código QR</Text>
              </TouchableCmp>
            </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoTexto:{
    width: Dimensions.get('window').width/1.8,
    resizeMode: 'contain',
  },
  cuadrante1:{
    backgroundColor: '#003070',
    height: Dimensions.get('window').height/6,
    alignItems: 'center',
  },
  cuadrante2:{
    height: Dimensions.get('window').height*0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cuadrante3:{
    height: Dimensions.get('window').height*0.15,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto1:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:30
  },
  texto2:{
    width: Dimensions.get('window').width*0.75,
    textAlign: 'center',
  },
  camera:{
    marginTop: Dimensions.get('window').width*0.05,
  },
  ModalCentrado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  ModalAlerta:{
    width: Dimensions.get('window').width*0.9,
    paddingVertical: 20,
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: '#266FB6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalText1:{
    textAlign: 'center',
    fontSize: 20,
    color: '#007505',
    // fontFamily: 'Fredoka-Light',
  },
  ModalText2:{
    // textAlign: 'center',
    fontSize: 18,
    // color: '#266FB6',
    // fontFamily: 'Fredoka-Medium',
    // marginBottom: 15,
  },
  ModalText3:{
    textAlign: 'center',
    fontSize: 25,
    color: '#003070',
    fontWeight: 'bold',
    // fontFamily: 'Fredoka-Medium',
    marginBottom: 15,
  },
  ModalText4:{
    // backgroundColor: 'red',
    textAlign: 'center',
    fontSize: 18,
    width: Dimensions.get('window').width*0.66,
    color: '#666666',
    // fontWeight: 'bold',
    // fontFamily: 'Fredoka-Medium',
    marginBottom: 15,
  },
  ModalImage:{
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  ModalTouchable:{
    marginTop: 15,
    overflow: 'hidden',
    borderRadius: 12.5,
  },
  ModalCerrarButton:{
    width: Dimensions.get('window').width*0.8,
    height: 50,
    backgroundColor: '#003070',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  ModalCerrarButton2:{
    width: Dimensions.get('window').width*0.9,
    height: Dimensions.get('window').height*0.07,
    backgroundColor: '#FFF',
    // backgroundColor: '#003070',
    borderWidth: 1,
    borderColor: '#003070',
    borderRadius: 12,

    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#0050A0',
    
  },
  buttonNOQROut:{
    width: Dimensions.get('window').width*1,
    height: Dimensions.get('window').height*0.1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
    // backgroundColor: 'red',
  }
});
