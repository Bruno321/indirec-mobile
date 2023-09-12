import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, Dimensions, StyleSheet, SafeAreaView, ScrollView, Text, TextInput, View, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Formik } from 'formik';
import * as yup from "yup";

import { Header, SearchInput, ButtonsPages, List } from '../components';
import { aCampus, aSports, aFacultities } from '../Utils/Constants';
import { Dropdown } from 'react-native-element-dropdown';
import { useFetchData } from '../Hooks/Fetch.hook';
import TouchableCmp from '../assetsUI/TouchableCmp';
import RadioButtonRN from 'radio-buttons-react-native';
import { SAVE, process } from '../Service/Api';
import { useDidMountEffect } from "../Utils/DidMountEffect";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height, fontScale } = Dimensions.get('window');

const oInitialState = {
	nombre: '',
	facultad: '',
	campus: '',
	deporte: '',
	categoria: 2,
	nombreEntrenador: '',
	apellidoEntrenador: '',
	nombreAsistente: '',
	apellidoAsistente: '',
};

const validationSchema = yup.object().shape({
	nombre: yup
		.string()
		.required('El nombre del equipo es requerido'),
	facultad: yup
		.string()
		.required('La facultad es requerida'),
	campus: yup
		.string()
		.required('El campus es requerido'),
	deporte: yup
		.string()
		.required('El deporte es requerido'),
	categoria: yup
		.number()
		.required('La categoria es requerida'),
	nombreEntrenador: yup
		.string()
		.required('El nombre del entrenador es requerido'),
	apellidoEntrenador: yup
		.string()
		.required('El apellido del entrenador es requerido'),
	nombreAsistente: yup
		.string()
		.required('El nombre del asistente es requerido'),
	apellidoAsistente: yup
		.string()
		.required('El apellido del asistente es requerido'),
});

