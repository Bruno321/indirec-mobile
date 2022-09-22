import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Modal } from 'react-native';
import React, { useState, useEffect } from "react"
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';
import TouchableCmp from '../assetsUI/TouchableCmp';
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import Header from "../components/Header"


export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [registroCheck, setRegistroCheck] = useState(true);
  const [scanData, setScanData] = useState(null);
  
  const navigation = useNavigation();

  var GenerarModal = () => {
    if(registroCheck == true){
    return <View style={styles.ModalAlerta}>
      <Text style={styles.Modal1Text1}>Escaneo exitoso</Text>
      <Text style={styles.Modal1Text2}>Bienvenido</Text>
      <Text style={styles.Modal1Text3}>Jorge Bernal</Text>
      <Image style={styles.Modal1Image} source={require("../images/ImagenEjemploDeportista.jpg")}></Image>
      <Text style={styles.Modal1Text4}>La hora de entrada ha sido registrada con exito</Text>
      <View style={styles.ModalTouchable}>
        <TouchableCmp>
          <Text style={styles.ModalCerrarButton} onPress={() => {
            setAlerta(false);
            setScanned(false);
            }}>Aceptar</Text>
        </TouchableCmp>
      </View>
    </View>
    } else {
    return <View style={styles.ModalAlerta}>
      <Text style={styles.Modal2Text1}>Escaneo fallido, algo ha ocurrido</Text>
      <Text style={styles.Modal2Text2}>Por favor vuelva a pasar el código QR</Text>
      <View style={styles.ModalTouchable}>
        <TouchableCmp>
          <Text style={styles.ModalCerrarButton} onPress={() => {
            setAlerta(false);
            setScanned(false);
            }}>Aceptar</Text>
        </TouchableCmp>
      </View>
    </View>
    }
  }

  var varImg = require('../images/indereq-logo-texto.png');
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setAlerta(true);
    // PASOS AL LEER QR
    // 0 GUARDAR LA INFO DEL QR EN UN STATE Y VERIFICAR QUE SEA JSON
    var DataParsed = JSON.parse(data)
    setScanData(DataParsed);
    console.log("DATA 1 : " + data)
    console.log("DATA 2 : " + JSON.stringify(scanData));
    // 1 CHECAR QUE COINCIDA EL NUMERO DE LLAVES DEL JSON (3)
    Object.keys(scanData).length == 3 ? console.log("HOLA") : console.log("NO HOLA");
    // 2 CHECAR QUE LAS LLAVES SEAN LAS QUE PEDIMOS (id, nombre y hora)
    // 3 CHECAR SI HAY INTERNET
    // NetInfo.fetch().then(networkState => {
    //   console.log("Estás conectado a internet?: ", networkState.isConnected);
    // });
    //      PARA MOSTRAR LA IMAGEN, VERIFICAR CUAL CONEXIÓN TIENE:
    //      1. INTERNET - LLAMAR IMAGEN DE LA BDD
    //      2. DATOS - PREGUNTAR SI QUIERE BAJAR IMAGEN CON DATOS O MOSTRAR IMAGEN DEFAULT
    //      3. NO INTERNET - MOSTRAR IMAGEN DEFAULT
    // 4 
  }

  if  (hasPermission === null){
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false){
    return <Text>No access to camera</Text>
  }
  
  return(
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#000"
        barStyle={"light-content"}
        hidden={false} />
      <Header/>
      {/* <View style={styles.cuadrante1}>
        <Image
          style={styles.logoTexto}
          source={varImg}
        />
      </View> */}
      <View style={styles.cuadrante2}>
        <Text style={styles.texto1}>Bienvenido</Text>
        <Text style={styles.texto2}>Por favor escanea el código QR para tomar la asistencia</Text>
      </View>
      <View style={styles.camera}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style = {{height:Dimensions.get('window').height*0.5, width:Dimensions.get('window').width}}
          ratio={'1:1'}
        />
      </View>
      <Modal 
        animationType={'fade'}
        visible={alerta}
        transparent
        onRequestClose={()=>setAlerta(false)}
      >
        <View style={styles.ModalCentrado}>
          {GenerarModal()}
        </View>
      </Modal>
      <View style={styles.cuadrante3}>
        <View style={styles.ModalTouchable}>
              <TouchableCmp>
                <Text style={styles.botonRegistrarDeportista} onPress={() => {
                  setAlerta(true);
                  setScanned(false);
                  // navigation.navigate("Registro");
                  }}>Registrar Deportista</Text>
              </TouchableCmp>
            </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoTexto:{
    width: Dimensions.get('window').width*0.5,
    resizeMode: 'contain',
  },
  cuadrante1:{
    backgroundColor: '#003070',
    height: Dimensions.get('window').height*0.125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cuadrante2:{
    height: Dimensions.get('window').height*0.24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera:{
    height: Dimensions.get('window').height*0.5,
  },
  cuadrante3:{
    height: Dimensions.get('window').height*0.16,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto1:{
    fontFamily: 'Fredoka-Medium',
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize:30
  },
  texto2:{
    fontFamily: 'Fredoka-Light',
    width: Dimensions.get('window').width*0.75,
    textAlign: 'center',
  },
  ModalCentrado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  ModalAlerta:{
    height: Dimensions.get('window').height*0.65,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width*0.9,
    paddingVertical: Dimensions.get('window').height*0.025,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  Modal1Text1:{
    fontFamily: 'Fredoka-Medium',
    textAlign: 'center',
    fontSize: 20,
    color: '#007505',
  },
  Modal1Text2:{
    fontFamily: 'Fredoka-Light',
    fontSize: 18,
  },
  Modal1Text3:{
    fontFamily: 'Fredoka-Medium',
    textAlign: 'center',
    fontSize: 25,
    color: '#003070',
    // fontWeight: 'bold',
  },
  Modal1Text4:{
    fontFamily: 'Fredoka-Light',
    textAlign: 'center',
    fontSize: 18,
    width: Dimensions.get('window').width*0.66,
    color: '#666666',
  },
  Modal1Image:{
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  Modal2Text1:{
    fontFamily: 'Fredoka-Medium',
    textAlign: 'center',
    fontSize: 20,
    color: '#FA8018',
  },
  Modal2Text2:{
    fontFamily: 'Fredoka-Light',
    textAlign: 'center',
    fontSize: 18,
    width: Dimensions.get('window').width*0.66,
    color: '#666666',
    marginBottom: Dimensions.get('window').height*0.05,
  },
  ModalTouchable:{
    overflow: 'hidden',
    borderRadius: 12.5,
  },
  ModalCerrarButton:{
    fontFamily: 'Fredoka-Light',
    width: Dimensions.get('window').width*0.8,
    height: 50,
    backgroundColor: '#003070',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  botonRegistrarDeportista:{
    fontFamily: 'Fredoka-Medium',
    width: Dimensions.get('window').width*0.9,
    height: Dimensions.get('window').height*0.07,
    backgroundColor: '#FFF',
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
    justifyContent: 'center',
    alignItems: 'center',
  }
});
