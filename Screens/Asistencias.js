import { useState, useEffect, useCallback } from 'react';
import { Dimensions, Image, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { ActionButton, AsistenciasCard, FiltersView, Header, List, OrderView } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import moment from "moment/moment";
import 'moment/locale/es';
import TouchableCmp from '../assetsUI/TouchableCmp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Filters, SearchInput, ButtonsPages } from "../components";
import { useDidMountEffect } from "../Utils/DidMountEffect";
import { useIsFocused } from "@react-navigation/native";

const { fontScale, width } = Dimensions.get('window');

export const Asistencias = ({ navigation }) => {
  const [testData, setTestData] = useState([]);
  const [asistencias, loading, change, update] = useFetchData('asistencias');
  // const [deportistas, loading, change, update] = useFetchData('deportistas');
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
    <View style={{ height: "100%", marginBottom: '65%' }}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Asistencias"} />

      <View style={{ alignItems: 'center', height: 120, width: width }}>
        <View style={{ flexDirection: 'column', height: "100%", justifyContent: 'space-evenly', width: "95%" }}>
          <SearchInput change={change} setPagina={setPagina} screen={"asistencias"} updateConcat={setComponentAString} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Filters screen={"deportistas"} updateConcat={setComponentBString} />
            <TouchableCmp onPress={() => { navigation.navigate("PaseDeLista") }}>
              <View style={styles.agregarJugadorButton}>
                <MaterialCommunityIcons name={'clipboard-list-outline'} size={24} color={'white'} />
                <Text style={styles.buttonText}>Pasar lista</Text>
              </View>
            </TouchableCmp>
          </View>
        </View>
      </View>

      {/* <Text>{JSON.stringify(asistencias.data[0].deportista_id)}</Text> */}
      <ButtonsPages numberPage={pagina} setPagina={setPagina} total={asistencias.total} />

      <View style={{ flex: 1 }}>
        <List dataSource={asistencias.data.length ? asistencias.data : testData} renderItem={row => <AsistenciasCard props={row} />} loading={loading} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
  },
  paginacion: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 40,
    height: 60,
    width: "90%",
    backgroundColor: 'rgba(255,0,0,0.2)',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  paginacionArrowSection: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  paginacionArrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    width: "100%",
    flex: 1,
  },
  paginacionSelectPage: {
    width: "60%",
    height: "100%",
    backgroundColor: 'green',
  },
  agregarJugadorButton: {
    width: width * 0.45,
    height: 40,
    alignSelf: 'center',
    backgroundColor: "#003070",
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 12,
    // marginBottom: 12,
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16 / fontScale,
  },
  viewDíaFiltrado: {
    backgroundColor: '#CCC',
    width: width * 1,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  viewDíaFiltradoText: {
    fontSize: 18 / fontScale,
    fontWeight: "bold",
  }
});