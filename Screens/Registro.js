import { StyleSheet, Text, View, Image, Dimensions, TextInput, Button, ScrollView, Switch, SafeAreaView, Alert  } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import TouchableCmp from '../assetsUI/TouchableCmp';
import Header from "../components/Header"
import { AuthContext } from '../components/context';


export default function Registro(){
	const onInitialState ={
		expediente: '',
		nombres:'',
		apellidos:'',
		sexo:'',
		facultad:'',
		sexoText:'Selecciona una opción',
		facultadText:'Selecciona una facultad',
		seleccionado:'',
		seguro:'',
		email:'',
		telefono:'',
		telEmergencia:'',
		isValidExp:true,
		isValidNomb:true,
		isValidApe:true,
		isValidSex:true,
		isValidFac:true,
		isValidSeg:true,
		isValidEmail:true,
		isValidTel:true,
		isValidEmer:true,
	}
	const { signOut } = React.useContext(AuthContext);
	const sexo = ["Masculino", "Femenino"];
	const facultades=["Informática","Ingeniería","Ciencias"]
	const [isEnabled, setIsEnabled] = useState(false);
	const [check, setCheck] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	const [form,setForm] = useState(onInitialState)
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const numberformat = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/g;
	const numberformat2 = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{4}( |-|\.)?\d{3})$/g;
	const numberformat3 = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{2}( |-|\.)?\d{2}( |-|\.)?\d{3})$/g;
	const numberformat4 = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{2}( |-|\.)?\d{2})$/g;
	const nameformat = /^([A-ZÁÉÍÓÚ]['-]?[a-záéíóúü]+([ ]?[a-z]?['-]?[A-ZÁÉÍÓÚ]['-]?[a-záéíóúü]+)*)$/
	const expformat = /^([0-9]{5,7})$/
	const seguroformat = /^^([0-9]{2}-?[0-9]{2}-?[0-9]{2}-?[0-9]{4}-?[0-9]{1})$$/

	const [data, setData] = React.useState({
		expediente: '',
		nombres:'',
		apellidos:'',
		sexo:'',
		facultad:'',
		sexoText:'Selecciona una opción',
		facultadText:'Selecciona una facultad',
		seleccionado:'No',
		seguro:'',
		email:'',
		telefono:'',
		telEmergencia:'',
		isValidExp:true,
		isValidNomb:true,
		isValidApe:true,
		isValidSex:true,
		isValidFac:true,
		isValidSeg:true,
		isValidEmail:true,
		isValidTel:true,
		isValidEmer:true,
	})

	const logoutHandle= ()=>{
		signOut();
	  }

	const handleExpChange = (value) =>{
	if(value.length > 0 && value.match(expformat)){
		setData({
		...data,
		expediente:value,
		isValidExp:true
		})
	}else{
		setData({
			...data,
			expediente:value,
			isValidExp:false
		})
	}
	}
	const handleNomChange = (value) =>{
	if(value.length > 0 && value.match(nameformat)){
		setData({
		...data,
		nombres:value,
		isValidNomb:true
		})
	}else{
		setData({
			...data,
			nombres:value,
			isValidNomb:false
		})
	}
	}
	const handleApellChange = (value) =>{
	if(value.length > 0 && value.match(nameformat)){
		setData({
		...data,
		apellidos:value,
		isValidApe:true
		})
	}else{
		setData({
			...data,
			apellidos:value,
			isValidApe:false
		})
	}
	}
	const handleSegChange = (value) =>{
	if(value.length > 0 && value.match(seguroformat)){
		setData({
		...data,
		seguro:value,
		isValidSeg:true
		})
	}else{
		setData({
			...data,
			seguro:value,
			isValidSeg:false
		})
	}
	}
	const handleEmailChange = (value) =>{
	if(value.length > 0 && value.match(mailformat)){
		setData({
		...data,
		email:value,
		isValidEmail:true
		})
	}else{
		setData({
			...data,
			email:value,
			isValidEmail:false
		})
	}
	}
	const handleTelChange = (value) =>{
	if(value.length > 0 && (value.match(numberformat)||value.match(numberformat2)||value.match(numberformat3)||value.match(numberformat4))){
		setData({
		...data,
		telefono:value,
		isValidTel:true
		})
	}else{
		setData({
			...data,
			telefono:value,
			isValidTel:false
		})
	}
	}
	const handleEmeChange = (value) =>{
		if(value.length > 0 && (value.match(numberformat)||value.match(numberformat2)||value.match(numberformat3)||value.match(numberformat4))){
		setData({
		...data,
		telEmergencia:value,
		isValidEmer:true
		})
	}else{
		setData({
			...data,
			telEmergencia:value,
			isValidEmer:false
		})
	}
	}
	const handleSexChange = (value) =>{
		setData({
		...data,
		sexo:value,
		})
	}
	const handleFacChange = (value) =>{
		setData({
		...data,
		facultad:value,
		})
	}

	const handleSubmit = ()=>{
		if(!CheckAll()){
			Alert.alert('Información incorrecta', 'Uno o más campos son incorrectos',[
				{text:'Okay'}
			 ]);
			console.log("NO ESTA BIEN")
		}else{
			setData(onInitialState);
			navigation.navigate("Home")
		}
	}

	const CheckAll = () =>{
		if((data.isValidExp&&data.isValidNomb&&data.isValidApe&&data.isValidSeg&&data.isValidEmail&&data.isValidTel&&data.isValidEmer
			&& data.expediente.trim().length >0 && data.nombres.trim().length >0 && data.apellidos.trim().length >0
			&& data.seguro.trim().length >0 && data.email.trim().length >0 && data.telefono.trim().length >0 && data.telEmergencia.trim().length >0
			)){
				return true
			}else{
				return false
			}
	}

	const navigation = useNavigation();

	return(
		<ScrollView style={styles.general} showsVerticalScrollIndicator={false}>
		<SafeAreaView />
			<Header navigation={navigation}/>
			<View style={styles.center}>
				<View style={styles.viewTitulo}>
					<Text style={styles.titulo}>Registro de un deportista</Text>
					{/* <FontAwesome name='soccer-ball-o' size={25} color='blue'/> */}
				</View>
				<View style={styles.viewForm}>
					<Text style={styles.campos}>Expediente:</Text>
					<TextInput 
						placeholder='123456' style={styles.input}
						keyboardType='number-pad'
						onChangeText={(value) => handleExpChange(value)}
						value={data.expediente}
						/>
					{ data. isValidExp ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos}>{"Nombre(s):"}</Text>
					<TextInput 
						placeholder='Jorge Alejandro' style={styles.input}
						onChangeText={(value) => handleNomChange(value)}
						value={data.nombres}
					/>
					{ data. isValidNomb ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos}>{"Apellidos:"}</Text>
					<TextInput placeholder='Bernal Colín' style={styles.input}
					onChangeText={(value) => handleApellChange(value)}
					value={data.apellidos}/>
					{ data. isValidApe ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos}>Sexo:</Text>
					<SelectDropdown 
						data={sexo}
						onSelect={(selectedItem, index) => {
							// console.log(selectedItem, index)
							handleSexChange(selectedItem);
						}}
						defaultButtonText={data.sexoText}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem
						}}
						buttonStyle={styles.dropdown1BtnStyle}
						buttonTextStyle={styles.dropdown1BtnTxtStyle}
						renderDropdownIcon={isOpened => {
						return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
						}}
						dropdownIconPosition={'right'}
						dropdownStyle={styles.dropdown1DropdownStyle}
						rowStyle={styles.dropdown1RowStyle}
						rowTextStyle={styles.dropdown1RowTxtStyle}
					/>
					{ data. isValidSex ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos}>Facultad:</Text>
					<SelectDropdown 
						data={facultades}
						onSelect={(selectedItem, index) => {
							handleFacChange(selectedItem);
						}}
						defaultButtonText={data.facultadText}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem
						}}
						buttonStyle={styles.dropdown1BtnStyle}
						buttonTextStyle={styles.dropdown1BtnTxtStyle}
						renderDropdownIcon={isOpened => {
						return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
						}}
						dropdownIconPosition={'right'}
						dropdownStyle={styles.dropdown1DropdownStyle}
						rowStyle={styles.dropdown1RowStyle}
						rowTextStyle={styles.dropdown1RowTxtStyle}
					/>
					{ data. isValidFac ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos}>{"¿Eres jugador seleccionado?"}</Text>
					<View style={styles.switch}>
						<View style={styles.switch2}> 
							<Text style={{fontFamily:'Fredoka-Light'}}>No</Text>
						</View>
						<Switch 
							trackColor={{ false: "#DBDBDB", true: "#CFDBD5" }}
							thumbColor={isEnabled ? "#09418C" : "#767577"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
						<View style={styles.switch2}> 
							<Text style={{fontFamily:'Fredoka-Light'}}>Si</Text>
						</View>
					</View>
					<Text style={styles.campos}>No. Seguro Social:</Text>
					<TextInput placeholder='12345678912' style={styles.input}
					onChangeText={(value) => handleSegChange(value)}
					keyboardType='numeric'
					value={data.seguro}/>
					{ data. isValidSeg ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos}>Correo electrónico:</Text>
					<TextInput placeholder='ejemplo@mail.com' style={styles.input}
					keyboardType='email-address'
					onChangeText={(value) => handleEmailChange(value)}
					value={data.email}/>
					{ data. isValidEmail ? null : 
						<Text style={styles.error}>Campo invalido</Text>
					}
					<Text style={styles.campos}>Teléfono:</Text>
					<TextInput placeholder='442-123-4567' style={styles.input}
					keyboardType='phone-pad'
					onChangeText={(value) => handleTelChange(value)}
					value={data.telefono}/>
					{ data. isValidTel ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos}>Teléfono de emergencias:</Text>
					<TextInput placeholder='+51-442-123-12-12' style={styles.input}
					keyboardType='phone-pad'
					onChangeText={(value) => handleEmeChange(value)}
					value={data.telEmergencia}/>
					{ data. isValidEmer ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos2}>Kárdex:</Text>
					<View style={styles.subir}>
						<View style={styles.viewTouch}>
							<TouchableCmp>
								<View style={styles.viewTouch2}>
									<View style={styles.viewTouch3}>
										<Feather name={'upload'} color={'#003070'} size={13}/>
										<Text style={styles.touch}>Subir archivo</Text>	
									</View>
								</View>
							</TouchableCmp>
						</View>
						<View style={styles.viewLeyenda}>
							<Text style={styles.leyenda}>Sin archivos seleccionados</Text>
						</View>
					</View>
					<Text style={styles.campos}>Identificación oficial:</Text>
					<View style={styles.subir}>
						<View style={styles.viewTouch}>
							<TouchableCmp>
								<View style={styles.viewTouch2}>
									<View style={styles.viewTouch3}>
										<Feather name={'upload'} color={'#003070'} size={13}/>
										<Text style={styles.touch}>Subir archivo</Text>	
									</View>
								</View>
							</TouchableCmp>
						</View>
						<View style={styles.viewLeyenda}>
							<Text style={styles.leyenda}>Sin archivos seleccionados</Text>
						</View>
					</View>
					<Text style={styles.campos}>Foto del deportista:</Text>
					<View style={styles.subir}>
						<View style={styles.viewTouch}>
							<TouchableCmp>
								<View style={styles.viewTouch2}>
									<View style={styles.viewTouch3}>
										<Feather name={'upload'} color={'#003070'} size={13}/>
										<Text style={styles.touch}>Subir archivo</Text>	
									</View>
								</View>
							</TouchableCmp>
						</View>
						<View style={styles.viewLeyenda}>
							<Text style={styles.leyenda}>Sin archivos seleccionados</Text>
						</View>
					</View>
				</View>
				<View style={styles.viewButton}>
					<TouchableCmp onPress={()=>{handleSubmit()}}>
						{(CheckAll())
						?<View style={styles.viewRegistrar}>
							<Text style={styles.registrar} onPress={()=>{handleSubmit()}}>Registrar deportista</Text>
						</View>:
						<View style={styles.viewRegistrarFalse}>
							<Text style={styles.registrar} onPress={()=>{handleSubmit()}}>Registrar deportista</Text>
						</View>}
					</TouchableCmp>
				</View>
			</View>
		</ScrollView>
	)
}


