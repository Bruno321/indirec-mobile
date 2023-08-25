import { Dimensions, StyleSheet, View, SafeAreaView, Text, ScrollView, Image, Alert } from 'react-native';
import { Header, Col, List, Row, ActionButton } from '../components';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { URL, process, SAVE } from '../Service/Api';
import { DeportistasCard } from '../components';
import { Deportistas } from './Deportistas';

const GRANTED = "granted";

const { width, height, fontScale } = Dimensions.get('window');

const LargeText = ({ children, style = {}, numberOfLineas }) => {

    return (
        <Text style={{ fontSize: width * 0.038 / fontScale, ...style }} numberOfLines={numberOfLineas}>{children}</Text>
    );
};

export const EquiposDetails = ({ navigation, route }) => {
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const { data } = route.params;
    // console.log("dataid " + data.id)
    console.log("LA DATA > " + data);

    const handleDownload = async () => {
        console.log("id: " + data.id)
        const response = await process(SAVE, 'equipo-pdf', {
            id: data.id,
        }).catch(e => {
            console.log("catch " + e)
        })
        console.log("response " + JSON.stringify(response.data.pdf))
        if (response.status === 201) {
            var link = `${URL}/pdf/${response.data.pdf}`;
            const { status } = await requestPermission();
            if (status === GRANTED) {
                saveFileToGallery(link, status);
            } else {
                console.log(permissionResponse)
                let permissionStatus;
                permissionStatus = await requestPermission();
            }
        } else {
            console.log(response);
        }
    };

    const saveFileToGallery = async (fileUrl, status) => {
        console.log("url " + fileUrl)
        try {
            if (status !== GRANTED && permissionResponse.status !== GRANTED) {
                console.log('Permiso denegado para acceder a la galería.');
                return;
            }

            const fileExtension = fileUrl.split('.').pop().toLowerCase();
            console.log("file extension " + fileExtension)
            const fileUri = FileSystem.cacheDirectory + `file.${fileExtension}`;
            console.log("file uri " + fileUri)
            await FileSystem.downloadAsync(fileUrl, fileUri);

            if (fileExtension === 'pdf') {
                await Sharing.shareAsync(fileUri);
                console.log('PDF guardado en la galería.');
                Alert.alert('Descarga completa', 'Documento guardado en la galería', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } else {
                await MediaLibrary.saveToLibraryAsync(fileUri);
                console.log('Imagen guardada en la galería.');
                Alert.alert('Descarga completa', 'Documento guardado en la galería', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        } catch (error) {
            console.log('Error al guardar el archivo:', error);
            Alert.alert('Error en descarga', 'Intentelo más tarde', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    }


    return (
        <View style={styles.main}>
            <SafeAreaView style={{ backgroundColor: "#003070" }} />
            <Header navigation={navigation} title={"Datos del Equipo"} funcion={"goback"} />
                <View style={styles.equipoPresentation}>
                    <Text style={styles.equipoName}>{data.nombre}</Text>
                    {/* <Image source={require('../images/ImagenEjemploEquipo.png')} style={styles.equipoImage} /> */}
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
                <List dataSource={data.deportistas} renderItem={row => <DeportistasCard props={row}/>}/>
                {/* {data.deportistas.map(deportista => { console.log("INFO DEL DEPORTISTA -> " + JSON.stringify(deportista))})} */}
                {/* {data.deportistas.map(deportista => { <DeportistasCard props={deportista}/>})} */}
                {/* <Text> {JSON.stringify(data.deportistas)} </Text> */}
                <ActionButton
                    text="Descargar PDF"
                    handler={() => handleDownload()}
                    backgroundColor="#FFF"
                    color="#003070"
                    icon="file-pdf-o"
                    style={{ width: "80%", marginTop: '10%', alignSelf: 'center', height: 60, marginBottom: 5, borderWidth: 2, borderColor: "#003070", borderRadius: 18 }}
                />

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
    equipoPresentation: {
        width: width,
        paddingVertical: 20,
        alignItems: 'center',
    },
    equipoName: {
        fontSize: 30 / fontScale,
        fontWeight: '400',
    },
    equipoImage: {
        width: 180,
        height: 180,
        borderRadius: 18,
        overflow: 'hidden',
    },
    equipoFacultad: {
        fontSize: 26 / fontScale,
        fontWeight: '400',
    },
    equipoCampus: {
        fontSize: 23 / fontScale,
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
