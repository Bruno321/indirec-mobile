import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { EquiposCard, Header, List, OrderView } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import { SearchInput, Filters, ButtonsPages } from "../components";
import { useIsFocused } from "@react-navigation/native";
import { useDidMountEffect } from "../Utils/DidMountEffect";
import TouchableCmp from "../assetsUI/TouchableCmp";
import Feather from 'react-native-vector-icons/Feather';

const { fontScale, width } = Dimensions.get('window');

export const Equipos = ({ navigation }) => {
	const [equipos, loading, change, update] = useFetchData('equipos');
	const [pagina, setPagina] = useState(0);
	const [componentAString, setComponentAString] = useState('');
	const [componentBString, setComponentBString] = useState('');
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused == true) {
			const concatenatedString = componentAString + componentBString;
			change(concatenatedString, pagina * 10);
		}
	}, [isFocused]);

	useDidMountEffect(() => {
		const concatenatedString = componentAString + componentBString;
		change(concatenatedString, pagina * 10);
	}, [componentAString, componentBString, pagina]);

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ backgroundColor: "#003070" }} />
			<Header navigation={navigation} title={"Equipos"} />

			<View style={{ alignItems: 'center', height: 120, width: width }}>
				<View style={{ flexDirection: 'column', height: "100%", justifyContent: 'space-evenly', width: "95%" }}>
					<SearchInput change={change} setPagina={setPagina} screen={"equipos"} updateConcat={setComponentAString} />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Filters screen={"Equipos"} updateConcat={setComponentBString} />
						<View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
							<TouchableCmp onPress={() => { navigation.navigate("RegistroEquipos") }}>
								<View style={styles.agregarEquipoButton}>
									<Feather name={'user-plus'} size={24} color={'white'} />
									<Text style={styles.buttonText}>Agregar Equipo</Text>
								</View>
							</TouchableCmp>
						</View>
					</View>
				</View>
			</View>

			<ButtonsPages numberPage={pagina} setPagina={setPagina} total={equipos.total} />

			<View style={styles.listView} showsVerticalScrollIndicator={false}>
				<List
					dataSource={equipos.data}
					loading={loading}
					renderItem={row => <EquiposCard props={row} />}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listView: {
		flex: 1,
		borderTopWidth: 1,
		borderColor: '#DDDDDD',
	},
	agregarEquipoButton: {
		width: width * 0.45,
		height: 40,
		alignSelf: 'center',
		backgroundColor: "#003070",
		flexDirection: 'row',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		marginLeft: 10,
		color: "white",
		fontSize: 16 / fontScale,
	}
})