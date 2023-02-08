import { Dimensions, Image, View, StyleSheet, Text, SafeAreaView } from 'react-native';
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
    profilePicture = data.foto ? { uri: `${REACT_APP_API_URL}${BASEPATH}/${data.foto}` } : require('../images/ImagenEjemploDeportista.jpg');
  return (
      <View>
        <SafeAreaView style={{backgroundColor: "#003070"}}/>
        <Header navigation={navigation} title={"Datos del Deportista"}/>
        <View style={styles.centeredView}>
          <Row>
            <Col>
              <Image source={profilePicture} style={styles.profilePicture}/>
            </Col>
            <Col>
              <View>
                <LargeText style={styles.boldText}>Expediente</LargeText>
                <LargeText style={styles.dato}>{data.props.expediente}</LargeText>
              </View>
              <View>
                <LargeText style={styles.boldText}>No. Seguro Social </LargeText>
                <LargeText style={styles.dato}>{data.props.numSeguroSocial}</LargeText>
              </View>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Nombre</LargeText>
              <LargeText style={styles.dato}>{data.props.nombres}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Apellidos</LargeText>
              <LargeText style={styles.dato}>{data.props.apellidos}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Sexo</LargeText>
              <LargeText style={styles.dato}>{data.props.sexo ? 'Femenino' : 'Masculino'}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Facultad</LargeText>
              <LargeText style={styles.dato2}>{data.props.facultad}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Deporte</LargeText>
              <LargeText style={styles.dato2}>{data.props.deporte}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Subdivisión</LargeText>
              <LargeText style={styles.dato2}>{''}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Jugador Seleccionado</LargeText>
              <LargeText style={styles.dato}>{data.props.jugadorSeleccionado ? 'Si' : 'No'}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>No. Jugador</LargeText>
              <LargeText style={styles.dato}>{data.props.numJugador}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Telefono</LargeText>
              <LargeText style={styles.dato}>{data.props.telefono}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Num. Emergencias</LargeText>
              <LargeText style={styles.dato}>{data.props.telefonoEmergencia}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Correo</LargeText>
              <LargeText style={styles.dato}>{data.props.correo}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Kardex</LargeText>
              <ActionButton
                text="Descargar archivo"
                backgroundColor="#FFFFFC"
                color="#000"
                icon="file-pdf-o"
                widthPercentage={0.4}
              />
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Identificación Oficial</LargeText>
              <ActionButton
                text="Descargar archivo"
                backgroundColor="#FFFFFC"
                color="#000"
                icon="file-pdf-o"
                widthPercentage={0.4}
              />
            </Col>
          </Row>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: 10,
    height: height*0.825,
  },
  boldText: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 18 / fontScale,
    marginBottom: '5%',
  },
  profilePicture: {
    width: width * 0.4,
    height: width * 0.4,
  },
  dato: {
    fontFamily: 'Fredoka-Light',
    fontSize: 14 / fontScale,
  },
  dato2: {
    // backgroundColor: 'red',
    width: Dimensions.get('window').width*0.3,
    fontFamily: 'Fredoka-Light',
    fontSize: 14 / fontScale,
  }
});
