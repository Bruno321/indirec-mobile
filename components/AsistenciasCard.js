import { StyleSheet, Text, View, Image, Dimensions, Alert, Modal, Button,StatusBar } from 'react-native';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { useNavigation } from '@react-navigation/native';
import moment from "moment/moment";
moment.locale('es');
const { fontScale } = Dimensions.get('window');       

export const AsistenciasCard = ({props}) => {
    // console.log(JSON.stringify(props));
    const navigation = useNavigation();
	return(
        <TouchableCmp onPress={()=> navigation.navigate('Deportista.details', { data: dataProps}, console.log(dataProps.props.foto))}>
            {/* {()=>{console.log(profilePicture)}} */}
            <View style={styles.main}>
                {/* <View style={styles.imageView}>
                    <Image source={profilePicture} style={styles.profilePic}/>
                </View> */}
                <View style={styles.even1}>
                    <View style={styles.caja}>
                        <Text style={styles.cajaText3} numberOfLines={1}>{props.deportistum.nombres} {props.deportistum.apellidos}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.cajaText2} numberOfLines={1}>{moment(props.horaEntrada).format("h:mm a")}</Text>
                    </View>
                    <View style={styles.caja2}>
                        <View style={styles.caja2x1}>
                            <Text style={styles.cajaText2} numberOfLines={1}>{moment(props.horaSalida).format("h:mm a")}</Text>
                        </View>
                        {/* <View style={styles.caja2x2}> */}
                            {/* <Text style={styles.cajaText2} numberOfLines={1}>{props.sexo == 0 ? "Hombre" : "Mujer"}</Text> */}
                        {/* </View> */}
                    </View>
                </View>
            </View>
        </TouchableCmp>
		// <View style={styles.main}>
        //     <View style={styles.even1}>
        //         <View style={styles.caja1}>
        //             <Text style={styles.caja1Text1}>Nombre</Text>
        //             <Text style={styles.caja1Text2} numberOfLines={2}>{props.deportistum.nombres} {props.deportistum.apellidos}</Text>
        //         </View>
        //         <View style={styles.caja2}>
        //             <Text style={styles.caja2Text1}>Entrada</Text>
        //             <Text style={styles.caja2Text2}>{moment(props.horaEntrada).format("h:mm a")}</Text>
        //         </View>
        //         <View style={styles.caja3}>
        //             <Text style={styles.caja3Text1}>Salida</Text>
        //             <Text style={styles.caja3Text2}>{moment(props.horaSalida).format("h:mm a")}</Text>
        //         </View>
        //     </View>
        //     <View style={styles.even2}>
        //         <View style={{flexDirection:'row'}}>
        //             <Text style={styles.caja4Text1}>Fecha:</Text>
        //             <Text style={styles.caja4Text2}>{moment(props.fecha).format("dddd, MMMM D, YYYY")}</Text>
        //         </View>
        //         <View style={styles.buttonOut}>
        //             <TouchableCmp>
        //                 <View style={styles.buttonIn}>
        //                     <Text style={styles.buttonText}>&#9432; Información</Text>
        //                 </View>
        //             </TouchableCmp>
        //         </View>
        //     </View>
        // </View>

        
)};

{/* <View style={{justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height}}>
    <DeportistasCard props={{nombre: "Jorge", apellido: "Bernal", expediente: "259563", sexo: "Hombre", facultad: "Informática"}}/>
    </View> */}

// const styles = StyleSheet.create({
//     main: {
//         width: Dimensions.get('window').width,
//         height: 145,
//         backgroundColor: 'white',
//         paddingVertical: 10,
//         paddingHorizontal: Dimensions.get('window').width*0.02,
//         // borderWidth: 2,
//         // borderColor: '#000',

//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,

//         elevation: 5,
//         marginBottom: 5
//     },
//     even1:{
//         flex: 0,
//     //   bottom: 0,
//         flexDirection: 'row',
//     //   backgroundColor: 'pink',
//         justifyContent: 'space-between',
//     //   alignItems: 'center',
//     },
//     even2:{
//         flex: 0,
//       //   bottom: 0,
//         flexDirection: 'row',
//         // backgroundColor: 'pink',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     caja1:{
//         width: Dimensions.get('window').width*0.46,
//         height: 80,
//         // backgroundColor:'red',
//     },
//     caja1Text1:{
//         textAlign: 'left',
//         color: 'gray'
//     },
//     caja1Text2:{
//         textAlign: 'left',
//         color: 'black'
//     },
//     caja2:{
//         width: Dimensions.get('window').width*0.25,
//         // backgroundColor:'green',
//     },
//     caja2Text1:{
//         textAlign: 'center',
//         color: 'gray'
//     },
//     caja2Text2:{
//         textAlign: 'center',
//         color: 'black'
//     },
//     caja3:{
//         width: Dimensions.get('window').width*0.25,
//         // backgroundColor:'blue',
//         // textAlign: 'right',
//     },
//     caja3Text1:{
//         textAlign: 'right',
//         color: 'gray'
//     },
//     caja3Text2:{
//         textAlign: 'right',
//         color: 'black'
//     },
//     caja4Text1:{
//         textAlign: 'left',
//         color: 'black'
//     },
//     caja4Text2:{
//         textAlign: 'right',
//         color: 'gray'
//     },
//     buttonOut: {
//         backgroundColor: '#005090',
//         height: 40,
//         width: Dimensions.get('window').width*0.4,
//         borderRadius: 18,
//         overflow: 'hidden',
//         justifyContent: 'center',

//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,

//         elevation: 5,
//     },
//     buttonIn: {
//         width: Dimensions.get('window').width*0.4,
//         height: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: 'white',
//     }
// });
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
        height: "100%",
        // resizeMode: 'cover',
        overflow: 'hidden',
    },
    
});
