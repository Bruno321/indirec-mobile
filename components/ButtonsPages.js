import React from "react";
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet } from "react-native";
import TouchableCmp from "../assetsUI/TouchableCmp";

export const ButtonsPages = ({ numberPage, setPagina, total }) => {

    const nextPage = () => {
        setPagina(numberPage + 1);
    }

    const previousPage = () => {
        setPagina(numberPage - 1);
    }

    return (
        <View style={styles.containerButtonsPages}>
            <TouchableCmp>
                <View style={/* Ternario para deshabilitar si estas ya en la 1*/ styles.buttonsPagesrotation} onClick={() => previousPage()}>
                    <Feather name={'chevron-left'} size={35} color={'white'} />
                </View>
            </TouchableCmp>
            <Text>Página {numberPage} de </Text>
            <TouchableCmp>
                <View style={styles.buttonsPagesrotation} onClick={() => nextPage()}>
                    <Feather name={'chevron-right'} size={35} color={'white'} />
                </View>
            </TouchableCmp>
        </View>
    )
}


const styles = StyleSheet.create({
    containerButtonsPages: {
        backgroundColor :'red',
    },

});