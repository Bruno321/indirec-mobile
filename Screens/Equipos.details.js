import { Dimensions, StyleSheet, View, SafeAreaView, Text, ScrollView, Image} from 'react-native';
import { Header, Col, Row } from '../components';

const { width, height, fontScale } = Dimensions.get('window');

const LargeText = ({ children, style = {}, numberOfLineas}) => {

    return (
      <Text style={{ fontSize: width * 0.038 / fontScale, ...style }} numberOfLines={numberOfLineas}>{children}</Text>
    );
  };

export const EquiposDetails = ({ navigation, route}) => {
    const { data } = route.params;
    console.log(data);
    return (
        <View style={styles.main}>
            <SafeAreaView style={{ backgroundColor: "#003070" }} />
            <Header navigation={navigation} title={"Datos del Equipo"} funcion={"goback"} />
            <ScrollView contentContainerStyle={styles.centeredView} bounces={false} overScrollMode="never">
                <View style={styles.equipoPresentation}>
                    <Text style={styles.equipoName}>{data.nombre}</Text>
                    <Image source={require('../images/ImagenEjemploEquipo.png')} style={styles.equipoImage}/>
                    <Text style={styles.equipoFacultad}>{data.facultad}</Text>
                    <Text style={styles.equipoCampus}>{data.campus}</Text>
                </View>
                <View style={styles.equipoInfo}>
                    <Row>
                        <LargeText style={styles.boldText}>Deporte</LargeText>
                        <LargeText style={styles.dato}>{data.deporte}</LargeText>
                    </Row>
                    <Row>
                        <LargeText style={styles.boldText}>Categoria</LargeText>
                        <LargeText style={styles.dato}>{data.categoria}</LargeText>
                    </Row>
                    <Row>
                        <LargeText style={styles.boldText}>Nombre del Entrenador</LargeText>
                        <LargeText style={styles.dato}>{data.nombreEntrenador + " " + data.apellidoEntrenador}</LargeText>
                    </Row>
                    <Row>
                        <LargeText style={styles.boldText}>Nombre del Asistente</LargeText>
                        <LargeText style={styles.dato}>{data.nombreAsistente + " " + data.apellidoAsistente}</LargeText>
                    </Row>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        width: width,
        height: height,
        backgroundColor: '#FFF',
    },
    centeredView: {
        backgroundColor: '#FFF',
    },
    equipoPresentation:{
        width: width,
        paddingVertical: 20,
        alignItems: 'center',
    },
    equipoName:{
        fontSize: 30/fontScale,
        fontWeight: '400',
    },
    equipoImage:{
        width: 180,
        height: 180,
        borderRadius: 18,
        overflow: 'hidden',
    },
    equipoFacultad:{
        fontSize: 26/fontScale,
        fontWeight: '400',
    },
    equipoCampus:{
        fontSize: 23/fontScale,
        fontWeight: '300',
    },
    boldText: {
        fontSize: 18 / fontScale,
        fontWeight: '600',
        textAlign: 'right',
        width: "40%",
        paddingHorizontal: "5%",
        marginTop: 10,
      },
      dato: {
        fontSize: 18 / fontScale,
        width: "55%",
        marginTop: 10,
      },
    
});
