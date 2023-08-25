import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { ActionButton } from "./ActionButton";
import MarqueeText from "react-native-marquee";
import Modal from "react-native-modal";
import React, { useState } from "react";
import TouchableCmp from "../assetsUI/TouchableCmp";

const { fontScale } = Dimensions.get("window");

export const EventosCard = ({ props, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const redirect = () => {
    navigation.navigate("Eventos.details", { datos: props });
  };

  return (
        <TouchableOpacity
          style={styles.containerCard}
          onPress={() => {
            redirect();
          }}
        >
          <View style={{flexDirection: 'row', height: 100}}>
            <View style={styles.containerTeam}>
              <Text style={{ fontSize: 18 / fontScale, fontWeight: "700" }}>
                {props.EquipoLocal.nombre}
              </Text>
            </View>

            <View style={styles.containerDate}>
              <Text>{props.fecha}</Text>
              <Text style={styles.date}>{props.hora}</Text>
            </View>

            <View style={styles.containerTeam}>
              <Text style={{ fontSize: 18 / fontScale, fontWeight: "700" }}>
                {props.EquipoVisitante.nombre}
              </Text>
            </View>
          </View>
          <Text>{props.canchaJugada}</Text>


        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#FFF",
    // height: 120,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
    // paddingBottom: 20,
    // paddingTop: 15,
    paddingHorizontal: 30,
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  containerTeam: {
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerDate: {
    flex: 1,
    width: "30%",
    // height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  date: {
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
  btnInfo: {
    flexDirection: "row",
    backgroundColor: "#003070",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  nom: {
    fontSize: 25 / fontScale,
    fontWeight: "700",
  },
  info: {
    color: "white",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 33,
  },
  title: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 30 / fontScale,
    textAlign: "center",
  },
  titulo: {
    marginBottom: 20,
  },
  txtTitulo: {
    fontFamily: "Fredoka-Medium",
    fontSize: 20 / fontScale,
    paddingLeft: 3,
  },
  txt: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    paddingLeft: 3,
    marginVertical: 5,
  },
  fecha: {
    marginTop: 30,
  },
  equipos: {
    marginTop: 30,
  },
  director: {
    marginTop: 30,
  },
  puntos: {
    marginTop: 30,
  },
  jornada: {
    marginTop: 30,
  },
  notas: {
    marginTop: 30,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  btn: {
    paddingVertical: 8,
    width: 90,
    borderRadius: 15,
    backgroundColor: "#003070",
  },
  txtBtn: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18 / fontScale,
    color: "white",
    textAlign: "center",
  },
  boton: {
    marginTop: 50,
    alignItems: "flex-end",
    overflow: "hidden",
  },
});
