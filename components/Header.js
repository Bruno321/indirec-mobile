import { StyleSheet, View, Image, Dimensions, StatusBar, SafeAreaView, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

export const Header = (props) => {
	const {navigation} = props;
	return(
		<View style={styles.main}>
			<SafeAreaView />
			<StatusBar 
				backgroundColor={"black"}
				barStyle={"light-content"}
				hidden={false}
			/>
			{/* <View style={styles.header}>
			</View> */}
			{navigation === undefined ? null : (
				<View style={styles.menu}>
					<Feather name={'menu'} size={35} color={'white'} onPress={() => navigation.openDrawer()}/>
					<Text style={styles.screenTitle}>{props.title}</Text>
				</View>
			)}
		</View>
)}

const styles = StyleSheet.create({
	main:{
		backgroundColor: '#003070',
		height: 80,
		flexDirection: 'row',
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
		backgroundColor: 'red',
		width:50,
		flexDirection: 'row',
	},
	screenTitle:{
		color: 'white',
		width: 100
	}
});