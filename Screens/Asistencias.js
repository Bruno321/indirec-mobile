import { useState, useEffect } from 'react';
import { Dimensions, Image, Text, View } from "react-native";
import { ActionButton, AsistenciasCard, FiltersView, Header, List, OrderView, SearchInput } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import moment from "moment/moment";
import 'moment/locale/es';

const { fontScale } = Dimensions.get('window');

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
      dataIndex: 'deportistum.nombres',
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
				<Header navigation={navigation}/>
				<Text style={{ fontSize: 35 / fontScale }}>Asistencias</Text>
        <SearchInput />
        <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
          <FiltersView />
          <OrderView />
        </View>
        <View style={{ flexDirection:'row', justifyContent: 'center' }}>
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
        </View>

        {/* You can choose between the following options to show the data: */}

        {/* USING COLUMNS ARRAY */}
				<List dataSource={asistencias.length ? asistencias : testData} columns={columns} loading={loading} />

        {/* USING CUSTOM RENDER */}
        {/* <List dataSource={asistencias.length ? asistencias : testData} renderItem={row => <AsistenciasCard props={row} />} loading={loading} /> */}

			</View>
    )
}