import { Dimensions, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { Header, List, DeportistasCard } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import TouchableCmp from '../assetsUI/TouchableCmp';
import Feather from 'react-native-vector-icons/Feather';
import { SearchInput, Filters, ButtonsPages } from "../components";
import { useFocusEffect } from '@react-navigation/core';
import { useDidMountEffect } from "../Utils/DidMountEffect";

const { fontScale, width } = Dimensions.get('window');

export const Deportistas = ({ navigation }) => {
  const [deportistas, loading, change, update] = useFetchData('deportistas');
  const [pagina, setPagina] = useState(0);
  const [ concatenado, setConcatenado] = useState('');

  // useFocusEffect(useCallback(() => {
  //   if (pagina == 0) {
  //     setPagina(0);
  //     update();
  //   } else {
  //     change("", pagina * 10);
  //   }
  // }, [navigation]));
  
  useDidMountEffect(() => {
    console.log("PRESIONASTE UN BOTON DE CAMBIAR PAGINA");
    change("", pagina * 10);
  }, [pagina]);



  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Deportistas"} />

      <View style={{ alignItems: 'center', height: 120, width: width }}>
        <View style={{ flexDirection: 'column', height: "100%", justifyContent: 'space-evenly', width: "95%"}}>
          {/* BUSQUEDA */}
          <SearchInput change={change} reset={update} screen={"deportistas"} setConcatenado={setConcatenado}/>
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

      <ButtonsPages numberPage={pagina} setPagina={setPagina} total={deportistas.total}/>
      <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: "#BBB"}}>
        <List dataSource={deportistas.data} renderItem={row => <DeportistasCard props={row} />} loading={loading} />
      </View>


    </View>
  )
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: "white",
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
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16 / fontScale,
  }
});