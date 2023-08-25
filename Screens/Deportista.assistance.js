import { View, Text, ScrollView, StyleSheet, Dimensions, Button, SafeAreaView } from "react-native";
import { Header, Row, Col, List, AsistenciaIndCard } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import { useState, useEffect, useCallback, useRef } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import TouchableCmp from "../assetsUI/TouchableCmp";
import { process, SAVE, FIND } from "../Service/Api";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

///////////////////////////////////////////////////
const { width, height, fontScale } = Dimensions.get('window');

const LargeText = ({ children, style = {}, numberOfLineas }) => {

    return (
        <Text style={{ fontSize: width * 0.038 / fontScale, ...style }} numberOfLines={numberOfLineas}>{children}</Text>
    );
};

export const DeportistaAssistance = ({ navigation, route }) => {
    var deportistaId = route.params.deportista.id;
    var deportistaNombre = route.params.deportista.nombres + " " + route.params.deportista.apellidos;
    const [asistencias, loading, change, update] = useFetchData('asistencias', `deportista_id=${deportistaId}`, 0, 50);
    const [testData, setTestData] = useState([]);
    const [isDark, setIsDark] = useState(false);
    const [datePicker, setDatePicker] = useState(false);
    const [calendario, setCalendario] = useState(1);

    const [dateParams, setDateParams] = useState({
        fechaFin: null,
        fechaInicio: null,
    });

    function onDateSelected(event, value) {
        setDatePicker(false);
        setDateParams({
            ...dateParams,
            [calendario === 1 ? "fechaInicio" : "fechaFin"]:value,
        });
    };

    const cual = (boton) =>{
        setCalendario(boton)
        setDatePicker(true);
    }

    const borrar = (boton) =>{
        if(boton == 1){
            setDateParams({
                ...dateParams,
                fechaInicio:null,
            });
        }else{
            setDateParams({
                ...dateParams,
                fechaFin:null,
            });
        }
        console.log("Fecha inicio " + dateParams.fechaInicio)
        console.log("Fecha fin " + dateParams.fechaFin)
    }

    const [tiempoEntrenado, setTiempoEntrenado] = useState(null);

    const getTiempoEntrenado = useCallback(async () =>{
        let oSend = { deportistaId: deportistaId };
        
        if (dateParams.fechaInicio && dateParams.fechaFin) {
            oSend.fechaInicio = dateParams.fechaInicio;
            oSend.fechaFin = dateParams.fechaFin;
        }
        
        const response = await process(SAVE, 'tiempo-entrenamiento', oSend);
        if (response?.status === 201) {
            setTiempoEntrenado(response.data.total_trained);
        }
    }, [deportistaId, dateParams]);
    
    useEffect(() => {
        getTiempoEntrenado();
    }, [getTiempoEntrenado]);
    
    useEffect(()=>{
        if(dateParams.fechaInicio !== null && dateParams.fechaFin !== null){
            change(`fecha[$gte]=${dateParams.fechaInicio}&fecha[$lte]=${dateParams.fechaFin}`)
        }
    },[dateParams.fechaFin && dateParams.fechaInicio])

    useEffect(() => {
        if (!loading) {
            if (!asistencias.data.length) {
                setTestData([{
                    deportista: {
                        nombres: "Juan Perez",
                    },
                    // horaEntrada: "2021-05-01T20:00:00.000Z",
                    // horaSalida: "2021-05-01T20:00:00.000Z",
                    // fecha: "2021-05-01T20:00:00.000Z",
                }]);
            }
        }
    }, [loading]);


    // var datosFiltrados = asistencias.data.filter(objeto => objeto.deportista.id == deportistaId);
    asistencias.data.sort((a, b) => new Date(b.horaEntrada) - new Date(a.horaEntrada));

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <SafeAreaView style={{ backgroundColor: "#003070" }} />
            <Header navigation={navigation} title={"Asistencias del Deportista"} funcion={"goback"} />
            <View style={styles.centeredView}>
                <LargeText style={styles.datoName} numberOfLineas={2}>{deportistaNombre}</LargeText>
                <Row>
                    <Col style={styles.col1}>
                        <Text style={styles.subtitle}>Sesiones de entrenamiento totales: </Text>
                    </Col>
                    <Col style={styles.col2}>
                        <Text style={styles.text}>{asistencias.data.length}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col style={styles.col1}>
                        <Text style={styles.subtitle}>Tiempo total de entrenamiento: </Text>
                    </Col>
                    <Col style={styles.col2}>
                        {/* <Text style={styles.text}>{`${tiempoEntrenado || `No hay entrenamientos registrados para ${dateParams.fechaInicio && dateParams.fechaFin ? `el rango de fechas seleccionado` : "esta semana"}`}`}</Text> */}
                        <Text style={styles.text}>{`${tiempoEntrenado || `Sin datos`}`}</Text>
                    </Col>
                </Row>
                <Row style={{ paddingVertical: 20 / fontScale }}>
                    <Col style={{ width: "100%", paddingLeft: 25 }}>
                        <Text style={styles.textTitle}>Asistencias</Text>
                        <Text style={styles.textTitle2}>Puede seleccionar un rango de fechas</Text>
                    </Col>
                </Row>
                <View style={styles.viewSemana}>
                    <View style={styles.btnSemana}>
                        <TouchableCmp onPress={()=>cual(1)} onLongPress={()=>borrar(1)}>
                            <View style={styles.btnSemana2}>
                                <Feather name={'calendar'} size={20} color={dateParams.fechaInicio?"#003070":"#808080"} />
                                <Text style={dateParams.fechaInicio?styles.btnTxt:styles.btnTxtN}>{dateParams.fechaInicio?moment(dateParams.fechaInicio).format('DD-MM-YYYY'):"Fecha inicio"}</Text>
                            </View>
                        </TouchableCmp>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={styles.btnTxtN}>al</Text>
                    </View>
                    <View style={styles.btnSemana}>
                        <TouchableCmp onPress={()=>cual(2)} onLongPress={()=>borrar(2)}>
                            <View style={styles.btnSemana2}>
                                <Feather name={'calendar'} size={20} color={dateParams.fechaInicio?"#003070":"#808080"} />
                                <Text style={dateParams.fechaFin?styles.btnTxt:styles.btnTxtN}>{dateParams.fechaFin?moment(dateParams.fechaFin).format('DD-MM-YYYY'):"Fecha final"}</Text>
                            </View>
                        </TouchableCmp>
                    </View>
                </View>
            </View>
            {datePicker && (
                <DateTimePicker
                    value={calendario==1?(dateParams.fechaInicio?dateParams.fechaInicio:new Date()):dateParams.fechaFin?dateParams.fechaFin:new Date()}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
                    style={styles.datePicker}
                    maximumDate={new Date()}
                />
            )}
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
                <List dataSource={asistencias.data.length && asistencias.data} renderItem={row => <AsistenciaIndCard props={row} estilo={isDark} />} loading={loading} />
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
    textTitle2: {
        fontSize: 15 / fontScale,
        color:'#808080'
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
    viewSemana: {
        flexDirection: 'row',
        width: "80%",
        justifyContent: 'space-between',
        marginLeft: '10%'
    },
    btnSemana: {
        borderRadius: 15,
        width: '45%',
        borderColor: "#003070",
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    btnSemana2: {
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnTxt: {
        fontSize: 17 / fontScale,
        color: "#003070",
    },
    btnTxtN: {
        fontSize: 17/ fontScale,
        color: "#808080",
    },
    tabla: {
        marginTop: 30,
        flexDirection: 'row',
        height: '4%',
        width: '100%',
        backgroundColor: "#003070",
        alignItems: 'center',
    },
    tablaTxt: {
        color: 'white',
        fontSize: 17 / fontScale,
        fontWeight: '300'
    },
    dia: {
        width: '29%',
        alignItems: 'center',
    },
    entrada: {
        width: '22%',
        alignItems: 'center',
    },
    salida: {
        width: '22%',
        alignItems: 'center',
    },
    total: {
        width: '27%',
        alignItems: 'center',
    },
});