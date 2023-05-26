import React, { useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet } from "react-native";
import TouchableCmp from "../assetsUI/TouchableCmp";

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
        setAvailableRight(newPage < Math.ceil(total / 10)-1);
      };

    return (
        <View style={styles.containerButtonsPages}>
            {
                availableLeft == false
                    ?
                    <View style={styles.arrowLeftUnavailable}>
                        <Feather name={'chevron-left'} size={35} color={'white'} />
                    </View>
                    :
                    <TouchableCmp onPress={() => { previousPage() }}>
                        <View style={styles.arrowLeftAvailable}>
                            <Feather name={'chevron-left'} size={35} color={'white'} />
                        </View>
                    </TouchableCmp>
            }
            <Text>Página {numberPage + 1} de {Math.ceil(total / 10)}</Text>

            {
                availableRight == false
                    ?
                    <View style={styles.arrowRightUnavailable}>
                        <Feather name={'chevron-right'} size={35} color={'white'} />
                    </View>
                    :
                    <TouchableCmp onPress={() => { nextPage() }}>
                        <View style={styles.arrowRightAvailable}>
                            <Feather name={'chevron-right'} size={35} color={'white'} />
                        </View>
                    </TouchableCmp>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    containerButtonsPages: {
        backgroundColor: 'yellow',
    },
    arrowLeftAvailable: {
        backgroundColor: 'green',
    },
    arrowLeftUnavailable: {
        backgroundColor: 'red',
    },
    arrowRightAvailable: {
        backgroundColor: 'green',
    },
    arrowRightUnavailable: {
        backgroundColor: 'red',
    },
});