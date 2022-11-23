import { StyleSheet, View, Image, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

export const Header = ({ navigation }) => {
	return(
		<View style={styles.main}>
			<SafeAreaView />
			<StatusBar 
				backgroundColor={"black"}
				barStyle={"light-content"}
				hidden={false}
			/>
			<View style={styles.header}>
				<Image
					style={styles.logoTexto}
					source={require('../images/indereq-logo-texto.png')}
				/>
			</View>
			{navigation === undefined ? null : (
				<View style={styles.menu}>
					<Feather name={'menu'} size={35} color={'white'} onPress={() => navigation.openDrawer()}/>
				</View>
			)}
		</View>
)}

const styles = StyleSheet.create({
	main:{
		backgroundColor: '#003070',
		height: height * 0.09,
	},
	header:{
		height: 80,
		alignItems:'center',
		justifyContent:'center',
	},
	logoTexto:{
		width: width/2.3,
		resizeMode: 'contain',	
	},
	menu:{
		marginTop:-58,
		marginLeft:20,
		width:50
	}
});