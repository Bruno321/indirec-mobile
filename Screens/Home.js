import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Modal, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react"
import NetInfo from "@react-native-community/netinfo";
import TouchableCmp from '../assetsUI/TouchableCmp';
import Header from "../components/Header"
import moment from 'moment/moment';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataScaneo, setDataScaneo] = useState({});
  const [dataResponse, setDataResponse] = useState({});
  const [registroCheck, setRegistroCheck] = useState(true);
  const [token,setToken] = useState()
  const navigation = useNavigation();

  useEffect(()=>{
    async function getToken (){
      let retrieveToken = await AsyncStorage.getItem('token') 
      setToken(retrieveToken)
    }
    getToken()
  },[])
  
  // DOCUMENTACION - Función que regresa un bloque de código dependiendo si la lectura del QR fue correcta o incorrecta -> Regresa los componentes para mostrar un modal correcto/incorrecto
  const GenerarModal = () => {
    try {
      if(registroCheck == true){
          return  (
          <>
            <View style={styles.ModalAlerta}>
            <Text style={styles.Modal1Text1}>Escaneo exitoso</Text>
            <Text style={styles.Modal1Text2}>Bienvendio</Text>
            <Text style={styles.Modal1Text3}>${dataResponse.deportista.nombres} ${dataResponse.deportista.apellidos}</Text>
            <Image style={styles.Modal1Image} source={{uri: `http://192.168.100.25:3000/api/${dataResponse.deportista.foto}`}}></Image>
            <Text style={styles.Modal1Text4}>Hora: {moment(dataScaneo.fecha).format('h:mm a')}</Text>
            <Text style={styles.Modal1Text4}>{dataResponse.message}</Text>
            <View style={styles.ModalTouchable}>
              <TouchableCmp>
                <Text style={styles.ModalCerrarButton} onPress={() => {
                  setScanned(false);
                  }}>Aceptar</Text>
              </TouchableCmp>
            </View>
          </View>
          </>
          )
      } else {
        return (
          <>
        <View style={styles.ModalAlerta}>
          <Text style={styles.Modal2Text1}>Escaneo fallido, algo ha ocurrido</Text>
          <Text style={styles.Modal2Text2}>Por favor vuelva a pasar el código QR</Text>
          <View style={styles.ModalTouchable}>
            <TouchableCmp>
              <Text style={styles.ModalCerrarButton} onPress={() => {
                setScanned(false);
                }}>Aceptar</Text>
            </TouchableCmp>
          </View>
        </View>
          </>
        )
      }
    } catch (e) {}
  }

  // DOCUMENTACION - Cada vez que se entra a la screen:
  // El valor de "escaneado" se vuelve falso, así, como no hay nada escaneado, la camara se renderíza.
  // Si hubiera algo escaneado, "escaneado" sería verdadero y la camara no se renderíza
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
  
  // DOCUMENTACION - Función que toma lo que leé la camara de un QR y lo trabaja (data)
  const handleBarCodeScanned = ({ data }) => {
    try {
      setScanned(true); // DOCUMENTACION - Al leer algo, renderizar el Modal con la funcion GenerarModal()
      let datos = JSON.parse(data); // DOCUMENTACION - Guardamos la informacion leída parseada a JSON
      setDataScaneo(datos); 
      if(Object.keys(datos).length == 3){ // DOCUMENTACION - Que sean 3 keys del json
       if(datos.hasOwnProperty('id') && datos.hasOwnProperty('nombreC') && datos.hasOwnProperty('fecha') == true){ // DOCUMENTACION - Que sean las keys que queremos


        //Aqui se mandaria el post
        // configurar MAMADAS PORQUE SOMOS HTTP NO HTTPS Zzzzz
        // https://github.com/facebook/react-native/issues/32931

        axios({
          method: "POST",
          url: "http://192.168.100.25:3000/api/deportistas/asistencias",  //NOTA: En el url se debe cambiar con la DIRECCION IP DE TU MAQUINA, no funciona si ponemos localhost ni tampoco 127.0.0.1
          data: {
            id: dataScaneo.id,
            fecha:dataScaneo.fecha
          },
          headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":null ,
            "Accept":"*/*"
          },
            mode: 'cors',
        })
        .then((response)=>{
          // console.log("Data del response " + JSON.stringify(response.data))
          setDataResponse(response.data)// DOCUMENTACION - Guardar la info del response para poder usarlo en GenerarModal()
          setRegistroCheck(true)})// DOCUMENTACION - Lectura del QR válida

        const unsubscribe = NetInfo.addEventListener(state => {
            switch (state.type) {
              case "wifi":
                // DOCUMENTACION - EN CASO DE TENER WIFI...
                break;
              case "cellular":
                // DOCUMENTACION - EN CASO DE USAR DATOS...
                break;
              case "none":
                // DOCUMENTACION - EN CASO DE NO TENER INTERNET OFFLINEFIRST...
                break;
              default:
                break;
            }
        });
        unsubscribe();
        } else {
        setRegistroCheck(false);
        // console.log("✖ JSON CON LLAVES INCORRECTAS");
        }
      } else {
        setRegistroCheck(false);
        // console.log("✖ JSON CON MÁS O MENOS DE 3 LLAVES -> " + Object.keys(datos).length);
      }
    } catch (error) {
      setRegistroCheck(false);
      console.log("✖ ERROR DE LECTURA"); // NO ES UN JSON
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
        {scanned? null : 
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          height = {Dimensions.get('window').height}
        />}
      </View>
      <Modal 
        animationType={'fade'}
        visible={scanned}
        transparent
        onRequestClose={()=>setScanned(false)}
      >
        <View style={styles.ModalCentrado}>
          {GenerarModal()}
        </View>
      </Modal>
      <View style={styles.cuadrante3}>
        <View style={styles.ModalTouchable}>
              <TouchableCmp>
                <Text style={styles.botonRegistrarDeportista} onPress={() => {
                  navigation.navigate("Registro");
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
