import React, { useState, useEffect } from "react";
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import TouchableCmp from "../assetsUI/TouchableCmp";

const { fontScale, width } = Dimensions.get('window');

export const ButtonsPages = ({ numberPage, setPagina, total }) => {
    const [availableLeft, setAvailableLeft] = useState(false);
    const [availableRight, setAvailableRight] = useState(false);

    /* VALIDAR SI PUEDES CAMBIAR DE PANTALLAS */

    useEffect(() => {
        setAvailableRight(numberPage < Math.ceil(total / 10) - 1);
        setAvailableLeft(numberPage == 0 ? false : true);
    }, [numberPage, total])
    
    const previousPage = () => {
        var newPage = numberPage - 1;
        setPagina(newPage);
        setAvailableLeft(newPage > 0);
        setAvailableRight(true);
    };

    const nextPage = () => {
        var newPage = numberPage + 1;
        setPagina(newPage);
        setAvailableLeft(true);
        setAvailableRight(newPage < Math.ceil(total / 10) - 1);
    };

    return (
        <View style={styles.containerButtonsPages}>
            {
                availableLeft == false
                    ?
                    <View style={styles.arrows}>
                        <Feather name={'chevron-left'} size={35} color={'#003070'} />
                    </View>
                    :
                    <TouchableCmp onPress={() => { previousPage() }}>
                        <View style={styles.arrows}>
                            <Feather name={'chevron-left'} size={35} color={'#FFF'} />
                        </View>
                    </TouchableCmp>
            }
            <Text style={styles.centeredText}>Página {numberPage + 1}</Text>
            {/* <Text style={styles.centeredText}>Página {numberPage + 1} de {Math.ceil(total / 10)}</Text> */}

            {
                availableRight == false
                    ?
                    <View style={styles.arrows}>
                        <Feather name={'chevron-right'} size={35} color={'#003070'} />
                    </View>
                    :
                    <TouchableCmp onPress={() => { nextPage() }}>
                        <View style={styles.arrows}>
                            <Feather name={'chevron-right'} size={35} color={'#FFF'} />
                        </View>
                    </TouchableCmp>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    containerButtonsPages: {
        backgroundColor: '#003070',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: width*.2,
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderRadius: 50,
        overflow: 'hidden',
        alignSelf: 'center',
        height: 50,
        // shadowColor: "#000",
        // elevation: 5,
    },
    arrows: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredText: {
        fontSize: 20 / fontScale,
        color: "#FFF"
    }
});