import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { EquiposCard , FiltersView, Header, List, OrderView} from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import { SearchInput, Filters} from "../components";
const { fontScale, width } = Dimensions.get('window');

export const Equipos = ({ navigation }) => {
	const [equipos, loading, change, update] = useFetchData('equipos');

	return (
		<View style={styles.container}>
			<SafeAreaView style={{backgroundColor: "#003070"}}/>
			<Header navigation={navigation} title={"Equipos"}/>
			<View style={{ alignItems: 'center', height: 120, width: width }}>
			<View style={{ flexDirection: 'column', height: "100%", justifyContent: 'space-evenly', width: "95%"}}>
				<SearchInput change={change} reset={update} screen={"equipos"} />
            	<Filters change={change} reset={update} />
			</View>
			</View>

			<View style={styles.cartas} showsVerticalScrollIndicator={false}>
				<List 
					dataSource={equipos.data}
					loading={loading}
					renderItem= {row => <EquiposCard props={row} />}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	cartas:{
		flex: 1,
		borderTopWidth:1,
		borderColor:'#DDDDDD',
	},
})