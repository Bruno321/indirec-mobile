import React, { useState } from 'react';
import {
	Alert,
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from "yup";
import { Header, ListadoJugadores } from '../components';
import { aCampus, aSports, aFacultities } from '../Utils/Constants';	
import { Dropdown } from 'react-native-element-dropdown';
import { useFetchData } from '../Hooks/Fetch.hook';
import TouchableCmp from '../assetsUI/TouchableCmp';
import RadioButtonRN from 'radio-buttons-react-native';
import { SAVE, process } from '../Service/Api';

const { width, height } = Dimensions.get('window');

const oInitialState = {
	nombre: '',
	facultad: '',
	campus: '',
	deporte: '',
	categoria: null,
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
	const [loading, setLoading] = useState(false);
	const campusItems = aCampus.map((campus) => ({ label: campus, value: campus }));
	const sportItems = aSports.map(oSport => ({
		label: oSport,
		value: oSport,
	}));
	const facultitiesItems = aFacultities.map(oFaculty => ({
		label: oFaculty,
		value: `Facultad de ${oFaculty}`,
	}));
	const categoria = [
		{label: "Masculino", value: 0},
		{label: "Femenino", value: 1},
	];
	const [aSelected, setSelected] = useState([]);
	const [deportistas] = useFetchData('deportistas');
	const navigation = useNavigation();

	const onSubmit = async (values, resetForm) => {
		setLoading(true);

		const oSend = {
			...values,
			jugadores: aSelected.map(s => s.id),
		};

		const response = await process(SAVE, 'equipos', oSend).catch(e => {
			Alert.alert(
				'Oops...',
				'Algo salio mal, intenta mas tarde',
				[
					{text:'Okay'},
				]
			);
		});

		if (response?.data?.ok) {
			Alert.alert(
				'Equipo guardado',
				response.data.message,
				[
					{text:'Okay'},
				]
			);
			resetForm();
			setSelected([]);
		}
		setLoading(false);
	};

	return (
		<ScrollView style={styles.general} showsVerticalScrollIndicator={false}>
		<SafeAreaView />
		<Header navigation={navigation}/>

			<View style={styles.center}>
				<View style={styles.viewTitulo}>
					<Text style={styles.titulo}>Registro de equipo</Text>
				</View>

				<View style={styles.viewForm}>

				<Formik
					initialValues={oInitialState}
					validationSchema={validationSchema}
					onSubmit={(values, { resetForm }) => {
						onSubmit(values, resetForm);
					}}
				>
				{({ setFieldValue, handleChange, handleSubmit, values, errors, touched }) => (
					<>
						<Text style={styles.campos}>Nombre del equipo:</Text>
						<TextInput 
							placeholder='Nombre del equipo'
							style={styles.input}
							onChangeText={handleChange('nombre')}
							value={values.nombre}
							/>
						<Text style={styles.error}>{touched.nombre && errors.nombre}</Text>

						<Text style={styles.campos}>Deporte:</Text>
							<Dropdown 
								data={sportItems}
								labelField="label"
								valueField="value"
								placeholder='Seleccione una opción'
								style={styles.dropdown1DropdownStyle}
								containerStyle={styles.dropdown1DropdownStyle}
								onChange={({ value }) => {
									setFieldValue('deporte', value);
								}}
								value={values.deporte}
							/>
						<Text style={styles.error}>{touched.deporte && errors.deporte}</Text>

						<Text style={styles.campos}>Categoría:</Text>
						<RadioButtonRN
							style={styles.radioButtonStyle}
							data={categoria}
							textStyle={styles.radioButtonTextStyle}
							boxStyle={styles.radioButtonBoxStyle}
							activeColor={!values.categoria ? "#003070" : "#808"}
							selectedBtn={({ value }) => setFieldValue('categoria', value)}
						/>
						<Text style={styles.error}>{touched.categoria && errors.categoria}</Text>

						<Text style={styles.campos}>Facultad:</Text>
							<Dropdown 
								data={facultitiesItems}
								labelField="label"
								valueField="value"
								placeholder='Seleccione una opción'
								style={styles.dropdown1DropdownStyle}
								containerStyle={styles.dropdown1DropdownStyle}
								onChange={({ value }) => {
									setFieldValue('facultad', value);
								}}
								value={values.facultad}
								search={true}
							/>
						<Text style={styles.error}>{touched.facultad && errors.facultad}</Text>

						<Text style={styles.campos}>Campus:</Text>
							<Dropdown 
								data={campusItems}
								labelField="label"
								valueField="value"
								placeholder='Seleccione una opción'
								style={styles.dropdown1DropdownStyle}
								containerStyle={styles.dropdown1DropdownStyle}
								onChange={({ value }) => {
									setFieldValue('campus', value);
								}}
								value={values.campus}
							/>
						<Text style={styles.error}>{touched.campus && errors.campus}</Text>

						{/* ENTRENADOR */}
						<Text style={styles.campos}>Datos del entrenador:</Text>

						<Text style={styles.campos}>Nombre(s):</Text>
						<TextInput 
							placeholder='Nombre del entrenador'
							style={styles.input}
							onChangeText={handleChange('nombreEntrenador')}
							value={values.nombreEntrenador}
						/>
						<Text style={styles.error}>{touched.nombreEntrenador && errors.nombreEntrenador}</Text>
						
						<Text style={styles.campos}>Apellidos:</Text>
						<TextInput 
							placeholder='Apellidos del entrenador'
							style={styles.input}
							onChangeText={handleChange('apellidoEntrenador')}
							value={values.apellidoEntrenador}
						/>
						<Text style={styles.error}>{touched.apellidoEntrenador && errors.apellidoEntrenador}</Text>
						
						{/* ASISTENTE */}
						<Text style={styles.campos}>Datos del asistente:</Text>

						<Text style={styles.campos}>Nombre(s):</Text>
						<TextInput 
							placeholder='Nombre del asistente'
							style={styles.input}
							onChangeText={handleChange('nombreAsistente')}
							value={values.nombreAsistente}
						/>
						<Text style={styles.error}>{touched.nombreAsistente && errors.nombreAsistente}</Text>

						<Text style={styles.campos}>Apellidos:</Text>
						<TextInput 
							placeholder='Apellidos del asistente' 
							style={styles.input}
							onChangeText={handleChange('apellidoAsistente')}
							value={values.apellidoAsistente}
						/>
						<Text style={styles.error}>{touched.apellidoAsistente && errors.apellidoAsistente}</Text>
						
						{/* LISTA DE JUGADORES */}
						<Text style={styles.campos}>Lista de jugadores:</Text>
						<ListadoJugadores dataSource={deportistas} aSelected={aSelected} setSelected={setSelected}/>

						<View style={styles.viewButton}>
							<TouchableCmp onPress={handleSubmit}>
								<View style={styles.viewRegistrar}>
									{loading ? <ActivityIndicator color="white"/> : <Text style={styles.registrar}>Registrar Equipo</Text>}
								</View>
							</TouchableCmp>
						</View>
					</>
				)}
			</Formik>

			</View>

			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	general:{
		backgroundColor:'white',
	},
	center:{
		alignItems:'center'
	},
	viewTitulo:{
		width: width / 1.25,
		marginTop: height / 28,
	},
	titulo:{
		fontSize: 40,
		fontFamily:'Fredoka-Medium',
	},
	viewForm:{
		width: width / 1.25,
		marginTop: height / 28,
	},
	campos:{
		fontFamily:'Fredoka-Light',
		marginTop:15
	},
	input:{
		width: width / 1.25,
		paddingLeft:5,
		borderBottomWidth:1,
		borderBottomColor:'black',
		fontFamily:'Fredoka-Light',
	},
	dropdown1DropdownStyle: {
		backgroundColor: '#FFF',
		marginTop:-1.5
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
		width: width / 1.25,
		height:55,
		borderRadius:10,
		backgroundColor:'#003070',
		justifyContent:'center',
		overflow:'hidden',
	},
	viewButton:{
		backgroundColor:'red',
		width: width / 1.25,
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
	radioButtonStyle:{
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	radioButtonBoxStyle:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '45%',
	},
	radioButtonTextStyle:{
		fontFamily:'Fredoka-Light',
		marginLeft: 10
	},
	error:{
		fontFamily:'Fredoka-Light',
		color: '#BA1200',
	},
});
