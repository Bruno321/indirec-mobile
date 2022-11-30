import { View, Text, StyleSheet, ScrollView,FlatList } from "react-native";
import { ActionButton, FiltersView, Header, List, OrderView, SearchInput, } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import { EquiposCard } from "../components/EquiposCard";

export const Equipos = ({ navigation,props }) => {
	const [equipos, loading] = useFetchData('equipos');
	var columns =[
		{
			id:1,
			nombre:'Troyanos',
			deporte:'Basketball',
			fac: 'Facultad de Informática',
			camp: 'Campus Juriquilla',
			sex:'Varoníl'
		},
		{
			id:2,
			nombre:'Un nombre bien largo porque no sé',
			deporte:'Fútbol',
			fac: 'Facultad de Contaduría y Administración Pública',
			camp: 'Campus San Juan del Río',
			sex:'Varoníl'
		},
		{
			id:3,
			nombre:'Gatos Salvajes',
			deporte:'Volleyball',
			fac: 'Facultad de Derecho',
			camp: 'Centro Universitario',
			sex:'Varoníl'
		},
		{
			id:4,
			nombre:'Perros',
			deporte:'Natación',
			fac: 'Facultad de Ciencias Naturales',
			camp: 'Campus Juriquilla',
			sex:'Varoníl'
		},
	]
	return (
		<View style={styles.container}>
			<Header navigation={navigation} />
			<View style={styles.titulo}>
				<Text style={styles.title}>Equipos</Text>
			</View>
			<SearchInput />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<FiltersView />
				<OrderView />
			</View>
			<View style={styles.cartas} showsVerticalScrollIndicator={false}>
				<FlatList 
					data={equipos}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.equipoId.toString()}
					renderItem= {itemData => (
						<EquiposCard {...props} Info={itemData.item}/>
					)}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'white',
		height:'100%'
	},
	cartas:{
		marginTop:40,
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