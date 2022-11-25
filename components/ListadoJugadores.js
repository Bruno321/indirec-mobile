import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, SafeAreaView, Image, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TouchableCmp from '../assetsUI/TouchableCmp';
import Feather from 'react-native-vector-icons/Feather';

const ListadoJugadores = () => {
    const [modalActive, setModalActive] = useState(false);
    const initialList = [
        { "id": "1", "nombre": "Sebas Mbappé", "sel": false },
        { "id": "2", "nombre": "Alan Ronaldo", "sel": false },
        { "id": "3", "nombre": "Bruno Cristiano", "sel": false },
        { "id": "4", "nombre": "Josué Dont", "sel": false },
        { "id": "5", "nombre": "Jorge Campos", "sel": false },
        { "id": "6", "nombre": "Luis Flores", "sel": false },
        { "id": "7", "nombre": "Carlos Mendieta", "sel": false },
        { "id": "8", "nombre": "Adrian Zavaleta", "sel": false },
        { "id": "9", "nombre": "dummy1", "sel": false },
        { "id": "10", "nombre": "dummy2", "sel": false },
        { "id": "11", "nombre": "dummy3", "sel": false },
        { "id": "12", "nombre": "dummy4", "sel": false },
        { "id": "13", "nombre": "dummy5", "sel": false },
        { "id": "14", "nombre": "dummy6", "sel": false },
        { "id": "15", "nombre": "dummy7", "sel": false },
        { "id": "16", "nombre": "dummy8", "sel": false },
        { "id": "17", "nombre": "dummy9", "sel": false },
        { "id": "18", "nombre": "dummy10", "sel": false },
        { "id": "19", "nombre": "dummy11", "sel": false },
        { "id": "20", "nombre": "dummy12", "sel": false },
        { "id": "22", "nombre": "dummy13", "sel": false },
        { "id": "45", "nombre": "dummy45", "sel": false },
    ];
    const [myList, setMyList] = useState(initialList);
    const [mySeleccionadosList, setmySeleccionadosList] = useState({});
    function actualizarListaSeleccion(value, value2) {
        const myNextList = [...myList];
        const seleccionar = myNextList.find(
            a => a.id === value
        );
        seleccionar.sel = value2;
        setMyList(myNextList);

        const myNextSeleccionadosList = [];
        myNextList.find(
            a => { if (a.sel == true) { myNextSeleccionadosList.push(a) } }
        );
        setmySeleccionadosList(myNextSeleccionadosList)
    }

    const limpiarLista = () => {
        const myNextList = [...myList];
        console.log(myNextList);
        const limpiados = myNextList;
        console.log("LIMPIADOS> " + JSON.stringify(limpiados));
        for (let i = 0; i < limpiados.length; i++) {
            limpiados[i].sel = false;
        }
        console.log("LIMPIADOS> " + JSON.stringify(limpiados));
        setMyList(myNextList);
        const myNextSeleccionadosList = [];
        myNextList.find(
            a => { if (a.sel == true) { myNextSeleccionadosList.push(a) } }
        );
        setmySeleccionadosList(myNextSeleccionadosList)
    }

    const cargarEquipoSeleccionado = (props) => {
        var output = [];
        for (let i = 0; i < props.length; i++) {
                var tempItem = (
                    <View style={styles.ViewJugador}>
                        <View style={styles.celda3a}>
                            <Text style={styles.celda3y4Texta} numberOfLines={1}>{props[i].id}</Text>
                        </View>
                        <View style={styles.celda4a}>
                            <Text style={styles.celda3y4Texta} numberOfLines={2}>{props[i].nombre}</Text>
                        </View>
                    </View>
                )
                output[i] = (tempItem);
        }
        return (
            <View>
                {output}
            </View>
        )
    }
    const cargarEquipoCompleto = (props) => {
        var output = [];
        for (let i = 0; i < props.length; i++) {
            var tempItem = (
                <View key={i} style={styles.ViewJugador}>
                    <View style={props[i].sel == false ? styles.celda3a : styles.celda3b}>
                        <Text style={props[i].sel == false ? styles.celda3y4Texta : styles.celda3y4Textb} numberOfLines={1}>{props[i].id}</Text>
                    </View>
                    <View style={props[i].sel == false ? styles.celda4a : styles.celda4b}>
                        <Text style={props[i].sel == false ? styles.celda3y4Texta : styles.celda3y4Textb} numberOfLines={2}>{props[i].nombre}</Text>
                    </View>
                    {/* {props[i].sel == false ?} */}
                    <TouchableCmp onPress={() => actualizarListaSeleccion(props[i].id, true)}>
                        <View style={props[i].sel == false ? styles.celda5a : styles.celda5b}>
                            <FontAwesome name='plus-square-o' size={25} color={props[i].sel == false ?'#003070' : "#888"} />
                            <Text style={props[i].sel == false ? styles.celda3y4Texta : styles.celda3y4Textb} numberOfLines={1}>Añadir</Text>
                        </View>
                    </TouchableCmp>
                    <TouchableCmp onPress={() => actualizarListaSeleccion(props[i].id, false)}>
                        <View style={props[i].sel == false ? styles.celda6a : styles.celda6b}>
                            <FontAwesome name='trash-o' size={25} color={props[i].sel == false ?'#BBB' : "#C0392B"} />
                        </View>
                    </TouchableCmp>
                </View>
            )
            output[i] = (tempItem);
        }
        return (
            <ScrollView>
                {output}
            </ScrollView>
        )
    }

    return (
        <>
            <View style={styles.View}>
                <View style={styles.headerLista}>
                    <View style={styles.celda1HeaderLista}>
                        <Text style={styles.celda1y2Text}>#</Text>
                    </View>
                    <View style={styles.celda2HeaderLista}>
                        <Text style={styles.celda1y2Text}>Nombre Completo</Text>
                    </View>
                </View>
                {cargarEquipoSeleccionado(mySeleccionadosList)}
            </View>
            <View style={styles.viewEditar1}>
                <TouchableCmp onPress={() => { setModalActive(true) }}>
                    <View style={styles.viewEditar2}>
                        <Text style={styles.viewEditarText}>Editar equipo</Text>
                    </View>
                </TouchableCmp>
            </View>
            <Modal
                animationType={'fade'}
                transparent
                // visible={true}
                visible={modalActive}
                onRequestClose={() => setModalActive(false)}
                propagateSwipe={true}
            >
                <View style={styles.ModalStyle}>
                    <View style={styles.headerComponent}>
                        <SafeAreaView />
                        <View style={styles.header}>
                            <Image
                                style={styles.logoTexto}
                                source={require('../images/indereq-logo-texto.png')}
                            />
                        </View>
                        <View style={styles.menu}>
                            <Feather name={'arrow-left'} size={35} color={'white'} onPress={() => setModalActive(false)} />
                        </View>
                    </View>
                    <View style={styles.ModalView1}>
                        <Text style={styles.ModalView1a}>Lista de Jugadores</Text>
                        <Text style={styles.ModalView1b}>Troyanos Uaq</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.ModalView1c}>Basketball</Text>
                            <Text style={styles.ModalView1c}>Varonil</Text>
                        </View>
                        <Text style={styles.ModalView1d} numberOfLines={2}>Facultad de Informática - Campus Juriquilla</Text>
                    </View>
                    {/* <View style={{width: 100, height: "auto", borderRadius: 500, overflow: 'hidden', alignSelf: 'flex-end',}}>
                    </View> */}
                    <View style={styles.ModalView2}>
                        <View style={styles.headerLista}>
                            <View style={styles.celda1HeaderLista}>
                                <Text style={styles.celda1y2Text}>#</Text>
                            </View>
                            <View style={styles.celda2HeaderLista}>
                                <Text style={styles.celda1y2Text}>Nombre Completo</Text>
                            </View>
                            <View style={styles.celda3HeaderLista}>
                                <Button title='Limpiar' color={"#003070"} onPress={() => limpiarLista()}/>
                                {/* <Text style={styles.celda1y2Text}>Nombre Completo</Text> */}
                            </View>
                        </View>
                        {cargarEquipoCompleto(myList)}
                    </View>
                    {/* <View style={styles.ModalView3}>
                        <Button title={"IMPRIMIR LISTA"} onPress={() => console.log("LISTA IMPRESA > " + JSON.stringify(myList) + "\nTypeof > " + typeof JSON.stringify(myList))} />
                    </View> */}
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    View: {
        marginTop: 10,
        width: "100%",
        // height: 260,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: "#C0C0C0",
    },
    headerLista: {
        backgroundColor: '#003070',
        flexDirection: 'row',
    },
    celda1HeaderLista: {
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        // backgroundColor: '#F00',
    },
    celda2HeaderLista: {
        width: "40%",
        justifyContent: 'center',
        height: 40,
        // backgroundColor: '#0F0',
    },
    celda3HeaderLista: {
        width: "40%",
        justifyContent: 'center',
        height: 40,
        // backgroundColor: '#00F',
    },
    celda1y2Text: {
        color: 'white',
        fontFamily: 'Fredoka-Light',
        fontSize: 12,
    },
    ViewJugador: {
        // backgroundColor: '#EEE',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: "#C0C0C0",
    },
    celda3a: {
        backgroundColor: '#FFF',
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    celda3b: {
        backgroundColor: '#EEE',
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    celda4a: {
        backgroundColor: '#FFF',
        width: "50%",
        justifyContent: 'center',
    },
    celda4b: {
        backgroundColor: '#EEE',
        width: "50%",
        justifyContent: 'center',
    },
    celda3y4Texta: {
        color: 'black',
        fontFamily: 'Fredoka-Light',
        fontSize: 12,
    },
    celda3y4Textb: {
        color: '#888',
        fontFamily: 'Fredoka-Light',
        fontSize: 12,
    },
    celda5a: {
        backgroundColor: '#FFF',
        width: "20%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    celda5b: {
        backgroundColor: '#EEE',
        width: "20%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    celda6a: {
        backgroundColor: '#FFF',
        width: "10%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    celda6b: {
        backgroundColor: '#EEE',
        width: "10%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewEditar1: {
        borderWidth: 1,
        borderColor: '#003070',
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        height: 40,
        overflow: 'hidden',
    },
    viewEditar2: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewEditarText: {
        // backgroundColor: '#EEE',
        color: '#003070',
        fontFamily: 'Fredoka-Light',
        fontSize: 12,
    },
    // 
    // 
    // 
    // 
    // ESTILOS DEL MODAL 
    // 
    // 
    // 
    // 
    ModalStyle: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    ModalView1: {
        width: '100%',
        height: 200,
        // backgroundColor: 'purple',
        padding: 20,
    },
    ModalView1a: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ModalView1b: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ModalView1c: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ModalView1d: {
    },
    ModalView2: {
        height: '60%',
        // bottom: 'auto',
        // backgroundColor: 'pink',
    },
    ModalView3: {
        width: '100%',
        height: '20%',
    },
    logoTexto: {
        width: "66%",
        height: 50,
        resizeMode: 'contain',
    },
    headerComponent: {
        backgroundColor: '#003070',
        height: "10%",
    },
    header: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        position: 'absolute',
        marginTop: 20,
        marginLeft: 20,
    }

});

export default ListadoJugadores;