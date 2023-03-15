import { StyleSheet, Text, View, Image, Dimensions, Alert, Modal, Button,StatusBar } from 'react-native';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import { BASEPATH } from '../Service/Api';

const { fontScale } = Dimensions.get('window');       
export const DeportistasCard = ({props}) => {
    
    var dataProps = {props};
    // console.log(dataProps)
    const navigation = useNavigation();
    const profilePicture = dataProps.props.foto ? { uri: `${REACT_APP_API_URL}${BASEPATH}/${dataProps.props.foto}` } : {uri: '../images/ImagenEjemploDeportista.png'};
    
	return(
        <TouchableCmp onPress={()=> navigation.navigate('Deportista.details', { data: dataProps}, console.log(dataProps.props.foto))}>
            {/* {()=>{console.log(profilePicture)}} */}
            <View style={styles.main}>
                <View style={styles.imageView}>
                    <Image source={profilePicture} style={styles.profilePic}/>
                </View>
                <View style={styles.even1}>
                    <View style={styles.caja}>
                        <Text style={styles.cajaText3} numberOfLines={1}>{props.nombres} {props.apellidos}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.cajaText2} numberOfLines={1}>{props.facultad}</Text>
                    </View>
                    <View style={styles.caja2}>
                        <View style={styles.caja2x1}>
                            <Text style={styles.cajaText2} numberOfLines={1}>{props.expediente}</Text>
                        </View>
                        {/* <View style={styles.caja2x2}> */}
                            {/* <Text style={styles.cajaText2} numberOfLines={1}>{props.sexo == 0 ? "Hombre" : "Mujer"}</Text> */}
                        {/* </View> */}
                    </View>
                </View>
            </View>
        </TouchableCmp>

        
)};

{/* <View style={{justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height}}>
    <DeportistasCard props={{nombre: "Jorge", apellido: "Bernal", expediente: "259563", sexo: "Hombre", facultad: "Informática"}}/>
    </View> */}

const styles = StyleSheet.create({
    main: {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(255,255,255,1)',
        height: 80,
        // backgroundColor: 'red',
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
    even1:{
        paddingLeft: 12,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    caja:{
        width: "100%",
    },
    caja2:{
        width: 200,
        flexDirection: 'row',
    },
    caja2x1:{
        width: 100,
    },
    caja2x2:{
        width: 100,
    },
    cajaText1:{
        textAlign: 'left',
        color: 'gray'
    },
    cajaText2:{
        fontSize: 17/fontScale,
        textAlign: 'left',
        color: 'black',
        fontWeight: '400',

    },
    cajaText3:{
        fontSize: 17/fontScale,
        textAlign: 'left',
        color: 'black',
        fontWeight: '600',

    },
    imageView: {
        backgroundColor: '#EEE',
        alignSelf: 'center',
        // height: "100%",
        // height: "100%",
        width: 80,
    },
    profilePic: {
        width: "100%",
        // height: 80,
        height: "100%",
        // resizeMode: 'cover',
        // justifyContent: 'center',
        // borderRadius: 50,
        // backgroundColor: 'purple',
        overflow: 'hidden',
    },
    
});
