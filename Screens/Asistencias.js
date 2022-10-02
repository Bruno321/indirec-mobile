import react from "react";
import { View, Text } from "react-native";
import { Extrapolation } from "react-native-reanimated";

import Header from "../components/Header";

const Asistencias = ({navigation}) => {
    return(
        <View>
            <Header navigation={navigation}/>
            <Text>Asistencias</Text>
        </View>
    )
}

export default Asistencias;