import { StyleSheet, Text, View, Image, Dimensions, Alert, Modal, Button, StatusBar } from 'react-native';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { useNavigation } from '@react-navigation/native';
import moment from "moment/moment";
moment.locale('es');
const { fontScale, width } = Dimensions.get('window');

export const AsistenciasCard = ({ props }) => {
    var dataProps = props;
    // const profilePicture = {uri: '../images/ImagenEjemploDeportista.png'};
    const navigation = useNavigation();
    return (
        <TouchableCmp onPress={() => navigation.navigate("DeportistaAssistance", dataProps.deportista.nombres + " " + dataProps.deportista.apellidos)}>
            <View style={styles.main}>
                <View style={styles.imageView}>
                    <Image source={require('../images/ImagenEjemploDeportista.png')} style={styles.profilePic} />
                </View>
                <View style={styles.even1}>
                    <View>
                        <Text style={styles.cajaText1} numberOfLines={1}>{props.deportista.nombres} {props.deportista.apellidos}</Text>
                    </View>
                    <View style={styles.caja1}>
                        <Text style={styles.cajaText2} numberOfLines={1}>Entrada:</Text>
                        <Text style={styles.cajaText3} numberOfLines={1}>{moment(props.horaEntrada).format("h:mm a")}</Text>
                    </View>
                    <View style={styles.caja2}>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={styles.cajaText2} numberOfLines={1}>Salida:</Text>
                            <Text style={styles.cajaText3} numberOfLines={1}>{moment(props.horaSalida).format("h:mm a")}</Text>
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={styles.cajaText2} numberOfLines={1}>Hrs/Dia:</Text>
                            <Text style={styles.cajaText3} numberOfLines={1}>☢</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableCmp>
    )
};


const styles = StyleSheet.create({
    main: {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(255,255,255,1)',
        height: 80,
        // paddingVertical: 10,
        // paddingHorizontal: Dimensions.get('window').width*0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    even1: {
        paddingLeft: 12,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    caja1: {
        width: width * .7,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
    },
    caja2: {
        width: width * .7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
    },
    cajaText1: {
        textAlign: 'left',
        fontSize: 18 / fontScale,
        color: 'black'
    },
    cajaText2: {
        fontSize: 15 / fontScale,
        textAlign: 'left',
        color: 'gray',
        fontWeight: '400'
    },
    cajaText3: {
        fontSize: 15 / fontScale,
        textAlign: 'left',
        color: '#003070',
        fontWeight: 'bold',

    },
    imageView: {
        backgroundColor: '#DDD',
        alignSelf: 'center',
        // height: "100%",
        // height: "100%",
        width: 80,
    },
    profilePic: {
        width: "100%",
        height: "100%",
        // resizeMode: 'cover',
        // overflow: 'hidden',
    },

});
