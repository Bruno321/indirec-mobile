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
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { ActionButton } from "../components/ActionButton";
import MarqueeText from "react-native-marquee";
import Modal from "react-native-modal";
import React, { useState } from "react";
import { Col, Header, List } from "../components";
import TouchableCmp from "../assetsUI/TouchableCmp";
import { useFetchData } from "../Hooks/Fetch.hook";
import { TextInput } from "react-native-paper";

const { fontScale } = Dimensions.get("window");

export const EventosDetails = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [equipoSelec, setEquipoSelec] = useState();
  let datos = props.route.params.datos; //id, nombre, fecha, hora, equipoloca, etc

  console.log(datos);

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
        contentContainerStyle={{ paddingBottom: "100%" }}
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

        {/* Contenedor de Jornada */}
        <View style={styles.containerJornada}>
          <Text style={styles.tituloJornada}>Jornada: {datos.jornada}</Text>
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
                <Text style={styles.txtSubtitulo}>{datos.fecha}</Text>
              </View>
              <View>
                <Text style={styles.txtTitulo}>Hora</Text>
                <Text style={styles.txtSubtitulo}>{datos.hora}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.txtTitulo}>Lugar</Text>
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
                <Text style={{ fontSize: 22 / fontScale }}>
                  {/* {datos.puntosLocal} */} 2
                </Text>
              </View>
            </View>

            <View style={styles.containerPuntos}>
              <Text style={[styles.txtTitulo, { textAlign: "center" }]}>
                Equipo {datos.EquipoVisitante.nombre}
              </Text>
              <View style={styles.inputPuntos}>
                <Text style={{ fontSize: 22 / fontScale }}>
                  {/* {datos.puntosLocal} */} 3
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.txtTitulo}>Observaciones</Text>
          <Text style={styles.txtSubtitulo}>{datos.incidentes}</Text>
        </View>
      </ScrollView>
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
  containerJornada: {
    width: "100%",
    backgroundColor: "#003070",
  },
  tituloJornada: {
    color: "white",
    fontSize: 18 / fontScale,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 6,
    paddingBottom: 6,
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
  txtSubtitulo: {
    fontSize: 16 / fontScale,
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
});
