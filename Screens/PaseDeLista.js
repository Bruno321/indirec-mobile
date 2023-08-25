import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Modal, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from "expo-barcode-scanner";
import { Header } from '../components';
import { process, SAVE, BASEPATH } from "../Service/Api";
import { REACT_APP_API_URL } from '@env';
import TouchableCmp from '../assetsUI/TouchableCmp';
import moment from 'moment/moment';

const { fontScale, width} = Dimensions.get('window');

export const  PaseDeLista = ()  => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataScaneo, setDataScaneo] = useState({});
  const [dataResponse, setDataResponse] = useState({});
  const [registroCheck, setRegistroCheck] = useState(true);
  const navigation = useNavigation();
  
  // DOCUMENTACION - Función que regresa un bloque de código dependiendo si la lectura del QR fue correcta o incorrecta -> Regresa los componentes para mostrar un modal correcto/incorrecto

  const SuccessModal = () => {
  const profilePicture = dataResponse.deportista.foto ? {uri: dataResponse.deportista.foto} : require('../images/ImagenEjemploDeportista.jpg');

    return (
      <View style={styles.ModalAlerta}>
        <Text style={styles.Modal1Text1}>Escaneo exitoso</Text>
        <Text style={styles.Modal1Text2}>{dataResponse.horaSalida ? 'Adios' : 'Hola'}!</Text>
        <Text style={styles.Modal1Text3}>{dataResponse?.deportista?.nombres} {dataResponse?.deportista?.apellidos}</Text>
        
        <Image style={styles.Modal1Image} source={profilePicture}></Image>
        <Text style={styles.Modal1Text4}>Hora: {moment(dataScaneo.fecha).format('h:mm a')}</Text>
        <Text style={styles.Modal1Text4}>{dataResponse?.message}</Text>
        <View style={styles.ModalTouchable}>
          <TouchableCmp>
            <Text style={styles.ModalCerrarButton} onPress={() => {
              setScanned(false);
              }}>Aceptar</Text>
          </TouchableCmp>
        </View>
      </View>
    );
  };

  const ErrorModal = () => {
    return (
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
    );
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
  const handleBarCodeScanned = async ({ data }) => {
    try {
      setScanned(true); // DOCUMENTACION - Al leer algo, renderizar el Modal con la funcion GenerarModal()
      let datos = JSON.parse(data); // DOCUMENTACION - Guardamos la informacion leída parseada a JSON
      
      setDataScaneo(datos);
      if(Object.keys(datos).length === 3){ // DOCUMENTACION - Que sean 3 keys del json
       if(datos.hasOwnProperty('id') && datos.hasOwnProperty('nombreC') && datos.hasOwnProperty('fecha') == true){ // DOCUMENTACION - Que sean las keys que queremos

        const oSend = {
          id: datos.id,
          fecha: datos.fecha
        };
        const response = await process(SAVE, 'asistencias', oSend).catch(e => {
          console.log("ERROR 1>" + e.response);
          setRegistroCheck(false);
        });

        if (response.data) {
          setDataResponse(response.data);
          setRegistroCheck(true);
        }

        //Aqui se mandaria el post
        // configurar MAMADAS PORQUE SOMOS HTTP NO HTTPS Zzzzz
        // https://github.com/facebook/react-native/issues/32931

        /*const unsubscribe = NetInfo.addEventListener(state => {
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
        unsubscribe();*/
        } else {
          setRegistroCheck(false);
        }
      } else {
        setRegistroCheck(false);
      }
    } catch (error) {
      setRegistroCheck(false);
    }
  }

  if (hasPermission === null){
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false){
    return <Text>No access to camera</Text>
  }
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: "#003070"}}/>
      <Header navigation={navigation} title={"Pase de Lista"}/>
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
          {registroCheck && scanned && dataResponse ? <SuccessModal/> : <ErrorModal/>}
        </View>
      </Modal>
      <View style={styles.cuadrante3}>
        <View style={styles.ModalTouchable}>
          <TouchableCmp>
            <Text style={styles.botonRegistrarDeportista} onPress={() => {
              navigation.navigate("RegistroDeportistas");
              }}>Registrar Deportista</Text>
          </TouchableCmp>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  cuadrante2:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraView:{
    width: '100%',
    height: Dimensions.get('window').width,
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#F0F0F0'
  },
  cuadrante3:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto1:{
    fontSize: 45 / fontScale,
    textAlign: 'center',
    marginBottom: 12
  },
  texto2:{
    width: Dimensions.get('window').width*0.75,
    fontSize: 20 / fontScale,
    textAlign: 'center',
  },
  ModalCentrado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  ModalAlerta:{
    justifyContent: 'space-between',
    width: Dimensions.get('window').width*0.9,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 18,
    alignItems: 'center',
  },
  Modal1Text1:{
    textAlign: 'center',
    fontSize: 20 / fontScale,
    color: '#007505',
  },
  Modal1Text2:{
    fontSize: 18 / fontScale,
  },
  Modal1Text3:{
    textAlign: 'center',
    fontSize: 25 / fontScale,
    color: '#003070',
  },
  Modal1Text4:{
    textAlign: 'center',
    fontSize: 18 / fontScale,
    width: Dimensions.get('window').width*0.66,
    color: '#666666',
  },
  Modal1Image:{
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  Modal2Text1:{
    textAlign: 'center',
    fontSize: 32 / fontScale,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 20,
    color: '#FA8018',
  },
  Modal2Text2:{
    textAlign: 'center',
    fontSize: 18 / fontScale,
    width: Dimensions.get('window').width*0.66,
    color: '#666666',
    marginBottom: Dimensions.get('window').height*0.05,
  },
  ModalTouchable:{
    overflow: 'hidden',
    borderRadius: 12.5,
  },
  ModalCerrarButton:{
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
