import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Modal, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react"
import NetInfo from "@react-native-community/netinfo";
import TouchableCmp from '../assetsUI/TouchableCmp';
import Header from "../components/Header"

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [dataScaneo, setDataScaneo] = useState("{}");
  const [registroCheck, setRegistroCheck] = useState(true);
  const [EntradaSalida, setEntradaSalida] = useState(0);
  
  const navigation = useNavigation();

  var mostrarHora = () => {
    try{
      return JSON.parse(dataScaneo).fecha.slice(14,19)
    } catch (error) {}
  }

  var getEntradaSalida = (inORout) => {
    inORout == 1 ? setEntradaSalida(1) : setEntradaSalida(0);
  }
  /* A function that returns a view depending on the value of the variable `registroCheck` */
  var GenerarModal = () => {
    if(registroCheck == true){
    return <View style={styles.ModalAlerta}>
      <Text style={styles.Modal1Text1}>Escaneo exitoso</Text>
      <Text style={styles.Modal1Text2}>{EntradaSalida == 1 ? "Bienvenido" : "Hasta luego"}</Text>
      <Text style={styles.Modal1Text3}>{JSON.parse(dataScaneo).nombreC}</Text>
      <Image style={styles.Modal1Image} source={require("../images/ImagenEjemploDeportista.jpg")}></Image>
      <Text style={styles.Modal1Text4}>{EntradaSalida == 1 ? "Entrada - " : "Salida - "}{mostrarHora()}</Text>

      <Text style={styles.Modal1Text4}>{EntradaSalida == 1 ? "La hora de entrada ha sido registrada con exito" : "La hora de salida ha sido registrada con éxito"}</Text>
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
        <TouchableCmp onPress={() => {
            setAlerta(false);
            setScanned(false);
            }}>
          <Text style={styles.ModalCerrarButton}>Aceptar</Text>
        </TouchableCmp>
      </View>
    </View>
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanned(false);
      setHasPermission(false);
      (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted"); 
      })();
    });

    return unsubscribe;
  }, [navigation]);
  
  const handleBarCodeScanned = ({ data }) => {
    setDataScaneo(data);
    setScanned(true);
    setAlerta(true);
    // PASOS AL LEER QR
    console.log("✔ =========== ESCANEO =========== ✔");
    // 0 GUARDAR LA INFO DEL QR Y VERIFICAR QUE SEA JSON
    try {
      let datos = JSON.parse(data);
      console.log("✔ SI ES UN JSON");
      // 1 CHECAR QUE COINCIDA EL NUMERO DE LLAVES DEL JSON (3)
      if(Object.keys(datos).length == 3){
       console.log("✔ JSON CON 3 LLAVES");
       // 2 CHECAR QUE LAS LLAVES SEAN LAS QUE PEDIMOS (id, nombre y fecha)
       if(datos.hasOwnProperty('id') && datos.hasOwnProperty('nombreC') && datos.hasOwnProperty('fecha') == true){
        console.log("✔ JSON CON LLAVES CORRECTAS");
        setRegistroCheck(true);
        // 3 CHECAR SI HAY INTERNET
        const unsubscribe = NetInfo.addEventListener(state => {
            //      PARA MOSTRAR LA IMAGEN, VERIFICAR CUAL CONEXIÓN TIENE:
            switch (state.type) {
              //      1. INTERNET - LLAMAR IMAGEN DE LA BDD
              case "wifi":
                console.log("✔ Conexión wifi");
                break;
              //      2. DATOS - PREGUNTAR SI QUIERE BAJAR IMAGEN CON DATOS O MOSTRAR IMAGEN DEFAULT
              case "cellular":
                console.log("✔ Conexión con datos");
                break;
              //      3. NO INTERNET - MOSTRAR IMAGEN DEFAULT
              case "none":
                console.log("✔ Sin conexión");
                break;
              default:
                break;
            }
        });
        unsubscribe();
        } else {
        setRegistroCheck(false);
        console.log("✖ JSON CON LLAVES INCORRECTAS");
        }
      } else {
        setRegistroCheck(false);
        console.log("✖ JSON CON MÁS O MENOS DE 3 LLAVES -> " + Object.keys(datos).length);
      }
    } catch (error) {
      // MOSTRAR MODAL DE ERROR
      setRegistroCheck(false);
      console.log("✖ NO ES UN JSON");
    }
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
      <Header navigation={navigation}/>
      <View style={styles.cuadrante2}>
        <Text style={styles.texto1}>Bienvenido</Text>
        <Text style={styles.texto2}>Por favor escanea el código QR para tomar la asistencia</Text>
      </View>
      <View style={styles.cameraView}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          height = {Dimensions.get('window').height}
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
                  // setAlerta(true);
                  // setScanned(false);
                  navigation.navigate("Registro");
                  }}>Registrar Deportista</Text>
              </TouchableCmp>
                  {/* <Button title="Entrada" onPress={() => getEntradaSalida(1)}></Button> */}
                  {/* <Button title="Salida" onPress={() => getEntradaSalida(0)}></Button> */}
            </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  logoTexto:{
    width: Dimensions.get('window').width*0.5,
    resizeMode: 'contain',
  },
  cuadrante2:{
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraView:{
    width: '100%',
    height: Dimensions.get('window').height*0.5,
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#F0F0F0'
  },
  cuadrante3:{
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto1:{
    fontFamily: 'Fredoka-Medium',
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    fontSize:30,
    marginBottom: 12
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
    height: 400,
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
    fontSize: 32,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 20,
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
    height: 60,
    backgroundColor: '#003070',
    textAlign: 'center',
    textAlignVertical: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
        ios: {
            lineHeight: 60 // as same as height
        },
        android: {}
    }),
    color: 'white',
  },
  botonRegistrarDeportista:{
    fontFamily: 'Fredoka-Medium',
    width: Dimensions.get('window').width*0.9,
    height: 60,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#003070',
    borderRadius: 12,

    textAlign: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
        ios: {
            lineHeight: 60 // as same as height
        },
        android: {}
    }),
    color: '#0050A0',
  },
  buttonNOQROut:{
    width: Dimensions.get('window').width*1,
    height: Dimensions.get('window').height*0.1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
