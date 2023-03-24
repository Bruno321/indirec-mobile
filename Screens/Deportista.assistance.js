import { View, Text, ScrollView, StyleSheet, Dimensions, Button} from "react-native";
import { Header, Row, Col } from '../components';

///////////////////////////////////////////////////
const { width, height, fontScale } = Dimensions.get('window');

export const DeportistaAssistance = ({ navigation }) => {
    return (
        <View>
            <Header navigation={navigation} title={"Asistencias del Deportista"} funcion={"goback"} />
            <View style={styles.centeredView}>
                <Row>
                    <Col style={styles.col1}>
                        <Text style={styles.subtitle}>Dias entrenados a la semana: </Text>
                    </Col>
                    <Col style={styles.col2}>
                        <Text style={styles.text}>{'5 Días (EJEMPLO)'}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col style={styles.col1}>
                        <Text style={styles.subtitle}>Total de horas entrenadas: </Text>
                    </Col>
                    <Col style={styles.col2}>
                        <Text style={styles.text}>{'5 Días (EJEMPLO)'}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col style={{width: "100%", paddingLeft: 15}}>
                        <Text style={styles.textTitle}>Asistencias</Text>
                    </Col>
                </Row>
                <Row style={{backgroundColor: 'rgb(255,200,0)'}}>
                  <Col>
                    <Text>WIP SELECTOR DE FECHA</Text>
                  </Col>
                </Row>
                <Row style={{backgroundColor: 'rgb(255,200,0)'}}>
                  <Col>
                    <Text>Semana del ** de ** al ** de **</Text>
                  </Col>
                </Row>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        paddingVertical: 20,
        backgroundColor: 'orange',
    },
    col1: {
        backgroundColor: 'pink',
        width: "60%",
        height: 50
    },
    col2: {
        backgroundColor: 'red',
        width: "40%",
        height: 50
    },
    subtitle: {
        fontSize: 17 / fontScale,
        fontWeight: '600',
        paddingLeft: 15,
    },
    text: {
        fontSize: 15 / fontScale,
        fontWeight: '400',
        textAlign: 'right',
        paddingRight: 15,
    },
    textTitle:{
        fontSize: 25 / fontScale,
    }
});