import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { useNavigation } from '@react-navigation/native';
import moment from "moment/moment";
moment.locale('es');
const { fontScale, width } = Dimensions.get('window');

export const AsistenciaIndCard = ({ props, estilo }) => {

    const entrada = new Date(props.horaEntrada);
    const salida = new Date(props.horaSalida);
    const tiempoTranscurrido = salida.getTime() - entrada.getTime();
    const tiempoTranscurridoEnMinutos = Math.floor(tiempoTranscurrido / (1000 * 60))

    function convertirMinutosAHoras(minutos) {
        if (minutos < 60) {
          return `${minutos} min`;
        } else {
          const horas = Math.floor(minutos / 60);
          const minutosRestantes = minutos % 60;
          return `${horas} h ${minutosRestantes} min`;
        }
    }

    return (
        <View style={estilo?styles.tabla2:styles.tabla}>
            <View style={styles.dia}>
                <Text style={styles.tablaTxt} numberOfLines={1}>{props.fecha}</Text>
            </View>
            <View style={styles.entrada}>
                <Text style={styles.tablaTxt} numberOfLines={1}>{moment(props.horaEntrada).format("h:mm a")}</Text>
            </View>
            <View style={styles.salida}>
                <Text style={styles.tablaTxt} numberOfLines={1}>{moment(props.horaSalida).format("h:mm a")}</Text>
            </View>
            <View style={styles.total}>
                <Text style={styles.tablaTxt} numberOfLines={1}>{convertirMinutosAHoras(tiempoTranscurridoEnMinutos)}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    tabla:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
    },
    tabla2:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        backgroundColor: '#83838359',
    },
    tablaTxt:{
        color:'black',
        fontSize: 17 / fontScale,
        fontWeight:'300'
    },
    dia:{
        width:'29%',
        alignItems:'center',
    },
    entrada:{
        width:'22%',
        alignItems:'center',
    },
    salida:{
        width:'22%',
        alignItems:'center',
    },
    total:{
        width:'27%',
        alignItems:'center',
    },
});
