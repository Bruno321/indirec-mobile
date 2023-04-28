import { StyleSheet, View, Image, Dimensions, StatusBar, SafeAreaView, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const { width, fontScale } = Dimensions.get('window');

export const Header = (props) => {
	const {navigation} = props;
	return(
		<View style={styles.main}>
			<StatusBar 
				backgroundColor={"#003070"}
				barStyle={"light-content"}
				hidden={false}
			/>
			{/* <View style={styles.header}>
			</View> */}
			{navigation === undefined ? null : (
				props.funcion == "goback" ? (
				<>
					<View style={styles.menu}>
						<Feather name={'arrow-left'} size={35} color={'white'} onPress={() => navigation.goBack()}/>
					</View>
				</>
				) : (
				<>
					<View style={styles.menu}>
						<Feather name={'menu'} size={35} color={'white'} onPress={() => navigation.openDrawer()}/>
					</View>
				</>
				)
			)}
			<Text style={styles.screenTitle}>{props.title}</Text>
		</View>
)}

const styles = StyleSheet.create({
	main:{
		backgroundColor: '#003070',
		height: 80,
		flexDirection: 'row',
		alignItems: 'center',
	},
	header:{
		height: 80,
		width: 50,
		alignItems:'center',
		justifyContent:'center',
	},
	logoTexto:{
		width: width/2.3,
		resizeMode: 'contain',	
	},
	menu:{
		// marginTop:-58,
		// marginLeft:20,
		// backgroundColor: 'red',
		width:50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	screenTitle:{
		color: 'white',
		// backgroundColor: 'red',

		// width: '100%',
		fontSize: 25 / fontScale,
		paddingLeft: 5 / fontScale,
		alignSelf: 'center',
		fontWeight: 'bold',
		// alignItems: 'center',
	},
	safeareaview:{
		backgroundColor: 'red',
	}
});