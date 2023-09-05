import { View, Text, StyleSheet, Dimensions, SafeAreaView, } from "react-native";
import { EventosCard, Header, List } from "../components";
import { useFetchData } from "../Hooks/Fetch.hook";
import React, { useEffect, useState } from "react";
import TouchableCmp from "../assetsUI/TouchableCmp";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";
import { useDidMountEffect } from "../Utils/DidMountEffect";
import { Filters } from "../components/Filters";

const { width, fontScale } = Dimensions.get("window");

export const Eventos = ({ navigation }) => {
  const [eventos, loading, change, update] = useFetchData("eventos");
  const [pagina, setPagina] = useState(0);
  const [componentAString, setComponentAString] = useState('');
  const [componentBString, setComponentBString] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused == true) {
      const concatenatedString = componentAString + componentBString;
      change(concatenatedString, pagina * 10);
    }
  }, [isFocused]);

  useDidMountEffect(() => {
    const concatenatedString = componentAString + componentBString;
    change(concatenatedString, pagina * 10);
  }, [componentAString, componentBString, pagina]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Eventos"} />
      <View
        style={{
          paddingVertical: 24,
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        {/* <Filters screen={"Eventos"} /> */}
        <TouchableCmp onPress={() => navigation.navigate("RegistroEventos")}>
          <View style={styles.agregarJugadorButton}>
            <MaterialCommunityIcons
              name={"clipboard-list-outline"}
              size={24}
              color={"white"}
            />
            <Text style={styles.buttonText}>Generar Evento</Text>
          </View>
        </TouchableCmp>
      </View>
      <View style={styles.cartas} showsVerticalScrollIndicator={false}>
        <List
          dataSource={eventos.data}
          loading={loading}
          renderItem={(row) => (
            <EventosCard props={row} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  cartas: {
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
    flex: 1,
  },
  agregarJugadorButton: {
    width: width * 0.45,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#003070",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16 / fontScale,
  },
});
