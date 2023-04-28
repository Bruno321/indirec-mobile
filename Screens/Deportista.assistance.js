import { View, Text, ScrollView, StyleSheet, Dimensions, Button, SafeAreaView } from "react-native";
import { Header, Row, Col } from '../components';

///////////////////////////////////////////////////
const { width, height, fontScale } = Dimensions.get('window');

const LargeText = ({ children, style = {}, numberOfLineas }) => {

    return (
        <Text style={{ fontSize: width * 0.038 / fontScale, ...style }} numberOfLines={numberOfLineas}>{children}</Text>
    );
};

export const DeportistaAssistance = ( { navigation , route} ) => {
    console.log(route.params);
    return (
        <View>
            <SafeAreaView style={{ backgroundColor: "#003070" }} />
            <Header navigation={navigation} title={"Asistencias del Deportista"} funcion={"goback"} />
            <View style={styles.centeredView}>
                <LargeText style={styles.datoName} numberOfLineas={2}>{route.params}</LargeText>
                <Row>
                    <Col style={styles.col1}>
                        <Text style={styles.subtitle}>Dias entrenados a la semana: </Text>
                    </Col>
                    <Col style={styles.col2}>
                        <Text style={styles.text}>{'5 días'}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col style={styles.col1}>
                        <Text style={styles.subtitle}>Total de horas entrenadas esta semana: </Text>
                    </Col>
                    <Col style={styles.col2}>
                        <Text style={styles.text}>{'5 Días (EJEMPLO)'}</Text>
                    </Col>
                </Row>
                <Row style={{ paddingVertical: 20 / fontScale }}>
                    <Col style={{ width: "100%", paddingLeft: 15 }}>
                        <Text style={styles.textTitle}>Asistencias</Text>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: 'rgb(255,200,0)' }}>
                    <Col>
                        <Text>☢WORK IN PROGRESS FECHA FILTRADA☢</Text>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: 'rgb(255,200,0)' }}>
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
        backgroundColor: 'white',
        backgroundColor: 'pink',
    },
    col1: {
        // backgroundColor: 'pink',
        width: "45%",
        height: 50
    },
    col2: {
        // backgroundColor: 'red',
        width: "40%",
        height: 50
    },
    subtitle: {
        fontSize: 17 / fontScale,
        fontWeight: '600',
        paddingLeft: 15,
    },
    text: {
        fontSize: 20 / fontScale,
        fontWeight: '400',
        textAlign: 'right',
        paddingRight: 15,
    },
    textTitle: {
        fontSize: 25 / fontScale,
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