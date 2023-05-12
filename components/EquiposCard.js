import { Dimensions, View, Text, StyleSheet } from "react-native";
import TouchableCmp from "../assetsUI/TouchableCmp";
import MarqueeText from 'react-native-marquee';
import { useNavigation } from '@react-navigation/native';
const { fontScale, width } = Dimensions.get('window');

export const EquiposCard = ({ props }) => {
    const navigation = useNavigation();

    return (
        <TouchableCmp onPress={()=> navigation.navigate('Equipos.details', { data: props })}>
            <View style={styles.card}>
                <View style={styles.primera}>
                    <MarqueeText
                        style={{ fontSize: 25 / fontScale }}
                        speed={0.1}
                        marqueeOnStart={true}
                        loop={true}
                        delay={2000}
                    >
                        {props.nombre}
                    </MarqueeText>
                    <Text style={styles.textBlack} numberOfLines={1}>{props.deporte}</Text>
                    <Text style={styles.textGray} numberOfLines={2}>{props.facultad}</Text>
                    <Text style={styles.textGray} numberOfLines={1}>{props.campus}</Text>
                </View>
                <Text style={styles.sex} numberOfLines={1}>{props.sexo ? "Femenil" : "Varoníl"}</Text>
            </View>
        </TouchableCmp>
    );
};

const styles = StyleSheet.create({
    card: {
        // height: 120,
        width: width,
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: width*0.05,
    },
    primera: {
        // backgroundColor: 'red',
        width: width * 0.6
    },
    textBlack:{
        fontSize: 16 / fontScale,
    },
    textGray:{
        color: "#999",
        // fontWeight: '300',
        fontSize: 16 / fontScale,
    }
})