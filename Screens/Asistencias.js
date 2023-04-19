import { useState, useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { ActionButton, AsistenciasCard, FiltersView, Header, List, OrderView, SearchInput } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import moment from "moment/moment";
import 'moment/locale/es';
import TouchableCmp from '../assetsUI/TouchableCmp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Filters } from "../components/Filters";

const { fontScale, width} = Dimensions.get('window');

export const Asistencias = ({navigation}) => {
	const [testData, setTestData] = useState([]);
	const [asistencias, loading] = useFetchData('deportistas/asistencias');

	// ? Testing purposes
	useEffect(() => {
		if (!loading) {
			if (!asistencias.length) {
				setTestData([{
					deportistum: {
						nombres: "Juan Perez",
					},
					horaEntrada: "2021-05-01T20:00:00.000Z",
					horaSalida: "2021-05-01T20:00:00.000Z",
					fecha: "2021-05-01T20:00:00.000Z",
				}]);
			}
		}
	}, [loading]);

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
    return(
			<View style={{ flex:1, marginBottom: '65%' }}>
        <SafeAreaView style={{backgroundColor: "#003070"}}/>
				<Header navigation={navigation} title={"Asistencias"}/>
        {/* <Text style={{ fontSize: 35 / fontScale, fontFamily: 'Fredoka-Medium', paddingLeft: 10}}>Asistencias</Text> */}
        <SearchInput />
        {/* <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
          <FiltersView />
          <OrderView />
        </View> */}
        {/* <View style={{ flexDirection:'row', justifyContent: 'center' }}>
          <ActionButton
            style={{ marginTop: 20, marginBottom: 20 }}
            icon={<Image source={require('../assets/icons/list.png')}/>}
            handler={() => console.log('Pasar lista')}
            color="#FFF"
            backgroundColor="#003070"
            text="Pasar lista"
            widthPercentage={0.9}
            heightPercentage={0.04}
          />
        </View> */}

        <View style={{paddingVertical: 24, justifyContent: 'space-around', flexDirection: 'row'}}>
          <Filters />
          <TouchableCmp onPress={() => {navigation.navigate("Home")}}>
            <View style={styles.agregarJugadorButton}>
                <MaterialCommunityIcons name={'clipboard-list-outline'} size={24} color={'white'}/>
                <Text style={styles.buttonText}>Pasar lista</Text>
            </View>
          </TouchableCmp>
        </View>

        {/* You can choose between the following options to show the data: */}

        {/* USING COLUMNS ARRAY */}
				{/* <List dataSource={asistencias.length ? asistencias : testData} columns={columns} loading={loading} /> */}

        {/* USING CUSTOM RENDER */}
        <List dataSource={asistencias.length ? asistencias : testData} renderItem={row => <AsistenciasCard props={row} />} loading={loading} />

			</View>
    )
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    // position: 'relative',
  },
  paginacion:{
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
  paginacionArrowSection:{
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  paginacionArrowButton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    width: "100%",
    flex: 1,
  },
  paginacionSelectPage:{
    width: "60%",
    height: "100%",
    backgroundColor: 'green',
  },
  agregarJugadorButton:{
    width: width*0.45,
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
  buttonText:{
    marginLeft: 10,
    color: "white",
    fontSize: 16 / fontScale,
  }
});