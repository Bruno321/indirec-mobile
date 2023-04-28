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
			<SearchInput />
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
		flex: 1,
	},
	cartas:{
		flex: 1,
		borderTopWidth:1,
		borderColor:'#DDDDDD',
	},
})