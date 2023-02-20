import { Dimensions, View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import { ActionButton } from './ActionButton';
import MarqueeText from 'react-native-marquee';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import TouchableCmp from '../assetsUI/TouchableCmp'

const { fontScale } = Dimensions.get('window');

export const EventosCard = ({props,navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const redirect = () =>{
        navigation.navigate("EventosDetails", {datos:props})
    }

    return (
        <View style={{paddingLeft:0}}>
            <View style={styles.card}>
                <View style={styles.primera}>
                    <View style={styles.detalles}>
                        <MarqueeText
                            style={{ fontSize: 22 / fontScale, fontWeight:'700' }}
                            speed={0.1}
                            marqueeOnStart={true}
                            loop={true}
                            delay={2000}
                        >
                            {props.equipoLocal==props.equipos[0]?.equipoId?props.equipos[0]?.nombre:props.equipos[1]?.nombre} vs {props.equipoVisitante==props.equipos[1]?.equipoId?props.equipos[1]?.nombre:props.equipos[0]?.nombre}
                        </MarqueeText>
                        <Text style={styles.details} numberOfLines={1}>{props.fechaEvento} - {props.horaEvento}</Text>
                    </View>
                    <View style={styles.detalles}>
                        <Text style={styles.camp} numberOfLines={1}>{props.canchaJugada}</Text>
                    </View>
                </View>
                <View style={styles.segunda}>
                    <View style={styles.textoSegunda}>
                        <Text style={styles.sex} numberOfLines={1}></Text>
                    </View>
                    <View style={styles.viewTouch}>
                        <ActionButton
                            icon="info"
                            color="#FFF"
                            backgroundColor="#003070"
                            handler={() => {redirect()}}
                            text="Información"
                            widthPercentage={0.3}
                            heightPercentage={0.035}
                        />
                    </View>
                </View>
            </View>
            <Modal isVisible={isModalVisible} onRequestClose={() => {setModalVisible(false)}}>
                <ScrollView style={styles.modal} contentContainerStyle={[styles.contentContainer]}>
                    <View style={styles.titulo}>
                        <Text style={styles.title}>{props.nombreEvento}</Text>
                    </View>
                    <View style={styles.fecha}>
                        <Text style={styles.txtTitulo}>Fecha</Text>
                        <Text style={styles.txt}>{props.fechaEvento} - {props.horaEvento}</Text>
                    </View>
                    <View style={styles.equipos}>
                        <Text style={styles.txtTitulo}>Equipo local</Text>
                        <Text style={styles.txt}>{props.equipoLocal==props.equipos[0]?.equipoId?props.equipos[0]?.nombre:props.equipos[1]?.nombre}</Text>
                        <Text style={styles.txtTitulo}>Equipo visitante</Text>
                        <Text style={styles.txt}>{props.equipoVisitante==props.equipos[1]?.equipoId?props.equipos[1]?.nombre:props.equipos[0]?.nombre}</Text>
                    </View>
                    <View style={styles.director}>
                        <Text style={styles.txtTitulo}>Director técnico local</Text>
                        <Text style={styles.txt}>{props.directorTecnicoLocal}</Text>
                        <Text style={styles.txtTitulo}>Director técnico visitante</Text>
                        <Text style={styles.txt}>{props.directorTecnicoVisitante}</Text>
                    </View>
                    <View style={styles.puntos}>
                        <Text style={styles.txtTitulo}>Puntos equipo local</Text>
                        <Text style={styles.txt}>{props.puntosLocal}</Text>
                        <Text style={styles.txtTitulo}>Puntos equipo visitante</Text>
                        <Text style={styles.txt}>{props.puntosVisitante}</Text>
                    </View>
                    <View style={styles.jornada}>
                        <Text style={styles.txtTitulo}>Jornada</Text>
                        <Text style={styles.txt}>{props.jornada}</Text>
                    </View>
                    <View style={styles.notas}>
                        <Text style={styles.txtTitulo}>Notas</Text>
                        <Text style={styles.txt}>{props.incidentes}</Text>
                    </View>
                    <View style={styles.boton}>
                        {Platform.OS === 'android' ?
                            <TouchableNativeFeedback onPress={()=>setModalVisible(false)}>
                                <View style={styles.btn}>
                                    <Text style={styles.txtBtn}>OK</Text>
                                </View>
                            </TouchableNativeFeedback>
                        :
                            <TouchableOpacity onPress={()=>setModalVisible(false)}>
                                <View style={styles.btn}>
                                    <Text style={styles.txtBtn}>OK</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        {/* <TouchableCmp onPress={()=>setModalVisible(false)}>
                            <View style={styles.btn}>
                                <Text style={styles.txtBtn}>OK</Text>
                            </View>
                        </TouchableCmp> */}
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({ 
    card:{
        backgroundColor:'#FFF',
        height:120,
        width:'100%',
        borderBottomWidth:1,
        borderColor:'#DDDDDD',
        paddingBottom:20,
        paddingTop:15,
        paddingHorizontal:30,
        flexDirection:'row',
        justifyContent:'space-between',
        overflow:'hidden'
    },
    btnInfo:{
        flexDirection:'row',
        backgroundColor: '#003070',
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:10,
        borderRadius:10,
    },
    segunda:{
        alignItems:'flex-end',
        justifyContent:'space-between',
    },
    nom:{
        fontSize:25 / fontScale,
        fontWeight:'700'
    },
    details:{
        fontSize:17 / fontScale,
        fontWeight:'500'
    },
    camp:{
        fontSize:15 / fontScale,
        fontWeight:'400'
    },
    sex:{
        fontSize:16 / fontScale,
        fontWeight:'900'
    },
    info:{
        color:'white'
    },
    primera:{
        justifyContent:'space-between'
    },
    textoSegunda:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
        height:30
    },
    viewTouch:{
        overflow:'hidden'
    },
    detalles:{
        overflow:'hidden',
    },
    modal:{
        backgroundColor: 'white',
        borderRadius:15,
        paddingVertical:30,
        paddingHorizontal:33
    },
    title:{
        fontFamily: 'Fredoka-SemiBold',
        fontSize: 30 / fontScale,
        textAlign:'center'
    },
    titulo:{
        marginBottom:20
    },
    txtTitulo:{
        fontFamily: 'Fredoka-Medium',
        fontSize: 20 / fontScale,
        paddingLeft:3
    },
    txt:{
        fontFamily: 'Fredoka-Light',
        fontSize: 18 / fontScale,
        paddingLeft:3,
        marginVertical:5
    },
    fecha:{
        marginTop:30,
    },
    equipos:{
        marginTop:30,
    },
    director:{
        marginTop:30,
    },
    puntos:{
        marginTop:30,
    },
    jornada:{
        marginTop:30,
    },
    notas:{
        marginTop:30,
    },
    contentContainer:{
        paddingBottom: 50
    },
    btn:{
        paddingVertical:8,
        width:90,
        borderRadius:15,
        backgroundColor:'#003070',
    },
    txtBtn:{
        fontFamily: 'Fredoka-Regular',
        fontSize: 18 / fontScale,
        color:'white',
        textAlign:'center'
    },
    boton:{
        marginTop:50,
        alignItems:'flex-end',
        overflow:'hidden'
    }
})