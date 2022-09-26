import { StyleSheet, Text, View, Image, Dimensions, TextInput, Button, ScrollView  } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import TouchableCmp from '../assetsUI/TouchableCmp';
import Header from "../components/Header"


export default function Registro(){
	const sexo = ["Masculino", "Femenino"];
	const facultades=["Informática","Ingeniería","Ciencias"]
	const seleccionado=["Sí","No"]

	const navigation = useNavigation();

	return(
		<ScrollView style={styles.general} showsVerticalScrollIndicator={false}>
			<Header/>
			<View style={styles.center}>
				<View style={styles.viewTitulo}>
					<Text style={styles.titulo}>Registro de un deportista</Text>
				</View>
				<View style={styles.viewForm}>
					<Text style={styles.campos}>Expediente:</Text>
					<TextInput placeholder='123456' style={styles.input}/>
					<Text style={styles.campos}>{"Nombre(s):"}</Text>
					<TextInput placeholder='Jorge Alejandro' style={styles.input}/>
					<Text style={styles.campos}>{"Apellidos:"}</Text>
					<TextInput placeholder='Bernal Colín' style={styles.input}/>
					<Text style={styles.campos}>Sexo:</Text>
					<SelectDropdown 
						data={sexo}
						onSelect={(selectedItem, index) => {
							console.log(selectedItem, index)
						}}
						defaultButtonText={'Selecciona una opción'}
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
					<Text style={styles.campos}>Facultad:</Text>
					<SelectDropdown 
						data={facultades}
						onSelect={(selectedItem, index) => {
							console.log(selectedItem, index)
						}}
						defaultButtonText={'Selecciona una facultad'}
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
					<Text style={styles.campos}>{"¿Eres jugador seleccionado?"}</Text>
					<SelectDropdown 
						data={seleccionado}
						onSelect={(selectedItem, index) => {
							console.log(selectedItem, index)
						}}
						defaultButtonText={'Selecciona una opción'}
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
					<Text style={styles.campos}>No. Seguro Social:</Text>
					<TextInput placeholder='12345678' style={styles.input}/>
					<Text style={styles.campos}>Correo electrónico:</Text>
					<TextInput placeholder='ejemplo@mail.com' style={styles.input}/>
					<Text style={styles.campos}>Teléfono:</Text>
					<TextInput placeholder='442-123-4567' style={styles.input}/>
					<Text style={styles.campos}>Teléfono de emergencias:</Text>
					<TextInput placeholder='442-765-4321' style={styles.input}/>
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
					<TouchableCmp>
						<View style={styles.viewRegistrar}>
							<Text style={styles.registrar} onPress={() => {navigation.goBack()}}>Registrar deportista</Text>
						</View>
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
	},
	campos2:{
		fontFamily:'Fredoka-Light',
		marginTop:30
	},
	input:{
		width:Dimensions.get('window').width/1.25,
		paddingLeft:5,
		borderBottomWidth:1,
		borderBottomColor:'black',
		marginBottom:15,
		fontFamily:'Fredoka-Light',
	},
	dropdown1BtnStyle: {
		width: '100%',
		height: 30,
		backgroundColor:'white',
		borderBottomWidth: 1,
		borderColor: 'black',
		marginBottom:15,
	},
	dropdown1BtnTxtStyle: {
		color: 'black', 
		textAlign: 'left',
		fontFamily:'Fredoka-Light',
		fontSize:14,
	},
  	dropdown1DropdownStyle: {
		backgroundColor: '#EFEFEF',
		marginTop:-35
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
		textAlign:'center'
	},
	viewRegistrar:{
		width:Dimensions.get('window').width/1.25,
		height:55,
		borderRadius:10,
		backgroundColor:'#003070',
		justifyContent:'center',
		overflow:'hidden'
	},
	viewButton:{
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
	}
})