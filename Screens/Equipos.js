import { View, Text, StyleSheet, ScrollView,FlatList } from "react-native";
import { EquiposCard , FiltersView, Header, List, OrderView, SearchInput } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';

export const Equipos = ({ navigation,props }) => {
	const [equipos, loading] = useFetchData('equipos');
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
				<List 
					dataSource={equipos}
					loading={loading}
					renderItem= {row => <EquiposCard props={row} />}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		backgroundColor:'white',
		marginBottom: '65%'
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