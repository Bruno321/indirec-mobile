import { useState, useEffect, useCallback } from 'react';
import { Dimensions, Image, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { ActionButton, AsistenciasCard, FiltersView, Header, List, OrderView } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import moment from "moment/moment";
import 'moment/locale/es';
import TouchableCmp from '../assetsUI/TouchableCmp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Filters, SearchInput, ButtonsPages } from "../components";
import { useFocusEffect } from '@react-navigation/core';
import { useDidMountEffect } from "../Utils/DidMountEffect";

const { fontScale, width } = Dimensions.get('window');

export const Asistencias = ({ navigation }) => {
  const [testData, setTestData] = useState([]);
  const [asistencias, loading, change, update] = useFetchData('asistencias');
  const [pagina, setPagina] = useState(0);

  useFocusEffect(useCallback(() => {
    update();
  }, [navigation]));

  useDidMountEffect(() => {
    change("", pagina * 10, 10);
  }, [pagina]);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombres',
    },
    {
      title: 'Entrada',
      dataIndex: 'horaEntrada',
      render: hora => moment(hora).format("h:mm a")
    },
    {
      title: 'Salida',
      dataIndex: 'horaSalida',
      render: hora => moment(hora).format("h:mm a")
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      render: fecha => moment(fecha).locale('es').format("dddd, MMMM D, YYYY")
    },
    {
      dataIndex: 'id',
      title: 'Acciones',
      render: (sId, row, styles) => (
        <View style={styles}>
          <ActionButton
            icon="info"
            handler={() => console.log('Editar', sId)}
            color="#FFF"
            backgroundColor="#003070"
            text="Información"
            widthPercentage={0.3}
            heightPercentage={0.035}
          />
        </View>
      ),
    }
  ];
  return (
    <View style={{ height: "100%", marginBottom: '65%' }}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Asistencias"} />

      <View style={{ alignItems: 'center', height: 120, width: width }}>
        <View style={{ flexDirection: 'column', height: "100%", justifyContent: 'space-evenly', width: "95%"}}>
          <SearchInput change={change} reset={update} screen={"asistencias"} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Filters change={change} reset={update} />
            <TouchableCmp onPress={() => { navigation.navigate("Home") }}>
              <View style={styles.agregarJugadorButton}>
                <MaterialCommunityIcons name={'clipboard-list-outline'} size={24} color={'white'} />
                <Text style={styles.buttonText}>Pasar lista</Text>
              </View>
            </TouchableCmp>
          </View>
        </View>
      </View>
      {/* <View style={styles.viewDíaFiltrado}>
        <Text style={styles.viewDíaFiltradoText}>☢WORK IN PROGRESS FECHA FILTRADA☢</Text>
      </View> */}

      {/* You can choose between the following options to show the data: */}

      {/* USING COLUMNS ARRAY */}
      {/* <List dataSource={asistencias.length ? asistencias : testData} columns={columns} loading={loading} /> */}

      {/* USING CUSTOM RENDER */}
      <ButtonsPages numberPage={pagina} setPagina={setPagina} total={asistencias.total}/>
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