const styles = StyleSheet.create({
	general:{
		backgroundColor:'white',
	},
	header:{
		backgroundColor: '#003070',
		height:Dimensions.get('window').height/8,
		alignItems:'center',
		justifyContent:'center',
	},
	logoTexto:{
		width: Dimensions.get('window').width/2.3,
		resizeMode: 'contain',	
		marginTop:Dimensions.get('window').width/15,
	},
	center:{
		alignItems:'center'
	},
	viewTitulo:{
		//backgroundColor:'red',
		width:Dimensions.get('window').width/1.25,
		marginTop:Dimensions.get('window').height/28,
	},
	titulo:{
		fontSize: 40,
		fontFamily:'Fredoka-Medium',
	},
	viewForm:{
		// backgroundColor:'red',
		width:Dimensions.get('window').width/1.25,
		marginTop:Dimensions.get('window').height/28,
	},
	campos:{
		fontFamily:'Fredoka-Light',
		marginTop:15
	},
	campos2:{
		fontFamily:'Fredoka-Light',
		marginTop:30,
	},
	input:{
		width:Dimensions.get('window').width/1.25,
		paddingLeft:5,
		borderBottomWidth:1,
		borderBottomColor:'black',
		//marginBottom:15,
		fontFamily:'Fredoka-Light',
		// height:28.5
	},
	dropdown1BtnStyle: {
		width: '100%',
		height: 30,
		backgroundColor:'white',
		borderBottomWidth: 1,
		borderColor: 'black',
		//marginBottom:15,
	},
	dropdown1BtnTxtStyle: {
		color: 'black', 
		textAlign: 'left',
		fontFamily:'Fredoka-Light',
		fontSize:14,
	},
  	dropdown1DropdownStyle: {
		backgroundColor: '#EFEFEF',
		marginTop:-1.5
	},
  	dropdown1RowStyle: {
		backgroundColor: '#EFEFEF', 
		borderBottomColor: '#C5C5C5'
	},
  	dropdown1RowTxtStyle: {
		color: '#444', 
		textAlign: 'left',
		fontSize:15,
		fontFamily:'Fredoka-Light'
	},
	touch:{
		fontSize:14,
		fontFamily:'Fredoka-Medium',
		color:'#003070',
	},
	viewTouch:{
		marginTop:7,
		width:Dimensions.get('window').width/1.8,
		//width:230,
		height:Dimensions.get('window').height/21,
		// height:40,
		borderRadius:10,
		borderColor:'#003070',
		borderWidth:1,
		alignItems:'center',
		justifyContent:'center',
		overflow:'hidden',
		marginBottom:15,
	},
	viewTouch2:{
		width:Dimensions.get('window').width/1.8,
		//width:230,
		height:Dimensions.get('window').height/21,
		// height:40,
		borderRadius:10,
		borderColor:'#003070',
		alignItems:'center',
		justifyContent:'center',
		overflow:'hidden',
	},
	viewTouch3:{
		width:Dimensions.get('window').width/3,
		flexDirection:'row',
		justifyContent:'center',
		justifyContent:'space-around'
	},
	viewLeyenda:{
		width:Dimensions.get('window').width/4.5,
		height:Dimensions.get('window').height/21,
		marginTop:6,
		justifyContent:'center'
	},
	leyenda:{
		color:'black',
		fontSize:12,
		fontFamily:'Fredoka-Light',
		textAlign:'center'
	},
	subir:{
		flexDirection:'row',
		justifyContent:'center',
		justifyContent:'space-between'
	},
	registrar:{
		fontFamily:'Fredoka-Regular',
		fontSize:16,
		color:'white',
		textAlign:'center',
	},
	registrarFalse:{
		fontFamily:'Fredoka-Regular',
		fontSize:16,
		color:'#DEDEDE',
		textAlign:'center',
	},
	viewRegistrar:{
		width:Dimensions.get('window').width/1.25,
		height:55,
		borderRadius:10,
		backgroundColor:'#003070',
		justifyContent:'center',
		overflow:'hidden',
	},
	viewRegistrarFalse:{
		width:Dimensions.get('window').width/1.25,
		height:55,
		borderRadius:10,
		backgroundColor:'#777777',
		justifyContent:'center',
		overflow:'hidden',
	},
	viewButton:{
		backgroundColor:'red',
		width:Dimensions.get('window').width/1.25,
		height:55,
		borderRadius:10,
		backgroundColor:'#003070',
		justifyContent:'center',
		marginTop:40,
		marginBottom:30,
		overflow:'hidden',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 4,
		backgroundColor:'red',
	},
	switch:{
		//backgroundColor:'green',
		flexDirection:'row',
		//marginBottom:15,
		borderBottomWidth:1,
		borderBottomColor:'black',
		justifyContent:'space-evenly',
		paddingRight:200,
		height:28.5,
		marginTop:3,
	},
	switch2:{
		justifyContent:'center',
	},
	error:{
		fontFamily:'Fredoka-Light',
		color: '#BA1200',
		//marginBottom:15
	  }
})