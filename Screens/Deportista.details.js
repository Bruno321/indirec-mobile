import { Dimensions, Image, View, StyleSheet, Text } from 'react-native';
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
        <Header/>
        <View style={styles.centeredView}>
          <Row>
            <Col>
              <Image source={profilePicture} style={styles.profilePicture}/>
            </Col>
            <Col>
              <View>
                <LargeText style={styles.boldText}>Expediente </LargeText>
                <LargeText style={styles.dato}>{data?.expediente}</LargeText>
              </View>
              <View>
                <LargeText style={styles.boldText}>No. Seguro Social </LargeText>
                <LargeText style={styles.dato}>{data?.numSeguroSocial}</LargeText>
              </View>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Nombre</LargeText>
              <LargeText style={styles.dato}>{data?.nombres}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Apellidos</LargeText>
              <LargeText style={styles.dato}>{data?.apellidos}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Sexo</LargeText>
              <LargeText style={styles.dato}>{data?.sexo ? 'Femenino' : 'Masculino'}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Facultad</LargeText>
              <LargeText style={styles.dato2}>{data?.facultad}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Deporte</LargeText>
              <LargeText style={styles.dato2}>{data?.deporte}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Subdivisión</LargeText>
              <LargeText style={styles.dato2}>{''}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Jugador Seleccionado</LargeText>
              <LargeText style={styles.dato}>{data?.jugadorSeleccionado ? 'Si' : 'No'}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>No. Jugador</LargeText>
              <LargeText style={styles.dato}>{data?.numJugador}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Telefono</LargeText>
              <LargeText style={styles.dato}>{data?.telefono}</LargeText>
            </Col>
            <Col>
              <LargeText style={styles.boldText}>Num. Emergencias</LargeText>
              <LargeText style={styles.dato}>{data?.telefonoEmergencia}</LargeText>
            </Col>
          </Row>
          <Row>
            <Col>
              <LargeText style={styles.boldText}>Correo</LargeText>
              <LargeText style={styles.dato}>{data?.correo}</LargeText>
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
          <Row>
            <ActionButton
              text="Regresar"
              backgroundColor="#003070"
              color="#FFF"
              widthPercentage={0.4}
              handler={() => navigation.goBack()}
            />
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
    height: height*0.9,
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
