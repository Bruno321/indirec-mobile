import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, SafeAreaView, Image, Button, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Header } from '../components';
import TouchableCmp from '../assetsUI/TouchableCmp';
import Feather from 'react-native-vector-icons/Feather';

const { width, fontScale } = Dimensions.get('window');

export const ListadoJugadores = (props) => {
    // console.log(props.route.params.var);
    var dataSource = props.route.params.var.deportistas;
    var aSelected = props.route.params.var.aSelected;
    var setSelected = props.route.params.var.setSelected;
    const [aJugadores, setJugadores] = useState(dataSource || []);
    useEffect(() => {
        if (dataSource?.length) {
            setJugadores(dataSource);
        }
    }, [dataSource]);

    const isSelected = sId => aSelected.findIndex(j => j.deportistaId === sId) !== -1;
    const updateSelected = sId => {
        const nIndex = aSelected.findIndex(j => j.deportistaId === sId);
        const aTmp = [...aSelected];
        if (nIndex !== -1) {
            aTmp.splice(nIndex, 1);
            setSelected(aTmp);
        } else {
            aTmp.push(aJugadores.find(j => j.deportistaId === sId));
            setSelected(aTmp);
        }
    };

    const LoadSelected = (props) => {
        return props.map(x =>
            <View key={x.deportistaId + "SelView1"} style={styles.ViewJugador}>
                <View key={x.deportistaId + "SelView2"} style={styles.celda3a}>
                    <Text
                        key={x.deportistaId + "SelText1"}
                        style={styles.celda3y4Texta}
                        numberOfLines={1}
                    >
                        {x.numJugador}
                    </Text>
                </View>

                <View key={x.deportistaId + "SelView3"} style={styles.celda4a}>
                    <Text
                        key={x.deportistaId + "SelText2"}
                        style={styles.celda3y4Texta}
                        numberOfLines={2}
                    >
                        {x.nombres}
                    </Text>
                </View>
            </View>
        );
    }

    const showJugadores = jugadores => {
        return (jugadores.map(x => (
            <View
                key={x.deportistaId + "view1"}
                style={styles.ViewJugador}
            >
                <View
                    key={x.deportistaId + "view2"}
                    style={!isSelected(x.deportistaId) ? styles.celda3a : styles.celda3b}
                >
                    <Text
                        key={x.deportistaId + "text1"}
                        style={!isSelected(x.deportistaId) ? styles.celda3y4Texta : styles.celda3y4Textb}
                        numberOfLines={1}
                    >
                        {x.numJugador}
                    </Text>
                </View>
                <View
                    key={x.deportistaId + "view3"}
                    style={!isSelected(x.deportistaId) ? styles.celda4a : styles.celda4b}
                >
                    <Text
                        key={x.deportistaId + "text2"}
                        style={!isSelected(x.deportistaId) ? styles.celda3y4Texta : styles.celda3y4Textb}
                        numberOfLines={2}
                    >
                        {x.nombres}
                    </Text>
                </View>
                <TouchableCmp
                    key={x.deportistaId + "touchable1"}
                    onPress={() => updateSelected(x.deportistaId, true)}
                >
                    <View
                        key={x.deportistaId + "view4"}
                        style={!isSelected(x.deportistaId) ? styles.celda5a : styles.celda5b}
                    >
                        <FontAwesome
                            key={x.deportistaId + "icon1"}
                            name='plus-square-o'
                            size={25}
                            color={!isSelected(x.deportistaId) ? '#003070' : "#888"}
                        />
                        <Text
                            key={x.deportistaId + "text3"}
                            style={!isSelected(x.deportistaId) ? styles.celda3y4Texta : styles.celda3y4Textb}
                            numberOfLines={1}
                        >
                            Añadir
                        </Text>
                    </View>
                </TouchableCmp>

                <TouchableCmp
                    key={x.deportistaId + "touchable2"}
                    onPress={() => updateSelected(x.deportistaId, false)}
                >
                    <View key={x.deportistaId + "view5"}
                        style={!isSelected(x.deportistaId) ? styles.celda6a : styles.celda6b}
                    >
                        <FontAwesome
                            key={x.deportistaId + "icon2"}
                            name='trash-o'
                            size={25}
                            color={!isSelected(x.deportistaId) ? '#BBB' : "#C0392B"}
                        />
                    </View>
                </TouchableCmp>
            </View>
        )
        ))
    };

    return (
        <>
            <View style={styles.ModalStyle}>
                <SafeAreaView style={{ backgroundColor: "#003070" }} />
                <Header navigation={props.navigation} title={"Lista de Jugadores"} funcion={"goback"} />
                <View style={styles.ModalView1}>
                    <Text style={styles.ModalView1a}>Lista de Jugadores</Text>
                    <Text style={styles.ModalView1b}>Troyanos Uaq</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.ModalView1c}>Basketball</Text>
                        <Text style={styles.ModalView1c}>Varonil</Text>
                    </View>
                    <Text style={styles.ModalView1d} numberOfLines={2}>Facultad de Informática - Campus Juriquilla</Text>
                </View>
                <View style={styles.ModalView2}>
                    <View style={styles.headerLista}>
                        <View style={styles.celda1HeaderLista}>
                            <Text style={styles.celda1y2Text}>#</Text>
                        </View>
                        <View style={styles.celda2HeaderLista}>
                            <Text style={styles.celda1y2Text}>Nombre Completo</Text>
                        </View>
                        <View style={styles.celda3HeaderLista}>
                            <TouchableCmp onPress={() => setSelected([])}>
                                <View style={styles.celda3HeaderLista2}>
                                    <Text style={styles.celda1y2Text}>Limpiar</Text>
                                </View>
                            </TouchableCmp>
                        </View>
                    </View>
                    <ScrollView>
                        
                        {showJugadores(aJugadores)}
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    View: {
        marginTop: 10,
        width: "100%",
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
    },
    celda2HeaderLista: {
        width: "40%",
        justifyContent: 'center',
        height: 40,
    },
    celda3HeaderLista: {
        width: "40%",
        justifyContent: 'center',
        height: 40,
        // backgroundColor: '0F0'
    },
    celda3HeaderLista2: {
        // backgroundColor: '#0030',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    celda1y2Text: {
        color: 'white',
        fontFamily: 'Fredoka-Light',
        fontSize: 12 / fontScale,
    },
    ViewJugador: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: "#C0C0C0",
        height: 41,
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
        fontSize: 12 / fontScale,
    },
    celda3y4Textb: {
        color: '#888',
        fontFamily: 'Fredoka-Light',
        fontSize: 12 / fontScale,
    },
    celda5a: {
        // backgroundColor: '#F00',
        width: width * 0.2,
        height: "100%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // alignSelf: 'center',
        flexDirection: 'row',
    },
    celda5b: {
        backgroundColor: '#EEE',
        width: width * 0.2,
        height: "100%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    celda6a: {
        backgroundColor: '#FFF',
        width: width * 0.1,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    celda6b: {
        backgroundColor: '#EEE',
        width: width * 0.1,
        height: "100%",
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
        color: '#003070',
        fontFamily: 'Fredoka-Light',
        fontSize: 12 / fontScale,
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
        // height: 200,
        // backgroundColor: 'pink',
        padding: 20,
    },
    ModalView1a: {
        fontSize: 40 / fontScale,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ModalView1b: {
        fontSize: 25 / fontScale,
        fontWeight: 'bold',
    },
    ModalView1c: {
        fontSize: 18 / fontScale,
        fontWeight: 'bold',
    },
    ModalView1d: {
        fontSize: 18 / fontScale,
    },
    ModalView2: {
        height: '60%',
        // backgroundColor: 'red',
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
