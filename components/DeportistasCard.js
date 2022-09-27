import { StyleSheet, Text, View, Image, Dimensions, Alert, Modal, Button,StatusBar } from 'react-native';
import TouchableCmp from '../assetsUI/TouchableCmp';

const  DeportistasCard = ({props}) => {
	return(
		<View style={styles.main}>
            <View style={styles.even1}>
                <View style={styles.caja1}>
                    <Text style={styles.caja1Text1}>Nombre</Text>
                    <Text style={styles.caja1Text2} numberOfLines={2}>{props.nombre} {props.apellido}</Text>
                </View>
                <View style={styles.caja2}>
                    <Text style={styles.caja2Text1}>Expediente</Text>
                    <Text style={styles.caja2Text2}>{props.expediente}</Text>
                </View>
                <View style={styles.caja3}>
                    <Text style={styles.caja3Text1}>Sexo</Text>
                    <Text style={styles.caja3Text2}>{props.sexo}</Text>
                </View>
            </View>
            <View style={styles.even2}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.caja4Text1}>Facultad:</Text>
                    <Text style={styles.caja4Text2}>{props.facultad}</Text>
                </View>
                <View style={styles.buttonOut}>
                    <TouchableCmp>
                        <View style={styles.buttonIn}>
                            <Text style={styles.buttonText}>&#9432; Información</Text>
                        </View>
                    </TouchableCmp>
                </View>
            </View>
        </View>

        
)}

{/* <View style={{justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height}}>
    <DeportistasCard props={{nombre: "Jorge", apellido: "Bernal", expediente: "259563", sexo: "Hombre", facultad: "Informática"}}/>
    </View> */}
export default DeportistasCard;

const styles = StyleSheet.create({
    main: {
        width: Dimensions.get('window').width,
        height: 145,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: Dimensions.get('window').width*0.02,
        // borderWidth: 2,
        // borderColor: '#000',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: 5
    },
    even1:{
      flex: 0,
    //   bottom: 0,
      flexDirection: 'row',
    //   backgroundColor: 'pink',
      justifyContent: 'space-between',
    //   alignItems: 'center',
    },
    even2:{
        flex: 0,
      //   bottom: 0,
        flexDirection: 'row',
        // backgroundColor: 'pink',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    caja1:{
        width: Dimensions.get('window').width*0.46,
        height: 80,
        // backgroundColor:'red',
    },
    caja1Text1:{
        textAlign: 'left',
        color: 'gray'
    },
    caja1Text2:{
        textAlign: 'left',
        color: 'black'
    },
    caja2:{
        width: Dimensions.get('window').width*0.25,
        // backgroundColor:'green',
    },
    caja2Text1:{
        textAlign: 'center',
        color: 'gray'
    },
    caja2Text2:{
        textAlign: 'center',
        color: 'black'
    },
    caja3:{
        width: Dimensions.get('window').width*0.25,
        // backgroundColor:'blue',
        // textAlign: 'right',
    },
    caja3Text1:{
        textAlign: 'right',
        color: 'gray'
    },
    caja3Text2:{
        textAlign: 'right',
        color: 'black'
    },
    caja4Text1:{
        textAlign: 'left',
        color: 'black'
    },
    caja4Text2:{
        textAlign: 'right',
        color: 'gray'
    },
    buttonOut: {
        backgroundColor: '#005090',
        height: 40,
        width: Dimensions.get('window').width*0.4,
        borderRadius: 18,
        overflow: 'hidden',
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonIn: {
        width: Dimensions.get('window').width*0.4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    }
});
	