export const RegistroEquipos = () => {
	const [deportistas, loadingList, change, update] = useFetchData('deportistas', "status=-1");
	const [nuevosDeportistas, setNuevosDeportistas] = useState([])
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const [aSelected, setSelected] = useState([]);

	// HOOKS PARA EL MANEJO DE BUSQUEDA DE DEPORTISTAS
	const [categoriaValidation, setCategoriaValidation] = useState();
	const [facultadValidation, setFacultadValidation] = useState();
	const isFocused = useIsFocused();

	const [modalVisibility, setModalVisibility] = useState(false);
	const [pagina, setPagina] = useState(0);
	const [componentAString, setComponentAString] = useState('');
	const [componentBString, setComponentBString] = useState('');
	const campusItems = aCampus.map((campus) => ({
		label: campus,
		value: campus,
	}));
	const sportItems = aSports.map(oSport => ({
		label: oSport,
		value: oSport,
	}));
	const facultitiesItems = aFacultities.map(oFaculty => ({
		label: oFaculty,
		value: oFaculty,
	}));
	const categoria = [
		{ label: "Masculino", value: 0 },
		{ label: "Femenino", value: 1 },
	];

	useEffect(() => {
		if (!loading) {
			let mutatedDeportistas = []
			deportistas.data.forEach(deportista => {
				console.log(deportista.nombres)
				let newDeportista = {
					id: deportista.id,
					num: deportista.numJugador,
					nombreCompleto: deportista.nombres + " " + deportista.apellidos,
					isSelected: false
				}
				mutatedDeportistas.push(newDeportista)
			});
			setNuevosDeportistas(mutatedDeportistas)
		}
	}, [loadingList])
	const onSubmit = async (values, resetForm) => {
		setLoading(true);

		let selectedDeportistas = nuevosDeportistas.filter((deportista)=>deportista.isSelected)
		const oSend = {
			...values,
			jugadores: selectedDeportistas.map(selectedDeportista => selectedDeportista.id),
		};

		const response = await process(SAVE, 'equipos', oSend).catch(e => {
			Alert.alert(
				'Oops...',
				'Algo salio mal, intenta mas tarde',
				[
					{ text: 'Okay' },
				]
			);
		});
		if (response?.data) {
			Alert.alert(
				'Equipo guardado',
				response.data.message,
				[
					{ text: 'Okay' },
				]
			);
			resetForm();
			setSelected([]);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (isFocused) {
			const concatenatedString = componentAString + componentBString;
			// console.log("*isFocused*");
			// console.log("---->", concatenatedString);
			if (concatenatedString === "") {
				return;
			}
			change(concatenatedString, pagina * 10);
		}
	}, [isFocused]);

	useDidMountEffect(() => {
		const concatenatedString = componentAString + componentBString;
		// console.log("*didmount*")
		change(concatenatedString, pagina * 10);

	}, [componentAString, componentBString, pagina]);

	useEffect(() => {
		if (categoriaValidation != undefined && facultadValidation != undefined) {
			setComponentAString(`facultad[$like]=%${facultadValidation}%&sexo=${categoriaValidation}`)
		}
	}, [categoriaValidation, facultadValidation])

	const handlePlayerButtonPress = (playerId) => {
		setNuevosDeportistas(prevData =>
			prevData.map(player =>
				player.id === playerId
					? { ...player, isSelected: !player.isSelected }
					: player
			)
		);
	};
	return (
		<ScrollView style={styles.general} showsVerticalScrollIndicator={false}>
			<SafeAreaView style={{ backgroundColor: "#003070" }} />
			<Header navigation={navigation} title={"Registrar equipo"} />
			<View style={styles.center}>
				<Formik
					initialValues={oInitialState}
					validationSchema={validationSchema}
					onSubmit={(values, { resetForm }) => {
						onSubmit(values, resetForm);
					}}
				>
					{({ setFieldValue, handleChange, handleSubmit, values, errors, touched }) => (
						<>
							<View style={styles.viewForm}>
								<Text style={styles.campos}>Nombre del equipo:</Text>
								{/* INPUT NOMBRE EQUIPO */}
								<TextInput
									placeholder='Nombre del equipo'
									style={styles.input}
									onChangeText={handleChange('nombre')}
									value={values.nombre}
								/>
								<Text style={styles.error}>{touched.nombre && errors.nombre}</Text>

								<Text style={styles.campos}>Deporte:</Text>
								{/* INPUT DEPORTE EQUIPO */}
								<Dropdown
									data={sportItems}
									labelField="label"
									valueField="value"
									placeholder='Seleccione una opción'
									style={styles.dropdown1DropdownStyle}
									containerStyle={styles.dropdown1DropdownStyle}
									placeholderStyle={styles.dropdown1PlaceholderStyle}
									onChange={({ value }) => {
										setFieldValue('deporte', value);
									}}
									value={values.deporte}
								/>
								<Text style={styles.error}>{touched.deporte && errors.deporte}</Text>

								<Text style={styles.campos}>Categoría:</Text>
								{/* INPUT CATEGORIA EQUIPO */}
								<RadioButtonRN
									style={styles.radioButtonStyle}
									data={categoria}
									textStyle={styles.radioButtonTextStyle}
									boxStyle={styles.radioButtonBoxStyle}
									activeColor={!values.categoria ? "#003070" : "#808"}
									selectedBtn={({ value }) => (
										setFieldValue('categoria', value),
										setCategoriaValidation(value)
									)
									}
								/>
								<Text style={styles.error}>{touched.categoria && errors.categoria}</Text>

								<Text style={styles.campos}>Facultad:</Text>
								{/* INPUT FACULTAD EQUIPO */}
								<Dropdown
									data={facultitiesItems}
									labelField="label"
									valueField="value"
									placeholder='Seleccione una opción'
									style={styles.dropdown1DropdownStyle}
									placeholderStyle={styles.dropdown1PlaceholderStyle}
									containerStyle={styles.dropdown1DropdownStyle}
									onChange={({ value }) => (
										setFieldValue('facultad', value),
										setFacultadValidation(value)
									)
									}
									value={values.facultad}
									search={true}
								/>
								<Text style={styles.error}>{touched.facultad && errors.facultad}</Text>

								<Text style={styles.campos}>Campus:</Text>
								{/* INPUT CAMPUS EQUIPO */}
								<Dropdown
									data={campusItems}
									labelField="label"
									valueField="value"
									placeholder='Seleccione una opción'
									style={styles.dropdown1DropdownStyle}
									placeholderStyle={styles.dropdown1PlaceholderStyle}
									containerStyle={styles.dropdown1DropdownStyle}
									// itemTextStyle={{color: 'red',}}
									onChange={({ value }) => {
										setFieldValue('campus', value);
									}}
									value={values.campus}
								/>
								<Text style={styles.error}>{touched.campus && errors.campus}</Text>

								{/* ENTRENADOR */}
								<Text style={{ ...styles.campos, marginTop: 50 }}>Datos del entrenador:</Text>

								<Text style={styles.campos}>Nombre(s):</Text>
								{/* INPUT NOMBRE ENTRENADOR EQUIPO */}
								<TextInput
									placeholder='Nombre del entrenador'
									style={styles.input}
									onChangeText={handleChange('nombreEntrenador')}
									value={values.nombreEntrenador}
								/>
								<Text style={styles.error}>{touched.nombreEntrenador && errors.nombreEntrenador}</Text>

								<Text style={styles.campos}>Apellidos:</Text>
								{/* INPUT APELLIDOS ENTRENADOR EQUIPO */}
								<TextInput
									placeholder='Apellidos del entrenador'
									style={styles.input}
									onChangeText={handleChange('apellidoEntrenador')}
									value={values.apellidoEntrenador}
								/>
								<Text style={styles.error}>{touched.apellidoEntrenador && errors.apellidoEntrenador}</Text>

								{/* ASISTENTE */}
								<Text style={{ ...styles.campos, marginTop: 50 }}>Datos del asistente:</Text>

								<Text style={styles.campos}>Nombre(s):</Text>
								{/* INPUT NOMBRE ASISTENTE EQUIPO */}
								<TextInput
									placeholder='Nombre del asistente'
									style={styles.input}
									onChangeText={handleChange('nombreAsistente')}
									value={values.nombreAsistente}
								/>
								<Text style={styles.error}>{touched.nombreAsistente && errors.nombreAsistente}</Text>

								<Text style={styles.campos}>Apellidos:</Text>
								{/* INPUT APELLIDOS ENTRENADOR EQUIPO */}
								<TextInput
									placeholder='Apellidos del asistente'
									style={styles.input}
									onChangeText={handleChange('apellidoAsistente')}
									value={values.apellidoAsistente}
								/>
								<Text style={styles.error}>{touched.apellidoAsistente && errors.apellidoAsistente}</Text>

								{/* LISTA DE JUGADORES */}
								<Text style={styles.campos}>Lista de jugadores:</Text>
							</View>


							{/* VERIFICAR INFO PARA QUERY A DEPORTISTAS */}
							{values.categoria !== 2 && values.facultad ? <>
								{/* <SearchInput
									setPagina={setPagina}
									screen={"deportistas"}
									updateConcat={setComponentBString}
								/>
								<ButtonsPages
									numberPage={pagina}
									setPagina={setPagina}
									total={deportistas.total}
								/> */}
								<View>
									<View style={styles.headerLista}>
										<View style={styles.celda1HeaderLista}>
											<Text style={styles.celda1y2Text}>#</Text>
										</View>
										<View style={styles.celda2HeaderLista}>
											<Text style={styles.celda1y2Text}>Nombre Completo</Text>
										</View>
										<View style={styles.celda3HeaderLista}>
											<TouchableCmp onPress={() => {
												setNuevosDeportistas(prevData =>
													prevData.map(player => ({ ...player, isSelected: false }))
												);
											}}>
												<View style={styles.celda3HeaderLista2}>
													<Text style={styles.celda1y2Text}>Limpiar</Text>
												</View>
											</TouchableCmp>
										</View>
									</View>
									{/* RENDERIZAR TODOS LOS DEPORTISTAS */}
									{nuevosDeportistas.map((deportista, index) => (
										<View key={index + "view1"} style={styles.ViewJugador}>
											<View
												key={index + "view2"}
												style={!deportista.isSelected ? styles.celda3a : styles.celda3b}
											>
												<Text
													key={index + "text1"}
													style={!deportista.isSelected ? styles.celda3y4Texta : styles.celda3y4Textb}
													numberOfLines={1}
												>
													{deportista.num}
												</Text>
											</View>
											<View
												key={index + "view3"}
												style={!deportista.isSelected ? styles.celda4a : styles.celda4b}
											>
												<Text
													key={index + "text2"}
													style={!deportista.isSelected ? styles.celda3y4Texta : styles.celda3y4Textb}
													numberOfLines={2}
												>
													{deportista.nombreCompleto}
												</Text>
											</View>
											<TouchableCmp
												key={index + "touchable1"}
												// onPress={() => updateSelected(x.id, true)}
												onPress={() => { handlePlayerButtonPress(deportista.id) }}
											>
												<View
													key={index + "view4"}
													style={!deportista.isSelected ? styles.celda5a : styles.celda5b}
												>
													<FontAwesome
														key={index + "icon1"}
														name={!deportista.isSelected ? "plus-square-o" : "trash-o"}
														size={25}
														color={!deportista.isSelected ? "#003070" : "#B00"}
													/>
													<Text
														key={index + "text3"}
														style={!deportista.isSelected ? styles.celda3y4Texta : styles.celda3y4Textb}
														numberOfLines={1}
													>
														{!deportista.isSelected ? "Añadir" : "Eliminar"}
													</Text>
												</View>
											</TouchableCmp>
										</View>
									))}
								</View>
							</>
								:
								<Text style={styles.campos}>Elige Facultad y Categoria antes!</Text>
							}

							{/* BOTON VER RESUMEN */}
							<View style={styles.viewButton}>
								<TouchableCmp onPress={() => (setModalVisibility(!modalVisibility))}>
									<View style={styles.viewRegistrar}>
										{loading ? <ActivityIndicator color="white" /> : <Text style={styles.registrar}>Ver Resumen</Text>}
									</View>
								</TouchableCmp>
							</View>
							{/* <View style={styles.viewButton}>
								<TouchableCmp onPress={() => (console.log(validationSchema))}>
									<View style={styles.viewRegistrar}>
										{loading ? <ActivityIndicator color="white" /> : <Text style={styles.registrar}>BOTON AUXILIAR</Text>}
									</View>
								</TouchableCmp>
							</View> */}

							{/* MODAL RESUMEN */}
							<Modal
								visible={modalVisibility}
								transparent={true}
								animationType="fade"
								onRequestClose={() => {
									setModalVisibility(!modalVisibility)
								}}
							>
								<TouchableWithoutFeedback onPress={() => { setModalVisibility(!modalVisibility) }}>
									<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
								</TouchableWithoutFeedback>

								<View style={styles.modalViewCenter}>
									<Text>RESUMEN</Text>
									<View style={styles.listadoModalView}>
										<Text style={styles.listadoModal} numberOfLines={2}>Nombre del equipo: {values.nombre}</Text>
										<Text style={styles.listadoModal} numberOfLines={2}>Deporte: {values.deporte}</Text>
										<Text style={styles.listadoModal} numberOfLines={2}>Categoría: {values.categoria == 0 ? "Varoníl" : "Femeníl"}</Text>
										<Text style={styles.listadoModal} numberOfLines={2}>Facultad: {values.facultad}</Text>
										<Text style={styles.listadoModal} numberOfLines={2}>Campus: {values.campus}</Text>
										<Text style={styles.listadoModal} numberOfLines={2}>{Object.keys(nuevosDeportistas.filter(deportista => deportista.isSelected)).length > 0 ? "Lista de Jugadores" : "Primero selecciona jugadores para el equipo"}</Text>
										{/* LISTA DE JUGADORES SELECCIONADOS */}
										{nuevosDeportistas.filter(deportista => deportista.isSelected).map((deportista, index) => (
											<View
												key={index + "view1"}
												style={styles.ViewJugador}
											>
												<View
													key={index + "view2"}
													style={!deportista.isSelected ? styles.celda3a : styles.celda3b}
												>
													<Text
														key={index + "text1"}
														style={!deportista.isSelected ? styles.celda3y4Texta : styles.celda3y4Textb}
														numberOfLines={1}
													>
														{deportista.num}
													</Text>
												</View>
												<View
													key={index + "view3"}
													style={styles.celda4bb}
												>
													<Text
														key={index + "text2"}
														style={!deportista.isSelected ? styles.celda3y4Texta : styles.celda3y4Textb}
														numberOfLines={2}
													>
														{deportista.nombreCompleto}
													</Text>
												</View>
											</View>
										)
										)
										}
									</View>
									{/* BOTON REGISTRAR EQUIPO */}
									<View style={styles.viewButton}>
										<TouchableCmp onPress={handleSubmit}>
											{/* <TouchableCmp onPress={() => (setModalVisibility(!modalVisibility))}> */}
											<View style={styles.viewRegistrar}>
												{loading ? <ActivityIndicator color="white" /> : <Text style={styles.registrar}>Registrar Equipo</Text>}
											</View>
										</TouchableCmp>
									</View>
								</View>
							</Modal>
						</>
					)}
				</Formik>

			</View>
		</ScrollView >
	)
}

