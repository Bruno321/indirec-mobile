import React, { useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import TouchableCmp from "../assetsUI/TouchableCmp";

const { fontScale, width } = Dimensions.get('window');

export const ButtonsPages = ({ numberPage, setPagina, total }) => {
    const [availableLeft, setAvailableLeft] = useState(false);
    const [availableRight, setAvailableRight] = useState(true);
    const previousPage = () => {
        const newPage = numberPage - 1;
        setPagina(newPage);
        setAvailableLeft(newPage > 0);
        setAvailableRight(true);
    };

    const nextPage = () => {
        const newPage = numberPage + 1;
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
                        <Feather name={'chevron-left'} size={35} color={'#DDD'} />
                    </View>
                    :
                    <TouchableCmp onPress={() => { previousPage() }}>
                        <View style={styles.arrows}>
                            <Feather name={'chevron-left'} size={35} color={'#444'} />
                        </View>
                    </TouchableCmp>
            }
            <Text style={styles.centeredText}>Página {numberPage + 1}</Text>
            {/* <Text style={styles.centeredText}>Página {numberPage + 1} de {Math.ceil(total / 10)}</Text> */}

            {
                availableRight == false
                    ?
                    <View style={styles.arrows}>
                        <Feather name={'chevron-right'} size={35} color={'#DDD'} />
                    </View>
                    :
                    <TouchableCmp onPress={() => { nextPage() }}>
                        <View style={styles.arrows}>
                            <Feather name={'chevron-right'} size={35} color={'#444'} />
                        </View>
                    </TouchableCmp>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    containerButtonsPages: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        width: width * 0.75,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 10,
        height: 60,
        shadowColor: "#000",
        elevation: 5,
    },
    arrows: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredText: {
        fontSize: 20 / fontScale,
        color: "#444"
    }
});