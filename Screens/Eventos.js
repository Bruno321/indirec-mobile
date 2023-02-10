import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { ActionButton, EventosCard , FiltersView, Header, List, OrderView, SearchInput } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import {Ionicons} from '@expo/vector-icons';

const { fontScale } = Dimensions.get('window');

export const Eventos = ({ navigation }) => {
	const [equipos, loading] = useFetchData('equipos');

    const columns = [
        {
            nombre1: "Equipo 1",
            nombre2: "Equipo 2",
            fecha: "10/03/2023",
            hora: "11:00",
            campus: "Campus Juriquilla"
        },
        {
            nombre1: "Equipo A",
            nombre2: "Equipo B",
            fecha: "20/05/2024",
            hora: "20:00",
            campus: "Campus Cerropuerto"
        },
        {
            nombre1: "Equipo 0",
            nombre2: "Equipo 10",
            fecha: "05/01/2022",
            hora: "09:30",
            campus: "Campus Cadereyta"
        },
    ]

	return (
		<View style={styles.container}>
			<SafeAreaView style={{backgroundColor: "#003070"}}/>
			<Header navigation={navigation} title={"Eventos"}/>
			<SearchInput />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<FiltersView />
				<OrderView />
			</View>
            <View style={{ flexDirection:'row', justifyContent: 'center' }}>
                <ActionButton
                    style={{ marginTop: 20, marginBottom: 20 }}
                    icon={<Ionicons name="trophy-outline" size={18} color={"white"}/>}
                    handler={() => console.log('Agregar evento')}
                    color="#FFF"
                    backgroundColor="#003070"
                    text="Agregar Evento"
                    widthPercentage={0.9}
                    heightPercentage={0.04}
                />
            </View>
			<View style={styles.cartas} showsVerticalScrollIndicator={false}>
				<List
					dataSource={columns}
					loading={loading}
					renderItem= {row => <EventosCard props={row} />}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#FFF',
		height: '95%',
	},
	cartas:{
		marginTop:20,
		borderTopWidth:1,
		borderColor:'#DDDDDD',
		paddingBottom:280
	},
	title:{
		fontSize:35,
		fontWeight:'800',
	},
	titulo:{
		padding:30
	}
})