import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { EventosCard, Header, List } from "../components";
import { useFetchData } from "../Hooks/Fetch.hook";
import React, { useState, useEffect} from "react";
import TouchableCmp from "../assetsUI/TouchableCmp";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ButtonsPages } from "../components";
import { Dropdown } from 'react-native-element-dropdown';
import { Filters } from "../components";
import { useDidMountEffect } from "../Utils/DidMountEffect";
import { useIsFocused } from "@react-navigation/native";

const { width, fontScale } = Dimensions.get("window");

export const Eventos = ({ navigation }) => {
  const [eventos, loading, change] = useFetchData("eventos");
  const [equipos] = useFetchData("equipos");
  const [pagina, setPagina] = useState(0);
  const [visibilidadEquipos, setVisibilidadEquipos] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('');
  const [componentAString, setComponentAString] = useState('');
  const [componentBString, setComponentBString] = useState('');
  const isFocused = useIsFocused();

  const equiposItems = equipos.data.map(oEquipo => ({
    label: oEquipo.nombre,
    value: oEquipo.nombre,
  }));

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
    <>
      <View style={styles.container}>
        <SafeAreaView style={{ backgroundColor: "#003070" }} />
        <Header navigation={navigation} title={"Eventos"} />
        <View>
          <View style={{ overflow: 'hidden', borderRadius: 10 }}>
            <TouchableCmp onPress={() => setVisibilidadEquipos(!visibilidadEquipos)}>
              <View style={[styles.buscarPorEquipoButton, equipoSeleccionado == '' ? { backgroundColor: '#003070' } : { backgroundColor: '#057642' }]}>
                <Foundation
                  name="magnifying-glass"
                  size={24}
                  color="white"
                />
                <Text style={styles.buttonText}>{equipoSeleccionado == '' ? "Buscar por equipo" : equipoSeleccionado}</Text>
              </View>
            </TouchableCmp>
          </View>
          {!visibilidadEquipos ? (
            null
          ) :
            <View style={{ alignItems: 'center' }}>
              <Dropdown
                data={equiposItems}
                labelField="label"
                valueField="value"
                placeholder='Seleccione un equipo'
                searchPlaceholder="Buscar un equipo"
                style={{
                  marginTop: 28,
                  backgroundColor: '#FFF',
                  width: width * 0.95,
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                  overflow: 'hidden',
                }}
                containerStyle={{
                  backgroundColor: '#FFF',
                  width: width * 0.95,
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                  overflow: 'hidden',
                }}
                // placeholderStyle={styles.dropdown1PlaceholderStyle}
                onChange={({ value }) => {
                  setVisibilidadEquipos(!visibilidadEquipos)
                  setEquipoSeleccionado(value)
                  setComponentAString(`$or[0][equipoLocal][$iLike]=%${value}%&$or[1][equipoVisitante][$iLike]=%${value}%`)
                }}
                search={true}
              />
              <View style={{ overflow: 'hidden', borderRadius: 10, marginVertical: 12 }}>
                <TouchableCmp onPress={() => (
                  setVisibilidadEquipos(!visibilidadEquipos), setComponentAString(''), setEquipoSeleccionado('')
                )}>
                  <View style={styles.agregarJugadorButton}>
                    <FontAwesome
                      name="undo"
                      size={24}
                      color="white"
                    />
                    <Text style={styles.buttonText}>Restablecer</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>
          }
          <View
            style={{
              paddingVertical: 12,
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <Filters screen={"Eventos"} updateConcat={setComponentBString} />
            <View style={{ overflow: 'hidden', borderRadius: 10 }}>
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
          </View>
        </View>
        <ButtonsPages numberPage={pagina} setPagina={setPagina} total={eventos.total} />
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
    </>
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
    overflow: 'hidden',
  },
  buscarPorEquipoButton: {
    width: width * 0.95,
    marginVertical: 12,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#003070",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden',
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16 / fontScale,
  },
  btnFilter: {
    width: width * 0.45,
    height: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '50%',
    height: '50%',
  }
});
