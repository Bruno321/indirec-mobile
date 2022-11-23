import { useEffect } from 'react';
import { Dimensions, Image, View, StyleSheet, Text } from 'react-native';
import { ActionButton, Col, Header, Row } from '../components';

const { width, height } = Dimensions.get('window');       

const LargeText = ({ children, style = {} }) => {
  return (
    <Text style={{ fontSize: height * 0.02, ...style }}>{children}</Text>
  );
};

export const DeportistaDetails = ({ navigation, route }) => {
  const { data } = route.params;

  return (
      <View>
        <Header/>
        <View style={styles.centeredView}>
          <Row>

            <Col>
              <Image source={require('../images/ImagenEjemploDeportista.jpg')} style={styles.profilePicture}/>
            </Col>
            <Col>
              <View style={{ marginBottom: '25%' }}>
                <LargeText style={styles.boldText}>Expediente </LargeText>
                <LargeText>{data?.expediente}</LargeText>
              </View>
              <View>
                <LargeText style={styles.boldText}>No. Seguro Social </LargeText>
                <LargeText>{data?.numSeguroSocial}</LargeText>
              </View>
            </Col>

          </Row>
          <Row style={{ marginTop: '7.5%' }}>

            <Col>
              <LargeText style={styles.boldText}>Nombre</LargeText>
              <LargeText>{data?.nombres}</LargeText>
            </Col>

            <Col>
              <LargeText style={styles.boldText}>Apellidos</LargeText>
              <LargeText>{data?.apellidos}</LargeText>
            </Col>

            <Col>
              <LargeText style={styles.boldText}>Sexo</LargeText>
              <LargeText>{data?.sexo ? 'Femenino' : 'Masculino'}</LargeText>
            </Col>

          </Row>
          <Row style={{ marginTop: '7.5%' }}>

            <Col>
              <LargeText style={styles.boldText}>Facultad</LargeText>
              <LargeText>{data?.facultad}</LargeText>
            </Col>

            <Col>
              <LargeText style={styles.boldText}>Deporte</LargeText>
              <LargeText>{data?.deporte}</LargeText>
            </Col>

            <Col>
              <LargeText style={styles.boldText}>Subdivisión</LargeText>
              <LargeText>{''}</LargeText>
            </Col>

          </Row>
          <Row style={{ marginTop: '7.5%' }}>

            <Col>
              <LargeText style={styles.boldText}>Jugador Seleccionado</LargeText>
              <LargeText>{data?.jugadorSeleccionado ? 'Si' : 'No'}</LargeText>
            </Col>

            <Col>
              <LargeText style={styles.boldText}>No. Jugador</LargeText>
              <LargeText>{data?.jugadorSeleccionado ? data.jugadorSeleccionado : 'No aplica'}</LargeText>
            </Col>

          </Row>
          <Row style={{ marginTop: '7.5%' }}>

            <Col>
              <LargeText style={styles.boldText}>Telefono</LargeText>
              <LargeText>{data?.telefono}</LargeText>
            </Col>

            <Col>
              <LargeText style={styles.boldText}>Num. Emergencias</LargeText>
              <LargeText>{data?.telefonoEmergencia}</LargeText>
            </Col>

          </Row>
          <Row style={{ marginTop: '7.5%' }}>
            <Col>
              <LargeText style={styles.boldText}>Correo</LargeText>
              <LargeText>{data?.correo}</LargeText>
            </Col>
          </Row>
          <Row style={{ marginTop: '7.5%' }}>

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
          <Row style={{ marginTop: '7.5%' }}>
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
    marginTop: height * 0.025,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  profilePicture: {
    width: width * 0.4,
    height: width * 0.4,
  }
});