const styles = StyleSheet.create({
	general: {
		backgroundColor: 'white',
	},
	center: {
		alignItems: 'center'
	},
	viewForm: {
		width: width / 1.25,
		marginTop: height / 28,
	},
	campos: {
		fontSize: 16 / fontScale,
		// marginTop:8
	},
	input: {
		fontSize: 20 / fontScale,
		width: width / 1.25,
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		color: '#000',
	},
	dropdown1DropdownStyle: {
		backgroundColor: '#FFF',
		marginTop: -1.5,
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		// color: "#F00",
		// borderRadius: 18,
		overflow: 'hidden',
	},
	dropdown1PlaceholderStyle: {
		fontSize: 20 / fontScale,
		color: "#AAA"
	},
	registrar: {
		// fontSize:16,
		fontSize: 20 / fontScale,

		color: 'white',
		textAlign: 'center',
	},
	registrarFalse: {
		fontSize: 18 / fontScale,

		// fontSize:16,
		color: '#DEDEDE',
		textAlign: 'center',
	},
	viewRegistrar: {
		width: width / 1.25,
		height: 55,
		borderRadius: 10,
		backgroundColor: '#003070',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	viewButton: {
		backgroundColor: 'red',
		width: width / 1.25,
		height: 55,
		borderRadius: 10,
		backgroundColor: '#003070',
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 30,
		overflow: 'hidden',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
		backgroundColor: 'red',
	},
	radioButtonStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		// backgroundColor: 'red',

	},
	radioButtonBoxStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '45%',
	},
	radioButtonTextStyle: {
		fontSize: 18 / fontScale,
		marginLeft: 10
	},
	error: {
		fontSize: 18 / fontScale,
		color: '#BA1200',
	},
	View: {
		marginTop: 10,
		width: "100%",
		borderRadius: 10,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: "#C0C0C0",
	},
	headerLista: {
		backgroundColor: '#003070',
		flexDirection: 'row',
	},
	ViewJugador: {
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: "#C0C0C0",
		height: 41,
	},
	celda3a: {
		backgroundColor: '#FFF',
		width: "20%",
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
	},
	celda3b: {
		backgroundColor: '#EEE',
		width: "20%",
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
	},
	celda3y4Texta: {
		color: 'black',
		fontFamily: 'Fredoka-Light',
		fontSize: 12,
	},
	celda3y4Textb: {
		color: '#888',
		fontFamily: 'Fredoka-Light',
		fontSize: 12 / fontScale,
	},
	celda4a: {
		backgroundColor: '#FFF',
		width: "50%",
		justifyContent: 'center',
	},
	celda4b: {
		backgroundColor: '#EEE',
		width: "50%",
		justifyContent: 'center',
	},
	celda4bb: {
		backgroundColor: '#FFF',
		width: "80%",
		justifyContent: 'center',
	},
	celda5a: {
		// backgroundColor: '#F00',
		width: width * 0.3,
		height: "100%",
		justifyContent: 'space-evenly',
		alignItems: 'center',
		// alignSelf: 'center',
		flexDirection: 'row',
	},
	celda5b: {
		backgroundColor: '#EEE',
		width: width * 0.3,
		height: "100%",
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
	},
	celda6a: {
		backgroundColor: '#FFF',
		width: width * 0.1,
		height: "100%",
		justifyContent: 'center',
		alignItems: 'center',
	},
	celda6b: {
		backgroundColor: '#EEE',
		width: width * 0.1,
		height: "100%",
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewHeaderLista: {
		marginTop: 10,
		width: "100%",
		borderRadius: 10,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: "#C0C0C0",
	},
	headerLista: {
		backgroundColor: '#003070',
		flexDirection: 'row',
	},
	celda1HeaderLista: {
		width: "20%",
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
	},
	celda2HeaderLista: {
		width: "40%",
		justifyContent: 'center',
		height: 40,
	},
	celda1y2Text: {
		color: 'white',
		fontFamily: 'Fredoka-Light',
		fontSize: 12,
	},
	celda3HeaderLista: {
		width: "40%",
		justifyContent: 'center',
		height: 40,
		// backgroundColor: '0F0'
	},
	celda3HeaderLista2: {
		// backgroundColor: '#0030',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalViewCenter: {
		borderRadius: 18,
		width: width * 0.9,
		backgroundColor: 'white',
		alignItems: 'center',
		alignSelf: 'center',
		elevation: 5,
	},
	listadoModalView: {
		width: "80%",
	}
});
