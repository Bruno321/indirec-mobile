import { StyleSheet, Text, View, Image, Dimensions, Alert, Modal, Button,StatusBar } from 'react-native';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { useNavigation } from '@react-navigation/native';


export const DeportistasCard = ({props}) => {
    var dataProps = {props};
    const navigation = useNavigation();
    
	return(
        <TouchableCmp onPress={()=> navigation.navigate('Deportista.details', { data: dataProps} )}>
            <View style={styles.main}>
                <View style={styles.even1}>
                    <View style={styles.caja}>
                        {/* <Text style={styles.cajaText1}>Nombre</Text> */}
                        <Text style={styles.cajaText2} numberOfLines={1}>{props.nombres} {props.apellidos}</Text>
                    </View>
                    <View style={styles.caja}>
                        {/* <Text style={styles.cajaText1}>Expediente</Text> */}
                        <Text style={styles.cajaText2}>{props.expediente}</Text>
                    </View>
                    <View style={styles.caja}>
                        {/* <Text style={styles.cajaText1}>Sexo</Text> */}
                        <Text style={styles.cajaText2}>{props.sexo == 0 ? "Hombre" : "Mujer"}</Text>
                    </View>
                    <View style={styles.caja}>
                        {/* <Text style={styles.cajaText1}>Facultad:</Text> */}
                        <Text style={styles.cajaText2}>{props.facultad}</Text>
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
        paddingVertical: 10,
        paddingHorizontal: Dimensions.get('window').width*0.02,
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
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    caja:{
        width: "100%",
    },
    cajaText1:{
        textAlign: 'left',
        color: 'gray'
    },
    cajaText2:{
        textAlign: 'left',
        color: 'black'
    },
});
