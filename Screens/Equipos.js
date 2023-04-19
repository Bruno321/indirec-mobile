import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { EquiposCard , FiltersView, Header, List, OrderView, SearchInput } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import { Filters } from "../components/FilterEquipos";


const { fontScale } = Dimensions.get('window');

export const Equipos = ({ navigation }) => {
	const [equipos, loading] = useFetchData('equipos');

	return (
		<View style={styles.container}>
			<SafeAreaView style={{backgroundColor: "#003070"}}/>
			<Header navigation={navigation} title={"Equipos"}/>
			{/* <Text style={{ fontSize: 35 / fontScale, fontFamily: 'Fredoka-Medium', paddingLeft: 10}}>Equipos</Text> */}
			
			{/* <View style={styles.titulo}>
				<Text style={styles.title}>Equipos</Text>
			</View> */}
			<SearchInput />
			{/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<FiltersView />
				<OrderView />
			</View> */}
			<View style={{paddingVertical: 24, justifyContent: 'space-around', flexDirection: 'row'}}>
				<Filters />
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
		backgroundColor:'#FFF',
		height: '95%',
	},
	cartas:{
		marginTop:10,
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