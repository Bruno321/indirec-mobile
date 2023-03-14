import { Dimensions, View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableNativeFeedback, Platform, FlatList } from "react-native";
import { ActionButton } from '../components/ActionButton';
import MarqueeText from 'react-native-marquee';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import { Col, Header, List } from '../components';
import TouchableCmp from "../assetsUI/TouchableCmp";
import { useFetchData } from '../Hooks/Fetch.hook';

const { fontScale } = Dimensions.get('window');

export const EventosDetails = (props) =>{
	const [isModalVisible, setModalVisible] = useState(false);
    const [equipoSelec, setEquipoSelec] = useState();
    let datos = props.route.params.datos
    console.log("AAAAAAAAAAA:" + datos.deportista[0])

    const Item = ({title,apellido}) => (
        <View style={styles.item}>
          <Text style={{}}>{title} {apellido}</Text>
        </View>
    );
    return(
        <View>
            <Header navigation={props.navigation} title={"Datos del Evento"} funcion={"goback"}/>
            <ScrollView style={styles.modal} contentContainerStyle={[styles.contentContainer]}>
                <View style={styles.titulo}>
                    <Text style={styles.title}>{datos.nombreEvento}</Text>
                </View>
                <View style={styles.fecha}>
                    <Text style={styles.txtTitulo}>Fecha</Text>
                    <Text style={styles.txt}>{datos.fechaEvento} -{datos.horaEvento}</Text>
                </View>
                <View style={styles.equipos}>
                    <Text style={styles.txtTitulo}>Equipo local</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.txt}>{datos.equipoLocal==datos.equipos[0]?.equipoId?datos.equipos[0]?.nombre:datos.equipos[1]?.nombre}</Text>
                        <TouchableCmp onPress={()=>{setModalVisible(true),setEquipoSelec(datos.equipoLocal)}}>
                            <View style={{backgroundColor:'#003070',width:Dimensions.get('window').width*0.3,justifyContent:'center',borderRadius:15}}>
                                <Text style={{textAlign:'center',color:'white'}}>Ver jugadores</Text>
                            </View>
                        </TouchableCmp>
                    </View>
                    <Text style={styles.txtTitulo}>Equipo visitante</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.txt}>{datos.equipoVisitante==datos.equipos[1]?.equipoId?datos.equipos[1]?.nombre:datos.equipos[0]?.nombre}</Text>
                        <TouchableCmp onPress={()=>{setModalVisible(true),setEquipoSelec(datos.equipoVisitante)}}>
                            <View style={{backgroundColor:'#003070',width:Dimensions.get('window').width*0.3,justifyContent:'center',borderRadius:15}}>
                                <Text style={{textAlign:'center',color:'white'}}>Ver jugadores</Text>
                            </View>
                        </TouchableCmp>
                    </View>
                </View>
                <View style={styles.director}>
                    <Text style={styles.txtTitulo}>Director técnico local</Text>
                    <Text style={styles.txt}>{datos.directorTecnicoLocal}</Text>
                    <Text style={styles.txtTitulo}>Director técnico visitante</Text>
                    <Text style={styles.txt}>{datos.directorTecnicoVisitante}</Text>
                </View>
                <View style={styles.puntos}>
                    <Text style={styles.txtTitulo}>Puntos equipo local</Text>
                    <Text style={styles.txt}>{datos.puntosLocal}</Text>
                    <Text style={styles.txtTitulo}>Puntos equipo visitante</Text>
                    <Text style={styles.txt}>{datos.puntosVisitante}</Text>
                </View>
                <View style={styles.jornada}>
                    <Text style={styles.txtTitulo}>Jornada</Text>
                    <Text style={styles.txt}>{datos.jornada}</Text>
                </View>
                <View style={styles.notas}>
                    <Text style={styles.txtTitulo}>Notas</Text>
                    <Text style={styles.txt}>{datos.incidentes}</Text>
                </View>
                <View style={styles.boton}>
                    {Platform.OS === 'android' ?
                        <TouchableNativeFeedback onPress={()=>{setModalVisible(false)}}>
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
                </View>
            </ScrollView>
            <Modal isVisible={isModalVisible} onRequestClose={() => {setModalVisible(false)}}>
                <View style={{backgroundColor:'white',height:Dimensions.get('window').height*.5,paddingHorizontal:15, paddingTop:20,borderRadius:15}}>
                    <Text numberOfLines={2} style={{fontFamily: 'Fredoka-Medium',fontSize: 25 / fontScale,textAlign:'center'}}>Jugadores equipo {equipoSelec==datos.equipos[0]?.equipoId?datos.equipos[0]?.nombre:datos.equipos[1]?.nombre}</Text>
                    <View>
                        <FlatList
                            data={datos.deportista}
                            renderItem={({item}) => equipoSelec==item.equipoId?<Item title={item.nombres} apellido={item.apellidos}/>:""}
                            keyExtractor={item => item.deportistaId}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({ 
    modal:{
        backgroundColor: 'white',
        borderRadius:15,
        paddingVertical:30,
        paddingHorizontal:15
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
        paddingBottom: 40
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