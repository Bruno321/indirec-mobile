import { Dimensions, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import { Header, List, DeportistasCard } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import TouchableCmp from '../assetsUI/TouchableCmp';
import Feather from 'react-native-vector-icons/Feather';
import { SearchInput, Filters, ButtonsPages } from "../components";

const { fontScale, width } = Dimensions.get('window');

export const Deportistas = ({ navigation }) => {
  const [deportistas, loading, change, update] = useFetchData('deportistas');
  const [pagina, setPagina] = useState(1);

  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Deportistas"} />

      <View style={{ alignItems: 'center', height: 120, width: width }}>
        <View style={{ flexDirection: 'column', height: "100%", justifyContent: 'space-evenly', width: "95%"}}>
          {/* BUSQUEDA */}
          <SearchInput change={change} reset={update} screen={"deportistas"} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* FILTROS */}
            <Filters change={change} reset={update} />
            {/* AGREGAR JUGADOR */}
            <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
              <TouchableCmp onPress={() => { navigation.navigate("RegistroDeportistas") }}>
                <View style={styles.agregarJugadorButton}>
                  <Feather name={'user-plus'} size={24} color={'white'} />
                  <Text style={styles.buttonText}>Agregar Jugador</Text>
                </View>
              </TouchableCmp>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <List dataSource={deportistas.data} renderItem={row => <DeportistasCard props={row} />} loading={loading} />
      </View>

      <View style={{ width: "100%", height: 100 }}></View>

      {/* <View style={styles.paginacion}>
        <TouchableCmp style={styles.paginacionArrowSection} onPress={() => { change('' , 10, 10) }}>
          <View style={styles.paginacionArrowButton}>
            <Feather name={'chevron-left'} size={35} color={'white'} />
          </View>
        </TouchableCmp>

        <View style={styles.paginacionSelectPage}></View>

        <TouchableCmp style={styles.paginacionArrowSection} onPress={() => { change('' , 20, 10) }}>
          <View style={styles.paginacionArrowButton}>
            <Feather name={'chevron-right'} size={35} color={'white'} />
          </View>
        </TouchableCmp>
      </View> */}
      <ButtonsPages numberPage={pagina} setPagina={setPagina} total={deportistas}/>

    </View>
  )
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    // position: 'relative',
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
  }
});