import { Dimensions, Image, View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { ActionButton, Col, Header, Row } from '../components';
import { REACT_APP_API_URL } from '@env';
import { BASEPATH } from '../Service/Api';

const { width, height, fontScale } = Dimensions.get('window');

const LargeText = ({ children, style = {} }) => {

  return (
    <Text style={{ fontSize: width * 0.038 / fontScale, ...style }}>{children}</Text>
  );
};

export const DeportistaDetails = ({ navigation, route }) => {
  const { data } = route.params,
    profilePicture = data.props.foto ? { uri: `${REACT_APP_API_URL}${BASEPATH}/${data.props.foto}` } : require('../images/ImagenEjemploDeportista.jpg');
  return (

    <View style={{height: "100%"}}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Datos del Deportista"} funcion={"goback"} />
      <ScrollView contentContainerStyle={styles.centeredView}>
        <Row>
          <Col>
            <Image source={{uri: profilePicture.uri}} style={styles.profilePicture} />
          </Col>
        </Row>
        <Row>
          <Col style={{width: "100%", paddingLeft: 20}}>
            <LargeText style={styles.boldText}>Nombre Completo</LargeText>
            <LargeText style={styles.dato}>{data.props.nombres} {data.props.apellidos}</LargeText>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "60%", paddingLeft: 20}}>
            <View>
              <LargeText style={styles.boldText}>Expediente</LargeText>
              <LargeText style={styles.dato}>{data.props.expediente}</LargeText>
            </View>
          </Col>
          <Col style={{width: "40%"}}>
            <LargeText style={styles.boldText}>Sexo</LargeText>
            <LargeText style={styles.dato}>{data.props.sexo ? 'Femenino' : 'Masculino'}</LargeText>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "100%", paddingLeft: 20}}>
            <LargeText style={styles.boldText}>Correo</LargeText>
            <LargeText style={styles.dato}>{data.props.correo}</LargeText>
          </Col>
        </Row>

        <Row>
          <Col style={{width: "100%", paddingLeft: 20}}>
            <LargeText style={styles.boldText}>Facultad</LargeText>
            <LargeText style={styles.dato}>{data.props.facultad}</LargeText>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "100%", paddingLeft: 20}}>
            <LargeText style={styles.boldText}>No. Seguro Social </LargeText>
            <LargeText style={styles.dato}>{data.props.numSeguroSocial}</LargeText>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "60%", paddingLeft: 20}}>
            <LargeText style={styles.boldText}>Deporte</LargeText>
            <LargeText style={styles.dato}>{data.props.deporte}</LargeText>
          </Col>
          <Col style={{width: "40%"}}>
            <LargeText style={styles.boldText}>Subdivisión</LargeText>
            <LargeText style={styles.dato}>{'aaa'}</LargeText>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "60%", paddingLeft: 20}}>
            <LargeText style={styles.boldText}>Jugador Seleccionado</LargeText>
            <LargeText style={styles.dato}>{data.props.jugadorSeleccionado ? 'Si' : 'No'}</LargeText>
          </Col>
          <Col style={{width: "40%"}}>
            <LargeText style={styles.boldText}>No. Jugador</LargeText>
            <LargeText style={styles.dato}>{data.props.numJugador}</LargeText>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "100%", paddingLeft: 20}}>
            <LargeText style={styles.boldText}>Telefono</LargeText>
            <LargeText style={styles.dato}>{data.props.telefono}</LargeText>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "100%", paddingLeft: 20}}>
            <LargeText style={styles.boldText}>Num. Emergencias</LargeText>
            <LargeText style={styles.dato}>{data.props.telefonoEmergencia}</LargeText>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "90%", height: 60, marginTop: 15}}>
            <View style={{borderRadius: 18, overflow: 'hidden', height: 60, backgroundColor: 'red'}}>
              <ActionButton
                text="Ver Asistencias"
                backgroundColor="#003070"
                color="#FFF"
                icon="clock-o"
                style={{width: "100%", alignSelf: 'center', height: 60, borderRadius: 18 }}
                handler={() => {navigation.navigate("DeportistaAssistance")}}
              />
            </View>
          </Col>
        </Row>
        <Row>
          <Col style={{width: "90%", height: 60, marginTop: 10}}>
            <View style={{borderRadius: 18, overflow: 'hidden', height: 60, backgroundColor: 'red'}}>
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
            <View style={{borderRadius: 18, overflow: 'hidden', height: 60, backgroundColor: 'red'}}>
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
    // flex: 1,
    // justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  boldText: {
    fontSize: 18 / fontScale,
    fontWeight: '600',
    marginTop: 20,
  },
  profilePicture: {
    width: width * 0.4,
    height: width * 0.4,
  },
  dato: {
    fontSize: 14 / fontScale,
  }
});
