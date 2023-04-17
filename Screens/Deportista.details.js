import { Dimensions, Image, View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { ActionButton, Col, Header, Row } from '../components';
import { REACT_APP_API_URL } from '@env';
import { BASEPATH } from '../Service/Api';

const { width, height, fontScale } = Dimensions.get('window');

const LargeText = ({ children, style = {}, numberOfLineas}) => {

  return (
    <Text style={{ fontSize: width * 0.038 / fontScale, ...style }} numberOfLines={numberOfLineas}>{children}</Text>
  );
};

export const DeportistaDetails = ({ navigation, route }) => {
  const { data } = route.params,
    profilePicture = data.props.foto ? { uri: `${REACT_APP_API_URL}${BASEPATH}/${data.props.foto}` } : require('../images/ImagenEjemploDeportista.jpg');
  return (

    <View style={{height: "100%"}}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Datos del Deportista"} funcion={"goback"} />
      <ScrollView contentContainerStyle={styles.centeredView} bounces={false} overScrollMode="never">
        <View style={styles.infoView}>
        <Row>
          <Col>
            <Image source={{uri: profilePicture.uri}} style={styles.profilePicture} />
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
            <LargeText style={styles.dato}>{data.props.deporte}</LargeText>
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
          <Col style={{width: "90%", height: 60, marginTop: 15}}>
            <View style={{borderRadius: 18, overflow: 'hidden', height: 60}}>
              <ActionButton
                text="Ver Asistencias"
                backgroundColor="#003070"
                color="#FFF"
                icon="clock-o"
                style={{width: "100%", alignSelf: 'center', height: 60, borderRadius: 18 }}
                handler={() => {navigation.navigate("DeportistaAssistance", data.props.nombres + " " + data.props.apellidos)}}
              />
            </View>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "90%", height: 60, marginTop: 10}}>
            <View style={{borderRadius: 18, overflow: 'hidden', height: 60}}>
              <ActionButton
                text="Descargar Kardex"
                backgroundColor="#FFF"
                color="#003070"
                icon="file-pdf-o"
                style={{width: "100%", alignSelf: 'center', height: 60, marginBottom: 5, borderWidth: 2, borderColor: "#003070", borderRadius: 18 }}
              />
            </View>
          </Col>
        </Row>
        <Row>
        <Col style={{width: "90%", height: 60,  marginTop: 10}}>
            <View style={{borderRadius: 18, overflow: 'hidden', height: 60}}>
            <ActionButton
              text="Descargar Identificación Oficial"
              backgroundColor="#FFF"
              color="#003070"
              icon="file-pdf-o"
              widthPercentage={0.9}
              style={{height: 60, marginBottom: 5, borderWidth: 2, borderColor: "#003070", borderRadius: 18 }}

            />
            </View>
          </Col>
        </Row>
      </ScrollView>
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
  }
});
