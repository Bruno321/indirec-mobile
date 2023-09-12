import { Dimensions, Image, View, StyleSheet, Text, SafeAreaView, ScrollView, Alert, Modal } from 'react-native';
import { ActionButton, Col, Header, Row } from '../components';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { useState, useEffect } from 'react';
import { REACT_APP_API_URL } from '@env';
import { BASEPATH } from '../Service/Api';
import Feather from 'react-native-vector-icons/Feather';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const GRANTED = "granted";

const { width, height, fontScale } = Dimensions.get('window');

const LargeText = ({ children, style = {}, numberOfLineas }) => {

  return (
    <Text style={{ fontSize: width * 0.038 / fontScale, ...style }} numberOfLines={numberOfLineas}>{children}</Text>
  );
};

export const DeportistaDetails = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const { data } = route.params;
  const profilePicture = data.props.foto ? { uri: data.props.foto } : require('../images/ImagenEjemploDeportista.jpg');
  const fCardex = data.props.fotoCardex;
  const fId = data.props.fotoIdentificacionOficial;
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const handleDownload = async (foto) => {
    const fileUrl = foto;
    const { status } = await requestPermission();
    if (status === GRANTED) {
      saveFileToGallery(fileUrl, status);
    } else {
      console.log(permissionResponse)
      let permissionStatus;
      permissionStatus = await requestPermission();
    }
  };

  const saveFileToGallery = async (fileUrl, status) => {
    try {
      if (status !== GRANTED && permissionResponse.status !== GRANTED) {
        console.log('Permiso denegado para acceder a la galería.');
        return;
      }

      const fileExtension = fileUrl.split('.').pop().toLowerCase();
      const fileUri = FileSystem.cacheDirectory + `file.${fileExtension}`;
      await FileSystem.downloadAsync(fileUrl, fileUri);

      if (fileExtension === 'pdf') {
        await Sharing.shareAsync(fileUri);
        console.log('PDF guardado en la galería.');
        Alert.alert('Descarga completa', 'Documento guardado en la galería', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      } else {
        await MediaLibrary.saveToLibraryAsync(fileUri);
        console.log('Imagen guardada en la galería.');
        Alert.alert('Descarga completa', 'Documento guardado en la galería', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    } catch (error) {
      console.log('Error al guardar el archivo:', error);
    }
  }


  return (
    <View style={{ height: "100%" }}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Datos del Deportista"} funcion={"goback"} />
      <ScrollView contentContainerStyle={styles.centeredView} bounces={false} overScrollMode="never">
        <View style={styles.infoView}>
          <Row>
            <Col>
              <Image source={profilePicture} style={styles.profilePicture} />
            </Col>
          </Row>
          <Row>
            <LargeText style={styles.datoName} numberOfLineas={2}>{data.props.nombres} {data.props.apellidos}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Expediente</LargeText>
            <LargeText style={styles.dato}>{data.props.expediente}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Sexo</LargeText>
            <LargeText style={styles.dato}>{data.props.sexo ? 'Femenino' : 'Masculino'}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Correo</LargeText>
            <LargeText style={styles.dato}>{data.props.correo}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Facultad</LargeText>
            <LargeText style={styles.dato}>{data.props.facultad}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>No. Seguro Social </LargeText>
            <LargeText style={styles.dato}>{data.props.numSeguroSocial}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Deporte</LargeText>
            <LargeText style={styles.dato}>{data.props.deporte.nombre}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Subdivisión</LargeText>
            <LargeText style={styles.dato}>{'WIP'}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Jugador Seleccionado</LargeText>
            <LargeText style={styles.dato}>{data.props.jugadorSeleccionado ? 'Si' : 'No'}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>No. Jugador</LargeText>
            <LargeText style={styles.dato}>{data.props.numJugador}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Telefono</LargeText>
            <LargeText style={styles.dato}>{data.props.telefono}</LargeText>
          </Row>
          <Row>
            <LargeText style={styles.boldText}>Num. Emergencias</LargeText>
            <LargeText style={styles.dato}>{data.props.telefonoEmergencia}</LargeText>
          </Row>
        </View>
        <Row>
          <Col style={{ width: "90%", height: 60, marginTop: 15 }}>
            <View style={{ borderRadius: 18, overflow: 'hidden', height: 60 }}>
              <ActionButton
                text="Ver Asistencias"
                backgroundColor="#003070"
                color="#FFF"
                icon="clock-o"
                style={{ width: "100%", alignSelf: 'center', height: 60, borderRadius: 18 }}
                handler={() => { navigation.navigate("DeportistaAssistance", { deportista: { nombres: data.props.nombres, apellidos: data.props.apellidos }, deportista_id: data.props.id }) }}
              />
            </View>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "90%", height: 60, marginTop: 10 }}>
            <View style={{ borderRadius: 18, overflow: 'hidden', height: 60 }}>
              <ActionButton
                text="Regenerar QR"
                backgroundColor="#FFF"
                color="#003070"
                icon="qrcode"
                style={{ width: "100%", alignSelf: 'center', height: 60, marginBottom: 5, borderWidth: 2, borderColor: "#003070", borderRadius: 18 }}
                handler={() => { setShowModal(!showModal) }}
              />
            </View>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "90%", height: 60, marginTop: 10 }}>
            <View style={{ borderRadius: 18, overflow: 'hidden', height: 60 }}>
              <ActionButton
                text="Descargar Kardex"
                handler={() => handleDownload(fCardex)}
                backgroundColor="#FFF"
                color="#003070"
                icon="file-pdf-o"
                style={{ width: "100%", alignSelf: 'center', height: 60, marginBottom: 5, borderWidth: 2, borderColor: "#003070", borderRadius: 18 }}
              />
            </View>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "90%", height: 60, marginTop: 10 }}>
            <View style={{ borderRadius: 18, overflow: 'hidden', height: 60 }}>
              <ActionButton
                text="Descargar Identificación Oficial"
                handler={() => handleDownload(fId)}
                backgroundColor="#FFF"
                color="#003070"
                icon="file-pdf-o"
                widthPercentage={0.9}
                style={{ height: 60, marginBottom: 5, borderWidth: 2, borderColor: "#003070", borderRadius: 18 }}

              />
            </View>
          </Col>
        </Row>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={styles.containerModalQR}>
          <View style={styles.headerIndereq}>
            <View style={styles.headerButton}>
              <Feather name={'arrow-left'} size={35} color={'white'} onPress={() => setShowModal(!showModal)} />
            </View>
            <Text style={styles.headerText}>Regenerar QR</Text>
          </View>
          <View>
            <Text style={{ ...styles.componentText, fontWeight: "bold", fontSize: 40 / fontScale }}>QR Regenerado</Text>
            <Text style={{fontSize: 20/fontScale,}}>{data.props.nombres} {data.props.apellidos}</Text>
          </View>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QRCode
              value={'{"nombres":"' + data.props.nombres + '","apellidos":"' + data.props.apellidos + '","id":"' + data.props.id + '"}'}
              size={Dimensions.get('window').width * 0.7}
            />
          </View>
          <TouchableCmp onPress={() => setShowModal(!showModal)}>
            <View style={styles.viewButtonCerrar}>
              <Text style={{ color: 'white' }}>Cerrar</Text>
            </View>
          </TouchableCmp>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#FFF',
    // flex: 1,
    // justifyContent: 'space-evenly',
    paddingBottom: "5%",
  },
  boldText: {
    fontSize: 18 / fontScale,
    fontWeight: '600',
    textAlign: 'right',
    width: "40%",
    paddingHorizontal: "5%",
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderColor: '#AAA',
    // backgroundColor: '#FFF'
  },
  dato: {
    fontSize: 18 / fontScale,
    width: "55%",
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderColor: '#000',
    // backgroundColor: '#000',
    // color: '#FFF'
  },
  profilePicture: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 18,
    resizeMode: 'contain'
  },
  infoView: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
  },
  datoName: {
    fontSize: 30 / fontScale,
    fontWeight: '600',
    // fontFamily: "Fredoka-Medium",

    textAlign: 'center',
    width: "100%",
    // backgroundColor: '#003070',
    color: "#003070",
    paddingBottom: 20 / fontScale,
    marginTop: width * 0.05
  },
  containerModalQR: {
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIndereq: {
    width: '100%',
    height: 80,
    backgroundColor: '#003070',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
      color: 'white',
      fontSize: 25 / fontScale,
      paddingLeft: 5 / fontScale,
      alignSelf: 'center',
      fontWeight: 'bold',
  },
  componentText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  viewButtonCerrar: {
    backgroundColor: '#003070',
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').height * 0.06,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerButton: {
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
