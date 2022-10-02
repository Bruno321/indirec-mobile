import react from "react";
import { View, Text } from "react-native";
import { Extrapolation } from "react-native-reanimated";
import Header from "../components/Header";

const Deportistas = ({navigation}) => {
    return(
        <View>
            <Header navigation={navigation}/>
            <Text>Deportistas</Text>
        </View>
    )
}

export default Deportistas;