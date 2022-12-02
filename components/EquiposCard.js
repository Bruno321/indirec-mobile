import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { ActionButton } from './ActionButton';
import MarqueeText from 'react-native-marquee';

export const EquiposCard = ({props}) => {
    const { fontScale } = useWindowDimensions();
    const styles = makeStyles(fontScale);

    return (
        <View style={{paddingLeft:0}}>
            <View style={styles.card}>
                <View style={styles.primera}>
                    <View style={styles.detalles}>
                        <MarqueeText
                            style={{ fontSize: 25 / fontScale, fontWeight:'700' }}
                            speed={0.1}
                            marqueeOnStart={true}
                            loop={true}
                            delay={2000}
                        >
                            {props.nombre}
                        </MarqueeText>
                        <Text style={styles.dep} numberOfLines={1}>{props.deporte}</Text>
                    </View>
                    <View style={styles.detalles}>
                        <Text style={styles.fac} numberOfLines={2}>{props.facultad}</Text>
                        <Text style={styles.camp} numberOfLines={1}>{props.campus}</Text>
                    </View>
                </View>
                <View style={styles.segunda}>
                    <View style={styles.textoSegunda}>
                        <Text style={styles.sex} numberOfLines={1}>{props.sexo ? "Femenil" : "Varoníl"}</Text>
                    </View>
                    <View style={styles.viewTouch}>
                        <ActionButton
                            icon="info"
                            color="#FFF"
                            backgroundColor="#003070"
                            text="Información"
                            widthPercentage={0.3}
                            heightPercentage={0.035}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const makeStyles = fontScale => StyleSheet.create({ 
    card:{
        backgroundColor:'#FFF',
        height:150,
        width:'100%',
        borderBottomWidth:1,
        borderColor:'#DDDDDD',
        paddingBottom:20,
        paddingTop:15,
        paddingHorizontal:30,
        flexDirection:'row',
        justifyContent:'space-between',
        overflow:'hidden'
    },
    btnInfo:{
        flexDirection:'row',
        backgroundColor: '#003070',
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:10,
        borderRadius:10,
    },
    segunda:{
        alignItems:'flex-end',
        justifyContent:'space-between',
    },
    nom:{
        fontSize:25 / fontScale,
        fontWeight:'700'
    },
    dep:{
        fontSize:20 / fontScale,
        fontWeight:'600'
    },
    sex:{
        fontSize:16 / fontScale,
        fontWeight:'900'
    },
    info:{
        color:'white'
    },
    primera:{
        justifyContent:'space-between'
    },
    textoSegunda:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
        height:30
    },
    viewTouch:{
        overflow:'hidden'
    },
    detalles:{
        overflow:'hidden',
    }
})