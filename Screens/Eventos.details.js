import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  Alert
} from "react-native";
import { ActionButton } from "../components/ActionButton";
import MarqueeText from "react-native-marquee";
import React, { useState } from "react";
import { Col, Header, List } from "../components";
import TouchableCmp from "../assetsUI/TouchableCmp";
import { useFetchData } from "../Hooks/Fetch.hook";
import moment from 'moment';
import { UPDATE, process } from '../Service/Api';

const { fontScale } = Dimensions.get("window");

const oInitialState = {
  incidentes: '',
  puntosLocal: '',
  puntosVisitante: ''
}

export const EventosDetails = (props, {navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [equipoSelec, setEquipoSelec] = useState();
  let datos = props.route.params.datos; //id, nombre, fecha, hora, equipoloca, etc
  const [form, setForm] = useState(oInitialState)
	const [modal, setModal] = useState(false);

  const mostrarJugadores = () => {
    if (equipoSelec == "local")
      return datos.eventos_details.filter(
        (obj) => obj.deportista.equipo.nombre == datos.EquipoLocal.nombre
      );
    else
      return datos.eventos_details.filter(
        (obj) => obj.deportista.equipo.nombre == datos.EquipoVisitante.nombre
      );
  };

  const handleSubmit = async (e) => {
    const { puntosLocal, puntosVisitante, incidentes } = form;
    const response = await process(UPDATE, 'eventos', {
      puntosLocal: puntosLocal || 0,
      puntosVisitante: puntosVisitante || 0,
      incidentes: incidentes || '',
    }, { id: datos.id }).catch(e => {
      Alert.alert(
        'Oops...',
        'Algo salio mal, intenta mas tarde',
        [
          { text: 'Okay' },
        ]
      )
      console.log(e);
    });

    if (response.status === 200) {
      Alert.alert(
        'Listo',
        'Se registraron los resultados',
        [
          { 
            text: 'Okay',
            onPress: () => {
              setModal(false)
              navigation.navigate("Eventos")
            }
          },
        ]
      )
    }
  }

  const Item = ({ title, apellido, num }) => (
    <View style={styles.item}>
      <View style={styles.item2}>
        <Text style={styles.itemTxt}>
          {title} {apellido}
        </Text>
        {num && <Text style={styles.itemTxt}>#{num}</Text>}
      </View>
    </View>
  );
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header
        navigation={props.navigation}
        title={"Datos del Evento"}
        funcion={"goback"}
      />
      <ScrollView
        style={styles.modal}
        contentContainerStyle={{ paddingBottom: "30%" }}
      >
        {/* Contenedor de equipo vs equipo */}
        <View style={styles.containerCard}>
          <View style={styles.containerTeam}>
            <Text
              style={{
                fontSize: 18 / fontScale,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              {datos.EquipoLocal.nombre}
            </Text>
            <Text>LOCAL</Text>
          </View>

          <View style={styles.containerVersus}>
            <Text style={styles.versus}>VS</Text>
          </View>

          <View style={styles.containerTeam}>
            <Text
              style={{
                fontSize: 18 / fontScale,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              {datos.EquipoVisitante.nombre}
            </Text>
            <Text>VISITANTE</Text>
          </View>
        </View>

        {/* Contenedor de Información del evento */}
        <View style={styles.containerInfoEvento}>
          <View style={styles.fechaEvento}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.txtTitulo}>Fecha</Text>
                <Text style={styles.txtSubtitulo}>{moment(datos.fecha).format('DD-MM-YYYY')}</Text>
              </View>
              <View>
                <Text style={styles.txtTitulo}>Hora</Text>
                <Text style={styles.txtSubtitulo}>{datos.hora}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.txtTitulo}>Cancha</Text>
              <Text style={styles.txtSubtitulo}>{datos.canchaJugada}</Text>
            </View>
          </View>

          <Text style={styles.txtTitulo}>Director técnico local</Text>
          <Text style={styles.txtSubtitulo}>{datos.directorTecnicoLocal}</Text>

          <Text style={styles.txtTitulo}>Director técnico visitante</Text>
          <Text style={styles.txtSubtitulo}>
            {datos.directorTecnicoVisitante}
          </Text>

          <View style={styles.containerPuntosEquipos}>
            <View style={styles.containerPuntos}>
              <Text style={[styles.txtTitulo, { textAlign: "center" }]}>
                Equipo {datos.EquipoLocal.nombre}
              </Text>
              <View style={styles.inputPuntos}>
                {datos.puntosLocal ?
                  <Text style={{ fontSize: 20 / fontScale }}>
                    {datos.puntosLocal}
                  </Text>
                  :
                  <TextInput
                    placeholder={"Ingrese\npuntos"}
                    placeholderTextColor="#c5c5c5"
                    style={{ fontSize: 20 / fontScale, textAlign: "center" }}
                    keyboardType='number-pad'
                    onChangeText={e=>setForm({...form, puntosLocal:e})}
                  // value={values.expediente}
                  />
                }
              </View>
            </View>

            <View style={styles.containerPuntos}>
              <Text style={[styles.txtTitulo, { textAlign: "center" }]}>
                Equipo {datos.EquipoVisitante.nombre}
              </Text>
              <View style={styles.inputPuntos}>
                {datos.puntosVisitante ?
                  <Text style={{ fontSize: 20 / fontScale }}>
                    {datos.puntosVisitante}
                  </Text>
                  :
                  <TextInput
                    placeholder={"Ingrese\npuntos"}
                    placeholderTextColor="#c5c5c5"
                    style={{ fontSize: 20 / fontScale, textAlign: "center" }}
                    keyboardType='number-pad'
                    onChangeText={e=>setForm({...form, puntosVisitante:e})}
                  // value={values.expediente}
                  />
                }
              </View>
            </View>
          </View>

          <Text style={styles.txtTitulo}>Observaciones</Text>
          {/* <Text style={styles.txtSubtitulo}>{datos.incidentes}</Text> */}
          <View style={{ borderColor: "#c5c5c5", borderWidth: 1 }}>
            <TextInput
              editable={datos.puntosLocal ? false : true}
              defaultValue={datos.incidentes && datos.incidentes}
              multiline
              numberOfLines={10}
              maxLength={40}
              placeholder={datos.puntosLocal ? "No hubo observaciones" : "Ingrese aqui"}
              placeholderTextColor="#c5c5c5"
              onChangeText={e=>setForm({...form, incidentes:e})}
              // value={value}
              style={{ padding: 10, textAlignVertical: "top", fontSize: 15 / fontScale, color: 'black' }}
            />
          </View>
        </View>
        {!datos.puntosLocal &&
          <View style={styles.boton}>
            {/* <TouchableCmp onPress={()=>onSubmit(values)}> */}
            <TouchableCmp style={{ borderRadius: 15, overflow: "hidden" }} onPress={()=>{setModal(true)}}>
              <View style={styles.btn}>
                <Text style={styles.txtBtn}>Finalizar Evento</Text>
              </View>
            </TouchableCmp>
          </View>
        }
      </ScrollView>
      <Modal
        animationType={'slide'}
        visible={modal}
        transparent
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.txtTitulo2}>¿Registrar los resultados?</Text>
            <Text style={styles.txtSubtitulo}>Puntos local: {form.puntosLocal}</Text>
            <Text style={styles.txtSubtitulo}>Puntos visitante: {form.puntosVisitante}</Text>
            <Text style={styles.txtSubtitulo}>Incidentes: {form.incidentes}</Text>
            <View style={{display:'flex', flexDirection:'row', marginTop:'auto', justifyContent:'space-around'}}>
              <TouchableCmp onPress={()=>setModal(false)}>
                <View style={{borderColor:'#003070', borderWidth:1, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, overflow:'hidden'}}>
                  <Text style={styles.txtSubtitulo3}>Cancelar</Text>
                </View>
              </TouchableCmp>
              <TouchableCmp onPress={()=>handleSubmit()}>
                <View style={{backgroundColor:'#003070', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, overflow:'hidden'}}>
                  <Text style={styles.txtSubtitulo2}>Confirmar</Text>
                </View>
              </TouchableCmp>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    // borderRadius: 15,
  },
  containerCard: {
    backgroundColor: "#FFF",
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  containerTeam: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerVersus: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  versus: {
    color: "white",
    backgroundColor: "#003070",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16 / fontScale,
    borderRadius: 12,
    overflow: "hidden",
  },
  containerInfoEvento: {
    width: "100%",
    paddingTop: 16,
    paddingLeft: 22,
    paddingRight: 22,
  },
  fechaEvento: {
    width: "100%",
    marginBottom: 20,
  },
  txtTitulo: {
    fontSize: 18 / fontScale,
    fontWeight: "bold",
    marginTop: 12,
  },
  txtTitulo2: {
    fontSize: 18 / fontScale,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: 'center'
  },
  txtSubtitulo: {
    fontSize: 16 / fontScale,
  },
  txtSubtitulo2: {
    fontSize: 16 / fontScale,
    color: "white",
  },
  txtSubtitulo3: {
    fontSize: 16 / fontScale,
    color: "#003070",
  },
  containerPuntosEquipos: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 32,

    // borderWidth: 1,
    // borderColor: "green",
  },
  containerPuntos: {
    // borderWidth: 1,
    // borderColor: "pink",

    width: "48%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputPuntos: {
    width: "80%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 24,
    marginTop: 12,
  },
  boton: {
    marginTop: 40,
    alignItems: "flex-end",
    overflow: "hidden",
    marginRight: 22,
    borderRadius: 15,
  },
  btn: {
    paddingVertical: 10,
    width: Dimensions.get("window").width * 0.4,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: "#003070",
  },
  txtBtn: {
    fontFamily: "Fredoka-Regular",
    fontSize: 17 / fontScale,
    color: "white",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%', // Ancho del 80%
    height: '30%', // Alto del 50%
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
