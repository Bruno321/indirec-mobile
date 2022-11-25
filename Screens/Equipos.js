import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, FlatList, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import ListadoJugadores from '../components/ListadoJugadores';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TouchableCmp from '../assetsUI/TouchableCmp';
import RadioButtonRN from 'radio-buttons-react-native';


export const Equipos = () => {
	const onInitialState ={
		nombreEquipo: '',
		deporte:'Selecciona un deporte',
		facultadText:'Selecciona una facultad',
		campusText:'Selecciona un campus',
		categoria:'',
		nombreEntrenador:'',
		apellidosEntrenador:'',
		nombreAsistente:'',
		apellidosAsistente:'',
		isValidNomEqu:true,
		isValidDeporte:true,
		isValidFacultad:true,
		isValidCampus:true,
		isValidCategoria:true,
		isValidNombreEntrenador:true,
		isValidApellidosEntrenador:true,
		isValidNombreAsistente:true,
		isValidApellidosAsistente:true,
	}
	const deporte = ["Futbol", "Basquetbol", "Voleyball"];
	const categoria = [{label: "Masculino"},{label: "Femenino"}];
	const facultades=["Informática","Ingeniería","Ciencias"];
	const campus=["Centro Universitario","Juriquilla","Aeropuerto", "Ex-prepa Centro", "Prepa Norte", "Prepa Sur"];

	// const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	// const numberformat = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/g;
	// const numberformat2 = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{4}( |-|\.)?\d{3})$/g;
	// const numberformat3 = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{2}( |-|\.)?\d{2}( |-|\.)?\d{3})$/g;
	// const numberformat4 = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{2}( |-|\.)?\d{2})$/g;
	// const nameformat = /^([A-ZÁÉÍÓÚ]['-]?[a-záéíóúü]+([ ]?[a-z]?['-]?[A-ZÁÉÍÓÚ]['-]?[a-záéíóúü]+)*)$/
	// const expformat = /^([0-9]{5,7})$/
	// const seguroformat = /^^([0-9]{2}-?[0-9]{2}-?[0-9]{2}-?[0-9]{4}-?[0-9]{1})$$/

	const [data, setData] = React.useState({
		nombres:'',
		deporte:'Selecciona un deporte',
		categoria: '',
		facultad:'Selecciona una facultad',
		campus:'Selecciona un campus',
		nombreEntrenador:'',
		apellidosEntrenador:'',
		nombreAsistente:'',
		apellidosAsistente:'',
		isValidNomEqu:true,
		isValidDeporte:true,
		isValidFacultad:true,
		isValidCampus:true,
		isValidCategoria:true,
		isValidNombreEntrenador:true,
		isValidApellidosEntrenador:true,
		isValidNombreAsistente:true,
		isValidApellidosAsistente:true,
	})

	const logoutHandle= ()=>{
	}


	const handleCategoryChange = (value) =>{
		setData({
		...data,
		categoria:value.label,
		isValidCategoria:true
		})
		// console.log(value.label);
	}

	// const handleSubmit = ()=>{
	// 	if(!CheckAll()){
	// 		Alert.alert('Información incorrecta', 'Uno o más campos son incorrectos',[
	// 			{text:'Okay'}
	// 		 ]);
	// 		console.log("NO ESTA BIEN")
	// 	}else{
	// 		setData(onInitialState);
	// 		navigation.navigate("Home")
	// 	}
	// }


	// const CheckAll = () =>{
	// 	if((data.isValidNomEqu&&data.isValidDeporte&&data.isValidFacultad&&data.isValidSeg&&data.isValidEmail&&data.isValidTel&&data.isValidEmer
	// 		&& data.expediente.trim().length >0 && data.nombres.trim().length >0 && data.apellidos.trim().length >0
	// 		&& data.seguro.trim().length >0 && data.email.trim().length >0 && data.telefono.trim().length >0 && data.telEmergencia.trim().length >0
	// 		)){
	// 			return true
	// 		}else{
	// 			return false
	// 		}
	// }

	const navigation = useNavigation();

	return(
		<ScrollView style={styles.general} showsVerticalScrollIndicator={false}>
		<SafeAreaView />
			<Header navigation={navigation}/>
			<View style={styles.center}>
				<View style={styles.viewTitulo}>
					<Text style={styles.titulo}>Registro de equipo</Text>
				</View>
				<View style={styles.viewForm}>
					<Text style={styles.campos}>Nombre del equipo:</Text>
					<TextInput 
						placeholder='Nombre del equipo' style={styles.input}
						onChangeText={(value) => handleNombChange(value)}
						value={data.expediente}
						/>
					{ data. isValidNomEqu ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
                    <Text style={styles.campos}>Deporte:</Text>
					<SelectDropdown 
						data={deporte}
						onSelect={(selectedItem, index) => {
							// handleSexChange(selectedItem);
						}}
						defaultButtonText={data.deporte}
						buttonTextAfterSelection={(selectedItem, index) => {
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
					{/* { data. isValidSex ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					} */}
					<Text style={styles.campos}>{"Categoría:"}</Text>
					<RadioButtonRN
						style={styles.radioButtonStyle}
						data={categoria}
						// box={false}
						textStyle={styles.radioButtonTextStyle}
						boxStyle={styles.radioButtonBoxStyle}
						animationTypes={['shake']}
						activeColor={data.categoria == 'Masculino'? "#003070" : "#808"}
						selectedBtn={(e) => handleCategoryChange(e)}
					/>
					<Text style={styles.campos}>Facultad:</Text>
					<SelectDropdown 
						data={facultades}
						onSelect={(selectedItem, index) => {
							
						}}
						defaultButtonText={data.facultad}
						buttonTextAfterSelection={(selectedItem, index) => {
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
					{/* { data. isValidSex ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					} */}
					<Text style={styles.campos}>Campus:</Text>
					<SelectDropdown 
						data={campus}
						onSelect={(selectedItem, index) => {
							// handleSexChange(selectedItem);
						}}
						defaultButtonText={data.campus}
						buttonTextAfterSelection={(selectedItem, index) => {
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
					{/* ENTRENADOR */}
					<Text style={styles.campos}>Datos del entrenador:</Text>
					<Text style={styles.campos}>Nombre(s):</Text>
					<TextInput 
						placeholder='Nombre del entrenador' style={styles.input}
						onChangeText={(value) => handleNombChange(value)}
						value={data.nombreEntrenador}
						/>
					{/* { data. isValidNombreEntrenador ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					} */}
					<Text style={styles.campos}>Apellidos:</Text>
					<TextInput 
						placeholder='Apellidos del entrenador' style={styles.input}
						onChangeText={(value) => handleNombChange(value)}
						value={data.apellidosEntrenador}
						/>
					{ data. isValidApellidosEntrenador ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					{/* ASISTENTE */}
					<Text style={styles.campos}>Datos del asistente:</Text>
					<Text style={styles.campos}>Nombre(s):</Text>
					<TextInput 
						placeholder='Nombre del asistente' style={styles.input}
						onChangeText={(value) => handleNombChange(value)}
						value={data.nombreAsistente}
						/>
					{ data. isValidNombreAsistente ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					<Text style={styles.campos}>Apellidos:</Text>
					<TextInput 
						placeholder='Apellidos del asistente' style={styles.input}
						onChangeText={(value) => handleNombChange(value)}
						value={data.apellidosAsistente}
						/>
					{ data. isValidApellidosAsistente ? null : 
						<Text style={styles.error}>Campo vacío</Text>
					}
					{/* LISTA DE JUGADORES */}
					<Text style={styles.campos}>Lista de jugadores:</Text>
					<ListadoJugadores/>
					{/* <View style={styles.añadirView}>
						<TouchableCmp>
							<Text style={styles.añadirText}>+ Añadir jugador</Text>
						</TouchableCmp>
					</View> */}
				</View>
				<View style={styles.viewButton}>
					<TouchableCmp onPress={()=>{handleSubmit()}}>
						{true
						?<View style={styles.viewRegistrar}>
							<Text style={styles.registrar} onPress={()=>{console.log("Work in progress")}}>Registrar deportista</Text>
						</View>:
						<View style={styles.viewRegistrarFalse}>
							<Text style={styles.registrarFalse} onPress={()=>{console.log("Work in progress")}}>Registrar deportista</Text>
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
	touchCon:{
		fontSize:14,
		fontFamily:'Fredoka-Medium',
		color:'white',
	},
	viewTouch:{
		marginTop:7,
		width:'100%',
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
	viewTouchCon:{
		marginTop:7,
		width:'100%',
		//width:230,
		height:Dimensions.get('window').height/21,
		// height:40,
		borderRadius:10,
		borderColor:'#198754',
		borderWidth:1,
		alignItems:'center',
		justifyContent:'center',
		overflow:'hidden',
		marginBottom:15,
		backgroundColor:'5cb85c'
	},
	viewTouch2:{
		width:Dimensions.get('window').width/1.2,
		//width:230,
		height:Dimensions.get('window').height/21,
		// height:40,
		borderRadius:10,
		borderColor:'#003070',
		alignItems:'center',
		justifyContent:'center',
		overflow:'hidden',
		backgroundColor:'white',
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
		backgroundColor:'#FFF',
		justifyContent:'center',
		overflow:'hidden',
		borderWidth: 1,
		borderColor: '#AAA',
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
		// justifyContent:'space-evenly',
		paddingRight:200,
		height:28.5,
		marginTop:3,
	},
	switch2:{
		justifyContent:'center',
	},
	radioButtonStyle:{
		flexDirection: 'row',
		// backgroundColor: 'pink',
		justifyContent: 'space-evenly'
	},
	radioButtonBoxStyle:{
		// flex: 1,
		// marginTop: -,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'red',
		width: '45%',
	},
	radioButtonTextStyle:{
		fontFamily:'Fredoka-Light',
		marginLeft: 10
	},
	error:{
		fontFamily:'Fredoka-Light',
		color: '#BA1200',
		//marginBottom:15
	},
	añadirView:{
		height: 40,
		alignItems: 'center',
		// backgroundColor: 'red',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	añadirText: {
		color: '#003070',
		fontFamily:'Fredoka-Medium',
	}
})