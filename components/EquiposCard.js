import { View, Text, StyleSheet} from "react-native";
import { Feather } from 'react-native-vector-icons';
import TouchableCmp from "../assetsUI/TouchableCmp";
import MarqueeText from 'react-native-marquee';


export const EquiposCard = (props) => {
    return (
        <View style={{paddingLeft:0}}>
            <View style={styles.card}>
                <View style={styles.primera}>
                    <View style={styles.detalles}>
                        <MarqueeText
                            style={{ fontSize: 25, fontWeight:'700' }}
                            speed={0.1}
                            marqueeOnStart={true}
                            loop={true}
                            delay={2000}
                            >
                                {props.Info.nombre}
                        </MarqueeText>
                        <Text style={styles.dep} numberOfLines={1}>{props.Info.deporte}</Text>
                    </View>
                    <View style={styles.detalles}>
                        <Text style={styles.fac} numberOfLines={2}>{props.Info.fac}</Text>
                        <Text style={styles.camp} numberOfLines={1}>{props.Info.camp}</Text>
                    </View>
                </View>
                <View style={styles.segunda}>
                    <View style={styles.textoSegunda}>
                        <Text style={styles.sex} numberOfLines={1}>{props.Info.sex}</Text>
                    </View>
                    <View style={styles.viewTouch}>
                        <TouchableCmp>
                            <View style={styles.btnInfo}>
                                <Feather name={"info"} color={'white'} size={20}/>
                                <Text style={styles.info}>Información</Text>
                            </View>
                        </TouchableCmp>
                    </View>
                </View>
            </View>
        </View>
      )
}

const styles = StyleSheet.create({ 
    card:{
        height:150,
        width:'100%',
        //backgroundColor:'red',
        borderBottomWidth:1,
        borderColor:'#DDDDDD',
        paddingBottom:20,
        paddingTop:15,
        paddingHorizontal:30,
        flexDirection:'row',
        justifyContent:'space-between',
        overflow:'hidden'
    },btnInfo:{
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
        //fontFamily:'Fredoka-Bold',
        fontSize:25,
        fontWeight:'700'
    },
    dep:{
        //fontFamily:'Fredoka-Bold',
        fontSize:20,
        fontWeight:'600'
    },
    sex:{
        fontSize:16,
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
        width:140,
        borderRadius:10,
        overflow:'hidden'
    },
    detalles:{
        width:180,
        overflow:'hidden',
    }
})