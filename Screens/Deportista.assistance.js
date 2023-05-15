import { View, Text, ScrollView, StyleSheet, Dimensions, Button, SafeAreaView } from "react-native";
import { Header, Row, Col, List, AsistenciaIndCard } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import TouchableCmp from "../assetsUI/TouchableCmp";

///////////////////////////////////////////////////
const { width, height, fontScale } = Dimensions.get('window');

const LargeText = ({ children, style = {}, numberOfLineas }) => {

    return (
        <Text style={{ fontSize: width * 0.038 / fontScale, ...style }} numberOfLines={numberOfLineas}>{children}</Text>
    );
};

export const DeportistaAssistance = ( { navigation , route} ) => {
    const [asistencias, loading] = useFetchData('asistencias');
    const [testData, setTestData] = useState([]);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
		if (!loading) {
			if (!asistencias.length) {
				setTestData([{
					deportista: {
						nombres: "Juan Perez",
					},
					horaEntrada: "2021-05-01T20:00:00.000Z",
					horaSalida: "2021-05-01T20:00:00.000Z",
					fecha: "2021-05-01T20:00:00.000Z",
				}]);
			}
		}
	}, [loading]);

    var deportistaId = route.params.deportista.id;
    var deportistaNombre = route.params.deportista.nombres + " " + route.params.deportista.apellidos;

    var datosFiltrados = asistencias.filter(objeto => objeto.deportista.id == deportistaId);

    datosFiltrados.sort((a, b) => new Date(b.horaEntrada) - new Date(a.horaEntrada));

    var tiempoTotal = 0;

    for (let i = 0; i < datosFiltrados.length; i++) {
        const entrada = new Date(datosFiltrados[i].horaEntrada);
        const salida = new Date(datosFiltrados[i].horaSalida);
        const tiempoTranscurrido = salida.getTime() - entrada.getTime();
        const tiempoTranscurridoEnMinutos = Math.floor(tiempoTranscurrido / (1000 * 60));
        tiempoTotal += tiempoTranscurridoEnMinutos;
    }

    function convertirMinutosAHoras(minutos) {
        if (minutos < 60) {
          return `${minutos} min`;
        } else {
          const horas = Math.floor(minutos / 60);
          const minutosRestantes = minutos % 60;
          return `${horas} h ${minutosRestantes} min`;
        }
      }

    const toggleColor = () => {
        setIsDark((prevIsDark) => !prevIsDark);
        console.log("cambiando")
    };
      
    return (
        <View style={{flex:1, height:'100%'}}>
            <SafeAreaView style={{ backgroundColor: "#003070" }} />
            <Header navigation={navigation} title={"Asistencias del Deportista"} funcion={"goback"} />
            <View style={styles.centeredView}>
                <LargeText style={styles.datoName} numberOfLineas={2}>{deportistaNombre}</LargeText>
                <Row>
                    <Col style={styles.col1}>
                        <Text style={styles.subtitle}>Dias entrenados a la semana: </Text>
                    </Col>
                    <Col style={styles.col2}>
                        <Text style={styles.text}>{datosFiltrados.length}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col style={styles.col1}>
                        <Text style={styles.subtitle}>Total entrenado esta semana: </Text>
                    </Col>
                    <Col style={styles.col2}>
                        <Text style={styles.text}>{convertirMinutosAHoras(tiempoTotal)}</Text>
                    </Col>
                </Row>
                <Row style={{ paddingVertical: 20 / fontScale }}>
                    <Col style={{ width: "100%", paddingLeft: 25 }}>
                        <Text style={styles.textTitle}>Asistencias</Text>
                    </Col>
                </Row>
                <View style={styles.viewSemana}>
                    <View style={styles.btnSemana}>
                        <TouchableCmp>
                            <View style={styles.btnSemana2}>
                                <Feather name={'calendar'} size={20} color={"#003070"}/>
                                <Text style={styles.btnTxt}>24-03-2023</Text>
                            </View>
                        </TouchableCmp>
                    </View>
                    <View style={styles.btnSemana}>
                        <TouchableCmp>
                            <View style={styles.btnSemana2}>
                                <Feather name={'calendar'} size={20} color={"#003070"}/>
                                <Text style={styles.btnTxt}>24-03-2023</Text>
                            </View>
                        </TouchableCmp>
                    </View>
                </View>
            </View>
            <View style={styles.tabla}>
                <View style={styles.dia}>
                    <Text style={styles.tablaTxt}>Día</Text>
                </View>
                <View style={styles.entrada}>
                    <Text style={styles.tablaTxt}>Entrada</Text>
                </View>
                <View style={styles.salida}>
                    <Text style={styles.tablaTxt}>Salida</Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.tablaTxt}>Total horas</Text>
                </View>
            </View>
            <View>
                <List dataSource={datosFiltrados.length ? datosFiltrados : testData} renderItem={row => <AsistenciaIndCard props={row} estilo={isDark}/>} loading={loading}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    col1: {
        // backgroundColor: 'pink',
        width: "55%",
        height: 50
    },
    col2: {
        // backgroundColor: 'red',
        width: "30%",
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
    },
    viewSemana:{
        flexDirection:'row',
        width:"80%",
        justifyContent:'space-between',
        marginLeft:'10%'
    },
    btnSemana:{
        borderRadius:15,
        width:'45%',
        borderColor: "#003070",
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        overflow:'hidden'
    },
    btnSemana2:{
        padding:10,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    btnTxt:{
        fontSize: 18 / fontScale,
        color:"#003070",
    },
    tabla:{
        marginTop:30,
        flexDirection:'row',
        height:'4%',
        width:'100%',
        backgroundColor:"#003070",
        alignItems:'center',
    },
    tablaTxt:{
        color:'white',
        fontSize: 17 / fontScale,
        fontWeight:'300'
    },
    dia:{
        width:'29%',
        alignItems:'center',
    },
    entrada:{
        width:'22%',
        alignItems:'center',
    },
    salida:{
        width:'22%',
        alignItems:'center',
    },
    total:{
        width:'27%',
        alignItems:'center',
    },
});