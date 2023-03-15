import { Dimensions, Image, View, StyleSheet, Text, SafeAreaView, flat } from 'react-native';
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
      <View style={styles.centeredView}>
        <Row>
          <Col>
            <Image source={profilePicture} style={styles.profilePicture} />
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
          <Col style={{width: "100%", paddingLeft: 20}}>
            {/* <LargeText style={styles.boldText}>Kardex</LargeText> */}
            <ActionButton
              text="Descargar Kardex"
              backgroundColor="#003070"
              color="#FFF"
              icon="file-pdf-o"
              widthPercentage={0.9}
              style={{height: 60, marginBottom: 5,}}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{width: "100%", paddingLeft: 20}}l>
            {/* <LargeText style={styles.boldText}>Identificación Oficial</LargeText> */}
            <ActionButton
              text="Descargar Identificación Oficial"
              backgroundColor="#003070"
              color="#FFF"
              icon="file-pdf-o"
              widthPercentage={0.9}
              style={{height: 60,}}

            />
          </Col>
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // display: 'flex',
    flex: 1,

    justifyContent: 'space-evenly',
    // padding: 10,
    // height: ,
    // backgroundColor: 'red',
    paddingVertical: 20,
  },
  boldText: {
    // fontFamily: 'Fredoka-Medium',
    fontSize: 18 / fontScale,
    fontWeight: '600',
    // marginBottom: '5%',
  },
  profilePicture: {
    // marginTop: 20,
    width: width * 0.4,
    height: width * 0.4,
  },
  dato: {
    // fontFamily: 'Fredoka-Light',
    fontSize: 14 / fontScale,
    marginBottom: 5,
    // fontWeight: '400',
  }
});
