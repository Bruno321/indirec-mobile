import { useState, useEffect } from 'react';
import { View, Text, } from "react-native";
import { ActionButton, Header, List } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import moment from "moment/moment";
import 'moment/locale/es';

const Asistencias = ({navigation}) => {
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
          icon="info-circle"
          handler={() => console.log('Editar', sId)}
          color="#FFF"
          backgroundColor="#003070"
          text="Información"	
        />
        </View>
      ),
    }
  ];
    return(
			<View>
				<Header navigation={navigation}/>
				<Text style={{fontSize:40}}>Asistencias</Text>
				<List dataSource={asistencias.length ? asistencias : testData} columns={columns} loading={loading} />
			</View>
    )
}

export default Asistencias;