import { Dimensions, View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableNativeFeedback, Platform, FlatList, TouchableWithoutFeedback } from "react-native";
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
    let datos = props.route.params.datos //id, nombre, fecha, hora, equipoloca, etc

    const mostrarJugadores = () =>{
        if(equipoSelec=='local')
            return datos.eventos_details.filter(obj => obj.deportista.equipo.nombre == datos.EquipoLocal.nombre)
        else
            return datos.eventos_details.filter(obj => obj.deportista.equipo.nombre == datos.EquipoVisitante.nombre)
    }

    const Item = ({title,apellido,num}) => (
        <View style={styles.item}>
            <View style={styles.item2}>
                <Text style={styles.itemTxt}>{title} {apellido}</Text>
                {num&&<Text style={styles.itemTxt}>#{num}</Text>}
            </View>
        </View>
    );
    return(
        <View>
            <Header navigation={props.navigation} title={"Datos del Evento"} funcion={"goback"}/>
            <ScrollView style={styles.modal} contentContainerStyle={[styles.contentContainer]}>
                <View style={styles.titulo}>
                    <Text style={styles.title}>{datos.nombre}</Text>
                </View>
                <View style={styles.fecha}>
                    <Text style={styles.txtTitulo}>Fecha</Text>
                    <Text style={styles.txt}>{datos.fecha}     {datos.hora}</Text>
                </View>
                <View style={styles.equipos}>
                    <Text style={styles.txtTitulo}>Equipo local</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.txt}>{datos.EquipoLocal.nombre}</Text>
                        <TouchableCmp onPress={()=>{setModalVisible(true),setEquipoSelec("local")}}> 
                            <View style={{backgroundColor:'#003070',width:Dimensions.get('window').width*0.3,justifyContent:'center',borderRadius:15}}>
                                <Text style={{textAlign:'center',color:'white'}}>Ver jugadores</Text>
                            </View>
                        </TouchableCmp>
                    </View>
                    <Text style={styles.txtTitulo}>Equipo visitante</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.txt}>{datos.EquipoVisitante.nombre}</Text>
                        <TouchableCmp onPress={()=>{setModalVisible(true),setEquipoSelec("visitante")}}>
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
            <Modal isVisible={isModalVisible} onRequestClose={() => {setModalVisible(false),setEquipoSelec}}>
                <TouchableWithoutFeedback onPress={() => {setModalVisible(false),setEquipoSelec}}>
                    <View style={styles.salir1} />
                </TouchableWithoutFeedback>
                <View style={{backgroundColor:'white',height:Dimensions.get('window').height*.5,paddingHorizontal:15, paddingTop:20,borderRadius:15}}>
                    {/* <Text numberOfLines={2} style={{fontFamily: 'Fredoka-Medium',fontSize: 25 / fontScale,textAlign:'center'}}>Jugadores equipo {datos.EquipoLocal}</Text> */}
                    <Text numberOfLines={2} style={{fontFamily: 'Fredoka-Medium',fontSize: 25 / fontScale,textAlign:'center'}}>{equipoSelec=="local"?datos.EquipoLocal.nombre:datos.EquipoVisitante.nombre}</Text>
                    <View style={styles.modalBody}>
                        <FlatList
                            data={mostrarJugadores()}
                            renderItem={({item}) => <Item title={item.deportista.nombres} apellido={item.deportista.apellidos} num={item.deportista.numJugador}/>}
                            keyExtractor={item => item.deportista.id}
                        />
                        <View style={{alignItems:'center'}}>
                            <View style={{overflow:'hidden', width:'80%',borderRadius:15}}>
                                <TouchableCmp onPress={() => {setModalVisible(false),setEquipoSelec}}>
                                    <View style={styles.butonmodal}>
                                        <Text style={styles.butonmodalTxt}>Cerrar</Text>
                                    </View>
                                </TouchableCmp>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => {setModalVisible(false),setEquipoSelec}}>
                    <View style={styles.salir1} />
                </TouchableWithoutFeedback>
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
    },
    salir1:{
        height:'25%',
        width:'110%',
        marginLeft:'-5%'
    },
    butonmodal:{
        borderRadius:15,
        backgroundColor:'#003070',
        width:'100%',
        padding:10,
        justifyContent:'center',
        overflow:'hidden'
    },
    butonmodalTxt:{
        color:'white',
        fontWeight:'bold',
        fontSize:20/fontScale,
        textAlign:'center'
    },
    modalBody:{
        justifyContent:'space-between',
        height:'80%',
        marginTop:20
    },
    item:{
        // backgroundColor:'green',
        marginBottom:5,
        paddingHorizontal:5,
        borderBottomWidth:1,
        borderColor:'#B8B8B8'
    },
    item2:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    itemTxt:{
        fontSize:16/fontScale,
    }
})